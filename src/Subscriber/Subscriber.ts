import { Observer, ObserverFn } from '../Observable/Observable';

export class Subscriber<T> implements Observer<T> {
  isAlive = false;
  observer: Observer<T>;
  constructor(observer: Observer<T> | ObserverFn<T>) {
    this.isAlive = true;
    this.observer = observer instanceof Function ? { next: observer } : observer;
  }
  next(value: T) {
    if (this.isAlive) {
      try {
        this.observer.next(value);
      } catch (e: unknown) {
        const err = e as Error;
        this.error(err);
      }
    }
  }
  error(e: Error) {
    if (this.isAlive) {
      this.unsubscribe();
      this.observer.error && this.observer.error(e);
    }
  }
  complete() {
    if (this.isAlive) {
      this.unsubscribe();
      this.observer.complete && this.observer.complete();
    }
  }
  unsubscribe() {
    this.isAlive = false;
  }
}
interface ISubscription {
  unsubscribe: () => void;
}
export class Subscription {
  private _subscriber: ISubscription;
  constructor(subscriber: ISubscription) {
    this._subscriber = subscriber;
  }
  unsubscribe() {
    this._subscriber.unsubscribe();
  }
}
