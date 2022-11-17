import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetApiService } from './market-list-widget.api.service';
import { finalize, map, Observable, switchMap, takeWhile } from 'rxjs';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');
  public readonly isMarketsLoading$ = this.store.select('isMarketsLoading');

  constructor(
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
    @Inject(MarketListWidgetApiService) private api: MarketListWidgetApiService,
  ) {}

  public runWebsocketApi(): Observable<boolean> {
    return this.api.run();
  }

  public loadMarkets(symbols: string[]): Observable<boolean> {
    return this.api.loadSymbolsData(symbols).pipe(
      switchMap(() => this.store.select('markets')),
      takeWhile(markets => markets.length < symbols.length),
      finalize(() => this.store.setState({isMarketsLoading: false})),
      map(() => true)
    );
  }
}
