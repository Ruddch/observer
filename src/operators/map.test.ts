import { ObserverFn } from '../Observable/Observable';
import { fromArray } from '../from/fromArray';
import { map } from './map';

describe('operations', () => {
  test('map', () => {
    const testRes: number[] = [];
    const log: ObserverFn<number> = (n: number) => {
      testRes.push(n);
    };
    const observer = fromArray([1, 2, 3]);
    map((x: number) => x + 1)(observer).subscribe(log);
    expect(testRes).toStrictEqual([2, 3, 4]);
  });
});
