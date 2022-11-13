import { Inject, Injectable } from '@angular/core';
import { TradingViewWebSocketService } from './trading-view-web-socket.service';
import { TradingViewPacketType } from '../enums/trading-view-packet-type';
import { first, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { TradingViewWebSocketMessage } from '../models/trading-view-web-socket-message';
import { TradingViewTimeframe } from '../interfaces/trading-view.interface';

@Injectable({
  providedIn: 'root'
})
export class TradingViewApiService {

  public messages$: Observable<TradingViewWebSocketMessage[]>;

  constructor(
    @Inject(TradingViewWebSocketService) private webSocketService: TradingViewWebSocketService
  ) {
    this.messages$ = webSocketService.onChannelOpen$.pipe(
      // tap(() => this.setUnauthorizedUserToken()),
      switchMap(() => webSocketService.authorized$),
      switchMap(() => webSocketService.onChannelMessage$),
      map(event => event.data.map(message => new TradingViewWebSocketMessage(message))),
      takeUntil(webSocketService.onChannelClose$),
    );
  }

  private setUnauthorizedUserToken(): void {
    this.webSocketService.send({
      m: TradingViewPacketType.SetAuthToken,
      p: ['unauthorized_user_token'] as any,
    });
  }

  public createSession(sessionId: string): Observable<boolean> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.ChartCreateSession,
          p: [sessionId] as any,
        });
      }),
      map(() => true),
    );
  }

  public resolveSymbol(symbol: string, sessionId: string, seriesId: string): Observable<boolean> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.ResolveSymbol,
          p: [
            sessionId,
            `ser_1`,
            `=${JSON.stringify({
              symbol,
              adjustment: 'splits'
            })}`,
          ] as any,
        });
      }),
      map(() => true),
    );
  }

  public createSeries(symbol: string, sessionId: string, seriesId: string, timeframe: TradingViewTimeframe, range: number): Observable<boolean> {
    return this.webSocketService.onChannelOpen$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.CreateSeries,
          p: [
            sessionId,
            '$prices',
            's1',
            seriesId,
            timeframe,
            range,
          ] as any,
        });
      }),
      map(() => true),
    );
  }

  public quoteCreateSession(sessionId: string): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.QuoteCreateSession,
          p: [sessionId] as any,
        });
      }),
    );
  }

  public quoteSetFields(sessionId: string, fields: string[]): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.QuoteSetFields,
          p: [sessionId, ...fields] as any,
        });
      }),
    );
  }

  public quoteAddSymbols(sessionId: string, symbol: string): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        this.webSocketService.send({
          m: TradingViewPacketType.QuoteAddSymbols,
          p: [sessionId, symbol] as any,
        });
      }),
    );
  }
}
