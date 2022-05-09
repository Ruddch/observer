import { fromArray } from './fromArray';
import { ObserverFn } from '../Observable/Observable';

describe('from Array', () => {
  const testRes: number[] = [];
  const log: ObserverFn<number> = (n: number) => {
    testRes.push(n);
  };

  test('common', () => {
    fromArray([1, 2, 3]).subscribe(log);
    expect(testRes).toStrictEqual([1, 2, 3]);
  });
});
