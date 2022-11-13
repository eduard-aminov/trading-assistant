import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetApiService } from './market-list-widget.api.service';
import { combineLatest, finalize, map, Observable, switchMap, takeWhile } from 'rxjs';
import { MarketListWidgetWebsocketService } from './market-list-widget.websocket.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');
  public readonly isMarketsLoading$ = this.store.select('isMarketsLoading');

  constructor(
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
    @Inject(MarketListWidgetApiService) private api: MarketListWidgetApiService,
    @Inject(MarketListWidgetWebsocketService) private webSocket: MarketListWidgetWebsocketService,
  ) {}

  public runWebsocketServices(): Observable<boolean> {
    return combineLatest([
      this.webSocket.run(),
      this.api.run(),
    ]).pipe(
      map(() => true),
      distinctUntilChanged(),
    );
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
