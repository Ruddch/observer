import Observable from '../Observable/Observable';

const map = <T, R>(transform: (n: T) => R) => {
  return (source: Observable<T>) => {
    return new Observable<R>((sub) => {
      source.subscribe((val) => {
        sub.next(transform(val));
      });
    });
  };
};

export { map };
