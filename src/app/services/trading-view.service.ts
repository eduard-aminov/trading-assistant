import { Injectable } from '@angular/core';
import { TradingViewWebSocketService } from './trading-view-web-socket.service';
import { filter, map, Observable, pairwise, switchMap, tap } from 'rxjs';
import { TradingViewPeriod } from '../models/trading-view/trading-view-period.model';
import { genSessionID } from '../utils/get-session-id';

@Injectable({
  providedIn: 'root'
})
export class TradingViewService {
  constructor(private webSocketService: TradingViewWebSocketService) {
    webSocketService.onChannelOpen$.pipe(
      tap(() => webSocketService.send({
        m: 'set_auth_token', p: ['unauthorized_user_token']
      })),
    ).subscribe();
  }

  public watch(market: string, ticker: string): Observable<[TradingViewPeriod, TradingViewPeriod]> {
    const sessionId = genSessionID('cs');

    return this.webSocketService.onChannelOpen$.pipe(
      tap(() => {
        this.webSocketService.send({
          m: 'chart_create_session', p: [sessionId]
        });
        this.webSocketService.send({
          m: 'resolve_symbol', p: [
            sessionId,
            `ser_1`,
            `=${JSON.stringify({
              symbol: `${market}:${ticker}`,
              adjustment: 'splits'
            })}`,
          ]
        });
        this.webSocketService.send({
          m: 'create_series', p: [
            sessionId,
            '$prices',
            's1',
            `ser_1`,
            '1',
            1,
          ]
        });
      }),
      switchMap(() => this.webSocketService.onChannelMessage$.pipe(
        map(event => event.data),
        filter(packet => packet[0].m === 'du'),
        filter(packet => packet[0].p[0] === sessionId),
        map(packet => packet[0].p[1].$prices.s[0].v),
        map(data => new TradingViewPeriod(data))
      )),
      pairwise(),
    );
  }
}
