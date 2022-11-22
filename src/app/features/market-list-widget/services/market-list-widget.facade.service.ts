import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';
import { MarketListWidgetApiService } from './market-list-widget.api.service';
import { Observable, tap } from 'rxjs';
import { MarketListWidgetItem } from '../models/market-list-widget.model';
import { removeFalsyPropValueFromObject } from '../../../core/utils/remove-falsy-props-from-object';
import { symbols } from '../../../core/mocks/symbols.mock';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');
  public readonly isMarketsLoading$ = this.store.select('isMarketsLoading');

  constructor(
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
    @Inject(MarketListWidgetApiService) private api: MarketListWidgetApiService,
  ) {}

  public openMarketsChangesConnection(): Observable<void> {
    return this.api.openMarketsChangesConnection(['lp', 'chp']);
  }

  public closeMarketsChangesConnection(): Observable<void> {
    return this.api.closeMarketChangesConnection();
  }

  public subscribeMarketsChanges(): Observable<MarketListWidgetItem[]> {
    return this.api.subscribeMarketsChanges(symbols).pipe(
      tap(markets => {
        for (const market of markets) {
          this.updateOrAddMarket(market);
        }

        this.store.setState({isMarketsLoading: false});
      }),
    );
  }

  private updateOrAddMarket(market: MarketListWidgetItem): void {
    const existMarket = this.store.stateSnapshot.markets.find(item => item.symbol === market.symbol);

    if (existMarket) {
      this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(market)});
    } else {
      this.store.addMarket(market);
    }
  }
}
