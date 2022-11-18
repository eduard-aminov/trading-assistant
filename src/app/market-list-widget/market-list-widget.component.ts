import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MarketListWidgetFacadeService } from './services/market-list-widget.facade.service';
import { symbols } from '../core/mocks/symbols.mock';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../core/services/destroy.service';

@Component({
  selector: 'app-market-list-widget',
  templateUrl: './market-list-widget.component.html',
  styleUrls: ['./market-list-widget.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListWidgetComponent implements OnInit {

  public readonly markets$ = this.facade.markets$;
  public readonly isMarketsLoading$ = this.facade.isMarketsLoading$;

  constructor(
    @Inject(MarketListWidgetFacadeService) private facade: MarketListWidgetFacadeService,
    @Inject(DestroyService) private destroy$: DestroyService,
  ) {
    facade.runWebsocketApi().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnInit(): void {
    this.facade.loadMarkets(symbols).subscribe();
  }
}
