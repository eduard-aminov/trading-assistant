import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  TradingViewWebSocketPacket,
  TradingViewWebSocketResponse
} from '../../interfaces/trading-view/trading-view-web-socket-packet.interface';

const cleanerRgx = /~h~/g;
const splitterRgx = /~m~[0-9]+~m~/g;

@Injectable({
  providedIn: 'root'
})
export class TradingViewWebSocketService {
  private readonly channel = new WebSocket(`wss://data.tradingview.com/socket.io/websocket`);

  private _onChannelOpen$ = new Subject<Event>();
  private _onChannelClose$ = new Subject<CloseEvent>();
  private _onChannelMessage$ = new Subject<MessageEvent<TradingViewWebSocketPacket[]>>();
  private _onChannelError$ = new Subject<Event>();

  public onChannelOpen$ = this._onChannelOpen$.asObservable();
  public onChannelClose$ = this._onChannelClose$.asObservable();
  public onChannelMessage$ = this._onChannelMessage$.asObservable();
  public onChannelError$ = this._onChannelError$.asObservable();

  constructor() {
    this.channel.onopen = (event: Event) => {
      this._onChannelOpen$.next(event);
    };

    this.channel.onclose = (event: CloseEvent) => {
      this._onChannelClose$.next(event);
    };

    this.channel.onmessage = (event: MessageEvent<string>) => {
      const parsedPacket = this.parsePacket(event.data);
      if (this.isPingPacket(parsedPacket)) {
        this.pong(parsedPacket);
      } else {
        this._onChannelMessage$.next({...event, data: parsedPacket});
      }
    };

    this.channel.onerror = (event: Event) => {
      this._onChannelError$.next(event);
    };
  }

  public send(packet: TradingViewWebSocketPacket | string): void {
    if (this.channel.OPEN) {
      const formattedPacket = this.formatPacket(packet);
      this.channel.send(formattedPacket);
    }
  }

  private parsePacket(str: string): TradingViewWebSocketPacket[] {
    return str.replace(cleanerRgx, '')
              .split(splitterRgx)
              .map((p) => {
                if (!p) {
                  return false;
                }
                try {
                  return JSON.parse(p);
                } catch (error) {
                  console.warn('Cant parse', p);
                  return false;
                }
              })
              .filter((p) => p);
  };

  private formatPacket(packet: TradingViewWebSocketPacket | string): string {
    const msg = typeof packet === 'object'
                ? JSON.stringify(packet)
                : String(packet);
    return `~m~${msg.length}~m~${msg}`;
  };

  private isPingPacket(response: TradingViewWebSocketResponse): boolean {
    return typeof response[0] === 'number';
  }

  private pong(response: TradingViewWebSocketResponse): void {
    this.send(`~h~${response[0]}`);
  }
}
