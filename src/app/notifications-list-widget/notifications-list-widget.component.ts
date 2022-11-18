import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { filter, map, switchMap, takeUntil } from 'rxjs';
import { DestroyService } from '../core/services/destroy.service';
import { symbols } from '../core/mocks/symbols.mock';
import { TelegramBotApiService } from '../core/services/telegram-bot-api.service';
import { environment } from '../../environments/environment';
import { isPresent } from '../core/utils/is-present';
import { Money } from '../core/classes/money';

const TELEGRAM_USER_ID = environment.TELEGRAM_USER_ID;

@Component({
  selector: 'app-notifications-list-widget',
  templateUrl: './notifications-list-widget.component.html',
  styleUrls: ['./notifications-list-widget.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListWidgetComponent implements OnInit {

  public readonly notifications$ = this.facade.notifications$;
  public readonly isNotificationsEmpty$ = this.facade.isNotificationsEmpty$;

  constructor(
    @Inject(TelegramBotApiService) private telegramBotApi: TelegramBotApiService,
    @Inject(NotificationsListWidgetFacadeService) private facade: NotificationsListWidgetFacadeService,
    @Inject(DestroyService) private destroy$: DestroyService,
  ) {
    facade.runWebsocketApi().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnInit(): void {
    this.facade.startListenMarketsChanges(symbols).subscribe();

    this.notifications$.pipe(
      map(notifications => notifications.at(-1)),
      filter(isPresent),
      switchMap(notification => this.telegramBotApi.sendMessage(
        TELEGRAM_USER_ID,
        `${notification!.marketName} - ${
          new Money(notification!.marketCurrency!)
            .from(notification!.volumeTotalSum)
        }`)
      ),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
