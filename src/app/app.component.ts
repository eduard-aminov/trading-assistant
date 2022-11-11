import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TradingViewApiService } from './core/services/trading-view-api.service';

const symbols = [
  'MOEX:AFKS',
  'MOEX:AFLT',
  'MOEX:AGRO',
  'MOEX:ALRS',
  'MOEX:BANE',
  'MOEX:CBOM',
  'MOEX:CHMF',
  'MOEX:CIAN',
  'MOEX:DSKY',
  'MOEX:ENRU',
  'MOEX:ETLN',
  'MOEX:FEES',
  'MOEX:FIVE',
  'MOEX:GAZP',
  'MOEX:GEMC',
  'MOEX:GMKN',
  'MOEX:IRAO',
  'MOEX:LKOH',
  'MOEX:LSRG',
  'MOEX:MAGN',
  'MOEX:MDMG',
  'MOEX:MGNT',
  'MOEX:MOEX',
  'MOEX:MTLR',
  'MOEX:MTSS',
  'MOEX:MVID',
  'MOEX:NLMK',
  'MOEX:NVTK',
  'MOEX:OGKB',
  'MOEX:OZON',
  'MOEX:PHOR',
  'MOEX:PIKK',
  'MOEX:PLZL',
  'MOEX:POLY',
  'MOEX:RASP',
  'MOEX:ROSN',
  'MOEX:RSTI',
  'MOEX:RTKM',
  'MOEX:RUAL',
  'MOEX:SBER',
  'MOEX:SFTL',
  'MOEX:SIBN',
  'MOEX:SNGS',
  'MOEX:TATN',
  'MOEX:TGKA',
  'MOEX:UPRO',
  'MOEX:VKCO',
  'MOEX:VTBR',
  'MOEX:YNDX',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'trading-assistant';

  public stocksWatchers = symbols.map(symbol => this.tradingViewService.watch(symbol));
  public extremeVolumeNotifications$ = this.tradingViewService.extremeVolumeNotifications$;

  constructor(private tradingViewService: TradingViewApiService) {
    tradingViewService.initMarkets(symbols);
  }

  public getPercentageChangeColor(percentage: string): string {
    return percentage[0] === '-' ? 'red' : 'green';
  }
}
