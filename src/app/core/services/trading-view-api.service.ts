import { Inject, Injectable } from '@angular/core';
import { TradingViewWebSocketService } from './trading-view-web-socket.service';
import { first, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { TradingViewWebSocketMessage } from '../models/trading-view-web-socket-message';
import { TradingViewTimeframe } from '../interfaces/trading-view.interface';
import { TradingViewWebSocketSendPacketType } from '../enums/trading-view-packet-type';
import { ResolveSymbolPacket, SendPacket } from '../classes/packet';

@Injectable({
  providedIn: 'root'
})
export class TradingViewApiService {

  public messages$: Observable<TradingViewWebSocketMessage[]>;

  constructor(
    @Inject(TradingViewWebSocketService) private webSocketService: TradingViewWebSocketService
  ) {
    this.messages$ = webSocketService.onChannelOpen$.pipe(
      switchMap(() => webSocketService.authorized$),
      switchMap(() => webSocketService.onChannelMessage$),
      map(event => event.data),
      takeUntil(webSocketService.onChannelClose$),
    );
  }

  public createSession(sessionId: string): Observable<boolean> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.ChartCreateSession,
          p: [sessionId] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
      map(() => true),
    );
  }

  public resolveSymbol(symbol: string, sessionId: string, seriesId: string): Observable<boolean> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new ResolveSymbolPacket({
          sessionId,
          seriesId,
          options: {
            symbol,
            adjustment: 'splits',
          }
        });
        this.webSocketService.send(sendPacket);
      }),
      map(() => true),
    );
  }

  public createSeries(symbol: string, sessionId: string, seriesId: string, timeframe: TradingViewTimeframe, range: number): Observable<boolean> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.CreateSeries,
          p: [
            sessionId,
            '$prices',
            's1',
            seriesId,
            timeframe,
            range,
          ] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
      map(() => true),
    );
  }

  public quoteCreateSession(sessionId: string): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.QuoteCreateSession,
          p: [sessionId] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
    );
  }

  public quoteSetFields(sessionId: string, fields: string[]): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.QuoteSetFields,
          p: [sessionId, ...fields] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
    );
  }

  public quoteFastSymbols(sessionId: string): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.QuoteFastSymbols,
          p: [sessionId] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
    );
  }

  public quoteAddSymbols(sessionId: string, symbols: string[]): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.QuoteAddSymbols,
          p: [sessionId, ...symbols] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
    );
  }

  public quoteRemoveSymbols(sessionId: string, symbols: string[]): Observable<void> {
    return this.webSocketService.authorized$.pipe(
      first(),
      tap(() => {
        const sendPacket = new SendPacket({
          m: TradingViewWebSocketSendPacketType.QuoteRemoveSymbols,
          p: [sessionId, ...symbols] as any,
        });
        this.webSocketService.send(sendPacket);
      }),
    );
  }
}
