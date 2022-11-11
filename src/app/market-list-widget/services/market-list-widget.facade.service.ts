import { Inject, Injectable } from '@angular/core';
import { MarketListWidgetStoreService } from './market-list-widget.store.service';

@Injectable()
export class MarketListWidgetFacadeService {

  public readonly markets$ = this.store.select('markets');

  constructor(
    @Inject(MarketListWidgetStoreService) private store: MarketListWidgetStoreService,
  ) {}
}
