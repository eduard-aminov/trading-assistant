import { Injectable } from '@angular/core';
import { TradingViewWebSocketService } from './trading-view-web-socket.service';
import { map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { genSessionID } from '../utils/get-session-id';
import { match } from '../utils/pattern-matching';
import { TradingViewPacketType } from '../enums/trading-view-packet-type';
import { TradingViewWebSocketPacket } from '../interfaces/trading-view/trading-view-web-socket-packet.interface';
import { Market } from '../models/trading-view/market.model';
import { RxMap } from '../classes/rx-map';
import { PricePeriod } from '../models/trading-view/price-period.model';

@Injectable({
  providedIn: 'root'
})
export class TradingViewService {

  private sessions = new RxMap<string, Market>();

  constructor(private webSocketService: TradingViewWebSocketService) {
    webSocketService.onChannelOpen$.pipe(
      tap(() => this.setUnauthorizedUserToken()),
      switchMap(() => webSocketService.onChannelMessage$),
      map(event => event.data),
      tap(data => data.forEach(packet => this.handlePacketByType(packet))),
      takeUntil(webSocketService.onChannelClose$)
    ).subscribe();
  }

  private handlePacketByType(packet: TradingViewWebSocketPacket): void {
    match(packet.m)
      .case(TradingViewPacketType.SymbolResolved, () => this.onSymbolResolved(packet))
      .case(TradingViewPacketType.Du, () => this.onDataUpdate(packet))
      .default();
  }

  private onSymbolResolved(packet: TradingViewWebSocketPacket): void {
    const sessionId = packet.p[0];
    const data = packet.p[2];
    this.sessions.set(sessionId, new Market(data));
  }

  private onDataUpdate(packet: TradingViewWebSocketPacket): void {
    const sessionId = packet.p[0];
    const market = this.sessions.get(sessionId);
    if (market) {
      const data = packet.p[1].$prices.s[0].v;
      market.setPricePeriod(new PricePeriod(data));
      this.sessions.set(sessionId, market);
    }
  }

  public watch(symbol: string, timeframe?: string): Observable<Market | null> {
    const sessionId = genSessionID();
    return this.webSocketService.onChannelOpen$.pipe(
      tap(() => this.createSession(sessionId)),
      tap(() => this.resolveSymbol(symbol, sessionId)),
      tap(() => this.createSeries(sessionId, timeframe)),
      switchMap(() => this.sessions.getAsObservable(sessionId)),
    );
  }

  private setUnauthorizedUserToken(): void {
    this.webSocketService.send({
      m: TradingViewPacketType.SetAuthToken, p: ['unauthorized_user_token']
    });
  }

  private createSession(sessionId: string): void {
    this.webSocketService.send({
      m: TradingViewPacketType.ChartCreateSession, p: [sessionId]
    });
  }

  private resolveSymbol(symbol: string, sessionId: string): void {
    this.webSocketService.send({
      m: TradingViewPacketType.ResolveSymbol, p: [
        sessionId,
        `ser_1`,
        `=${JSON.stringify({
          symbol,
          adjustment: 'splits'
        })}`,
      ]
    });
  }

  private createSeries(sessionId: string, timeframe = '60', range = 1): void {
    this.webSocketService.send({
      m: TradingViewPacketType.CreateSeries, p: [
        sessionId,
        '$prices',
        's1',
        `ser_1`,
        timeframe,
        range,
      ]
    });
  }
}
