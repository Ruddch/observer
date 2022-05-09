import { Observer, ObserverFn } from '../Observable/Observable';
import { Subscriber, Subscription } from '../Subscriber/Subscriber';

class Subject<T> {
  subscribers: Subscriber<T>[];
  constructor() {
    this.subscribers = [];
  }
  subscribe(subscriber: Observer<T> | ObserverFn<T>): Subscription {
    const sub = new Subscriber(subscriber);
    this.subscribers.push(sub);
    const subscribers = this.subscribers;
    return new Subscription({
      unsubscribe() {
        subscribers.filter((s) => s !== sub);
      },
    });
  }
  next(val: T) {
    this.subscribers.forEach((sub) => sub.next(val));
  }
  error(e: Error) {
    this.subscribers.forEach((sub) => sub.error(e));
  }
  complete() {
    this.subscribers.forEach((sub) => sub.complete());
  }
}

export { Subject };
