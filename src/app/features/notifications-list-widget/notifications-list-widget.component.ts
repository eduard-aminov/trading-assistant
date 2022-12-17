import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { combineLatest, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../core/services/destroy.service';
import { TelegramBotApiService } from '../../core/services/telegram-bot-api.service';
import { environment } from '../../../environments/environment';
import { isPresent } from '../../core/utils/is-present';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Money } from '../../core/classes/money';

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
    @Inject(NgxIndexedDBService) private dbService: NgxIndexedDBService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.facade.openMarketsChangesConnection(),
      this.facade.subscribeMarketsChanges(),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe();

    this.notifications$.pipe(
      map(notifications => notifications.at(-1)),
      filter(isPresent),
      filter(notification => notification!.volumeTotalSum > 10000),
      switchMap(notification => this.telegramBotApi.sendMessage(
        TELEGRAM_USER_ID,
        `${notification!.marketName} - ${
          new Money(notification!.marketCurrency!)
            .from(notification!.volumeTotalSum)
        } (${notification!.amount}) ${notification!.direction}`)
      ),
      takeUntil(this.destroy$)
    ).subscribe();

    //   this.notifications$.pipe(
    //     map(notifications => notifications.at(-1)),
    //     filter(isPresent),
    //     switchMap(notification => {
    //       return this.dbService.add('deals', {
    //         name: notification!.marketName,
    //         time: notification!.time,
    //         summa: notification!.volumeTotalSum,
    //         direction: notification!.direction,
    //       });
    //     }),
    //     takeUntil(this.destroy$)
    //   ).subscribe();
    //
    //   this.dbService.getAll<any>('deals').pipe(
    //     map(notifications => {
    //         const name = 'MOEX:PLZL';
    //         const ruble = new Money('RUB');
    //         const filteredArray = notifications.filter(item => item.name === name);
    //         return {
    //           name,
    //           longSumma: ruble.from(filteredArray.reduce((acc, cur) => {
    //             if (cur.direction === 'Лонг') {
    //               return acc + cur.summa;
    //             }
    //
    //             return acc;
    //           }, 0)),
    //           shortSumma: ruble.from(filteredArray.reduce((acc, cur) => {
    //             if (cur.direction === 'Шорт') {
    //               return acc + cur.summa;
    //             }
    //
    //             return acc;
    //           }, 0))
    //         };
    //       }
    //     ),
    //     tap(console.log),
    //   ).subscribe();
    // }
  }

  ngOnDestroy(): void {
    this.facade.closeMarketsChangesConnection().pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
