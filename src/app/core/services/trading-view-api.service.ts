import { Injectable } from '@angular/core';
import { TradingViewWebSocketService } from './trading-view-web-socket.service';
import { BehaviorSubject, first, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { match } from '../../utils/pattern-matching';
import { TradingViewPacketType } from '../../enums/trading-view-packet-type';
import { TradingViewWebSocketPacket } from '../../interfaces/trading-view/trading-view-web-socket-packet.interface';
import { Market } from '../../models/trading-view/market.model';
import { RxMap } from '../../classes/rx-map';
import { PricePeriod } from '../../models/trading-view/price-period.model';

@Injectable({
  providedIn: 'root'
})
export class TradingViewApiService {

  private extremeVolumeNotifications$$ = new BehaviorSubject<string[]>([]);
  public extremeVolumeNotifications$ = this.extremeVolumeNotifications$$.pipe();

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

  public initMarkets(symbols: string[]): void {
    this.webSocketService.onChannelOpen$.pipe(
      first(),
      tap(() => {
        for (const symbol of symbols) {
          this.createSession(symbol);
          this.resolveSymbol(symbol, symbol);
          this.createSeries(symbol, 'D', 2);
        }
      }),
    ).subscribe();
  }

  public watch(symbol: string): Observable<Market | null> {
    return this.sessions.getAsObservable(symbol);
  }

  private handlePacketByType(packet: TradingViewWebSocketPacket): void {
    match(packet.m)
      .case(TradingViewPacketType.SeriesLoading, () => this.onSeriesLoading(packet))
      .case(TradingViewPacketType.SeriesCompleted, () => this.onSeriesCompleted(packet))
      .case(TradingViewPacketType.SymbolResolved, () => this.onSymbolResolved(packet))
      .case(TradingViewPacketType.TimescaleUpdate, () => this.onTimescaleUpdate(packet))
      .case(TradingViewPacketType.Du, () => this.onDataUpdate(packet))
      .default(() => console.log(packet));
  }

  private onSymbolResolved(packet: TradingViewWebSocketPacket): void {
    const sessionId = packet.p[0];
    const data = packet.p[2];
    this.sessions.set(sessionId, new Market(data));
  }

  private onSeriesLoading(packet: TradingViewWebSocketPacket): void {
    // console.log(packet);
  }

  private onSeriesCompleted(packet: TradingViewWebSocketPacket): void {
    // console.log(packet);
  }

  private onTimescaleUpdate(packet: TradingViewWebSocketPacket): void {
    const sessionId = packet.p[0];
    const market = this.sessions.get(sessionId);
    if (market) {
      const prices = packet.p[1].$prices.s;
      const prevPricePeriod = new PricePeriod(prices[0].v);
      const currentPricePeriod = new PricePeriod(prices[1].v);
      market.setPrevPricePeriod(prevPricePeriod);
      market.setCurrentPricePeriod(currentPricePeriod);
      this.sessions.set(sessionId, market);
    }
  }

  private onDataUpdate(packet: TradingViewWebSocketPacket): void {
    const sessionId = packet.p[0];
    const market = this.sessions.get(sessionId);
    if (market) {
      const prices = packet.p[1].$prices.s;

      const currentPricePeriod = new PricePeriod(prices[0].v);
      this.notifyExtremeVolume(sessionId, market.currentPricePeriod.volume, currentPricePeriod.volume);

      market.setCurrentPricePeriod(currentPricePeriod);
      this.sessions.set(sessionId, market);
    }
  }

  private notifyExtremeVolume(
    symbol: string,
    prevVolume: number,
    currentVolume: number
  ): void {
    if (((currentVolume / prevVolume) * 100) - 100 > 0.5) {
      this.extremeVolumeNotifications$$.next(
        [...this.extremeVolumeNotifications$$.value, symbol]
      );
    }
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

  private createSeries(sessionId: string, timeframe = 'D', range = 1): void {
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
