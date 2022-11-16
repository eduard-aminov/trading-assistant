import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MarketListWidgetFacadeService } from './services/market-list-widget.facade.service';
import { symbols } from '../core/mocks/symbols.mock';
import { tap } from 'rxjs';
import { TelegramBotApiService } from '../core/services/telegram-bot-api.service';

@Component({
  selector: 'app-market-list-widget',
  templateUrl: './market-list-widget.component.html',
  styleUrls: ['./market-list-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListWidgetComponent implements OnInit {

  public readonly markets$ = this.facade.markets$;
  public readonly isMarketsLoading$ = this.facade.isMarketsLoading$;

  constructor(
    @Inject(MarketListWidgetFacadeService) private facade: MarketListWidgetFacadeService,
    private tg: TelegramBotApiService,
  ) {
    // tg.getUpdates().subscribe();
    // tg.sendMessage('228547762', 'Привет, яратканымочка мой!').subscribe();
    facade.runWebsocketServices().subscribe();
  }

  ngOnInit(): void {
    this.facade.loadMarkets(symbols).subscribe();
  }
}
