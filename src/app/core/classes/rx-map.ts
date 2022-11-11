import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';

export class RxMap<K extends string, V> {
  private storage = new BehaviorSubject<{ key: K, value: V }[]>([]);

  public get size(): number {
    return this.storage.value.length;
  }

  constructor(initialStorage?: { key: K, value: V }[]) {
    initialStorage && this.storage.next(initialStorage);
  }

  set(key: K, value: V): this {
    if (this.has(key)) {
      this.storage.next(this.storage.value.map(data => {
        if (data.key === key) {
          data.value = value;
        }
        return data;
      }));
    } else {
      this.storage.next([...this.storage.value, {key, value}]);
    }
    return this;
  }

  get(key: K): V | undefined {
    return this.storage.value.find(data => data.key === key)?.value;
  }

  getAsObservable(key: K): Observable<V | null> {
    return this.storage.pipe(
      map(storage => storage.find(data => data.key === key)?.value ?? null),
    );
  }

  has(key: K): boolean {
    return this.storage.value.some(data => data.key === key);
  }

  delete(key: K): boolean {
    if (this.has(key)) {
      this.storage.next(this.storage.value.filter(data => data.key !== key));
      return true;
    }
    return false;
  }

  clear() {
    this.storage.next([]);
  }
}
