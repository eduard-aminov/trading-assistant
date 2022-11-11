import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable()
export class MarketListWidgetApiService {

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
  ) {}

  public loadMarket(symbol: string): Observable<boolean> {
    return forkJoin([
      this.api.createSession(symbol),
      this.api.resolveSymbol(symbol, symbol),
    ]).pipe(
      map(() => true),
    );
  }
}
