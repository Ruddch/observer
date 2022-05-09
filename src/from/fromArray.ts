import Observable from '../Observable/Observable';

const fromArray = <T>(array: T[]): Observable<T> => {
  return new Observable((sub) => {
    try {
      for (let i = 0; i < array.length; i++) {
        sub.next(array[i]);
      }
    } catch (e) {
      const err = e as Error;
      sub.error(err);
    }
    sub.complete();
  });
};

export { fromArray };
