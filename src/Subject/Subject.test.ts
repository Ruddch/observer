import { Subject } from './Subject';
import { ObserverFn } from '../Observable/Observable';
import { fromArray } from '../from/fromArray';

describe('Subject', () => {
  const testRes: number[] = [];
  const log: ObserverFn<number> = (n: number) => {
    testRes.push(n);
  };
  const subject = new Subject<number>();
  subject.subscribe(log);
  subject.subscribe(log);

  test('common', () => {
    const observable = fromArray([1, 2, 3]);
    observable.subscribe(subject);
    expect(testRes).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });
});
