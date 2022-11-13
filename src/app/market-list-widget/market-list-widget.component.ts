import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MarketListWidgetFacadeService } from './services/market-list-widget.facade.service';
import { symbols } from '../core/mocks/symbols.mock';
import { first } from 'rxjs';

@Component({
  selector: 'app-market-list-widget',
  templateUrl: './market-list-widget.component.html',
  styleUrls: ['./market-list-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListWidgetComponent implements OnInit {

  public readonly markets$ = this.facade.markets$;

  constructor(
    @Inject(MarketListWidgetFacadeService) private facade: MarketListWidgetFacadeService,
  ) {
    facade.runWebsocketServices().subscribe();
  }

  ngOnInit(): void {
    this.facade.loadMarkets(symbols).pipe(first()).subscribe();
  }
}
