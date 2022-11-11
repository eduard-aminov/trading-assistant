import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetApiService } from './market-list-widget.api.service';
import { forkJoin, map, Observable } from 'rxjs';
import { MarketListWidgetWebsocketService } from './market-list-widget.websocket.service';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');

  constructor(
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
    @Inject(MarketListWidgetApiService) private api: MarketListWidgetApiService,
    @Inject(MarketListWidgetWebsocketService) webSocket: MarketListWidgetWebsocketService,
  ) {
    webSocket.run();
  }

  public loadMarkets(symbols: string[]): Observable<boolean> {
    return forkJoin(
      symbols.map(symbol => this.api.loadMarket(symbol))
    ).pipe(
      map(() => true)
    );
  }
}
