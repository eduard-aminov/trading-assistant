import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TradingViewService } from './services/trading-view.service';

const stocks = [
  {market: 'MOEX', ticker: 'VTBR'},
  {market: 'MOEX', ticker: 'VKCO'},
  {market: 'MOEX', ticker: 'IRAO'},
  {market: 'MOEX', ticker: 'SBER'},
  {market: 'MOEX', ticker: 'GAZP'},
  {market: 'MOEX', ticker: 'RUAL'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'trading-assistant';

  public stocksWatchers = stocks.map(stock => ({
    ...stock,
    watcher$: this.tradingViewService.watch(stock.market, stock.ticker)
  }));

  constructor(private tradingViewService: TradingViewService) {}
}
