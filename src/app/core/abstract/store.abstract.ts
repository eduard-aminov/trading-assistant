import { BehaviorSubject, filter, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class Store<State> {
  private _state: BehaviorSubject<State> = new BehaviorSubject<State>(this._initialState);
  public state$: Observable<State> = this._state.asObservable();

  protected constructor(private _initialState: State) {}

  get stateSnapshot(): State {
    return this._state.getValue();
  }

  setState(value: Partial<State>): void {
    this._state.next({...this.stateSnapshot, ...value});
  }

  select<T extends keyof State>(key: T): Observable<State[T]> {
    return this.state$.pipe(
      map(item => item[key]),
      filter(v => !!v),
      distinctUntilChanged(),
    );
  }
}
