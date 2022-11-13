import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetApiService } from './market-list-widget.api.service';
import { combineLatest, forkJoin, map, Observable, tap } from 'rxjs';
import { MarketListWidgetWebsocketService } from './market-list-widget.websocket.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');

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
    return forkJoin(
      symbols.map(symbol => this.api.loadSymbolData(symbol, ['lp'])),
    ).pipe(
      map(() => true)
    );
  }
}
