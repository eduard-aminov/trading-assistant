import { match } from '../utils/pattern-matching';

export enum SortType {
  Default,
  Asc,
  Desc,
}

export class TableColumnSorter<T> {
  private _type = SortType.Default;

  private _array: T[] = [];

  constructor(defaultArray?: T[]) {
    this.setDefaultArray(defaultArray);
  }

  public setDefaultArray(defaultArray: T[] = []): void {
    this._array = defaultArray;
  }

  public getType(): SortType {
    return this._type;
  }

  public setType(type: SortType): void {
    this._type = type;
  }

  public nextType(): void {
    this._type = match(this._type)
      .case(SortType.Default, SortType.Desc)
      .case(SortType.Desc, SortType.Asc)
      .case(SortType.Asc, SortType.Default)
      .default();
  }

  public sort(key?: keyof T): T[] {
    const array = this._array.slice();
    if (this.getType() === SortType.Default) {
      return array;
    }
    if (key) {
      array.sort((a, b) => {
          if (this.getType() === SortType.Desc ? a[key] < b[key] : a[key] > b[key]) {
            return -1;
          }
          if (this.getType() === SortType.Asc ? a[key] > b[key] : a[key] < b[key]) {
            return 1;
          }
          return 0;
        }
      );
    }
    return array;
  }
}
