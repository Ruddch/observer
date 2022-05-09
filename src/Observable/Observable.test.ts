import { map } from '../operators/map';
import Observable from './Observable';

describe('Observable', () => {
  let values: number[] = [];
  const observer = {
    next: (value: number) => {
      values.push(value);
    },
    error: (error: Error) => {
      console.log('we got an error', error);
    },
    complete: () => {
      console.log('ok, no more values');
    },
  };
  test('complete', () => {
    values = [];
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      setTimeout(() => {
        subscriber.next(3);
        subscriber.next(4);
      }, 100);
      subscriber.complete();
    });
    const sub = observable.subscribe(observer);
    expect(values).toStrictEqual([1, 2]);
  });
  test('unsubscribe', () => {
    values = [];
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      setTimeout(() => {
        subscriber.next(3);
        subscriber.next(4);
      }, 500);
    });
    const sub = observable.subscribe(observer);
    setTimeout(() => {
      sub.unsubscribe();
    }, 200);
    expect(values).toStrictEqual([1, 2]);
  });
  test('pipe', () => {
    values = [];
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      setTimeout(() => {
        subscriber.next(3);
        subscriber.next(4);
      }, 200);
    });
    const sub = observable
      .pipe(
        map((x: number) => x + 1),
        map((x: number) => x * 2),
      )
      .subscribe(observer);
    setTimeout(() => {
      expect(values).toStrictEqual([4, 6, 8, 10]);
    }, 500);
  });
});
