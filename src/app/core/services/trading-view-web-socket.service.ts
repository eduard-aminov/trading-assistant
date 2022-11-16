import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  TradingViewWebSocketMessagePacket,
  TradingViewWebSocketResponse,
  TradingViewWebSocketSendPacket
} from '../interfaces/trading-view-web-socket-packet.interface';
import { TradingViewWebSocketSendPacketType } from '../enums/trading-view-packet-type';
import { environment } from '../../../environments/environment';

const cleanerRgx = /~h~/g;
const splitterRgx = /~m~[0-9]+~m~/g;

@Injectable({
  providedIn: 'root'
})
export class TradingViewWebSocketService {
  private readonly channel = new WebSocket(environment.TRADING_VIEW_WS_API_URL);

  private _authorized$ = new Subject<void>();
  private _onChannelOpen$ = new Subject<Event>();
  private _onChannelClose$ = new Subject<CloseEvent>();
  private _onChannelMessage$ = new Subject<MessageEvent<TradingViewWebSocketMessagePacket[]>>();
  private _onChannelError$ = new Subject<Event>();

  public authorized$ = this._authorized$.asObservable();
  public onChannelOpen$ = this._onChannelOpen$.asObservable();
  public onChannelClose$ = this._onChannelClose$.asObservable();
  public onChannelMessage$ = this._onChannelMessage$.asObservable();
  public onChannelError$ = this._onChannelError$.asObservable();

  constructor() {
    this.channel.onopen = (event: Event) => {
      this.send({
        m: TradingViewWebSocketSendPacketType.SetAuthToken,
        p: [environment.TRADING_VIEW_AUTH_TOKEN] as any,
      });
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
        if ((parsedPacket as any)[0]['session_id']) {
          this._authorized$.next();
        }

        this._onChannelMessage$.next({...event, data: parsedPacket});
      }
    };

    this.channel.onerror = (event: Event) => {
      this._onChannelError$.next(event);
    };
  }

  public send(packet: TradingViewWebSocketSendPacket | string): void {
    if (this.channel.OPEN) {
      const formattedPacket = this.formatPacket(packet);
      this.channel.send(formattedPacket);
    }
  }

  private parsePacket(str: string): TradingViewWebSocketMessagePacket[] {
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

  private formatPacket(packet: TradingViewWebSocketSendPacket | string): string {
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
