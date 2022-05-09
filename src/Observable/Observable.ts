import { Subscriber, Subscription } from '../Subscriber/Subscriber';

export interface Observer<T> {
  next: (val: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}

export type ObserverFn<T> = (val: T) => void;

type Setup<T> = (observer: Subscriber<T>) => void;

type pipeFn = (observable: Observable<any>) => Observable<any>;

class Observable<T> {
  private readonly _setup: Setup<T>;
  constructor(setup: Setup<T>) {
    this._setup = setup;
  }

  subscribe(subscriber: Observer<T> | ObserverFn<T>) {
    const sub = new Subscriber(subscriber);
    this._setup(sub);
    return new Subscription(sub);
  }
  pipe(...fns: pipeFn[]): Observable<any> {
    const resObs = fns.reduce((obs: Observable<T>, fn) => fn(obs), this);
    return resObs;
  }
}

export default Observable;
