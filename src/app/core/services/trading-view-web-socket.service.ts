import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TradingViewWebSocketSendPacketType } from '../enums/trading-view-packet-type';
import { environment } from '../../../environments/environment';
import { MessagePacket, SendPacket } from '../classes/packet';
import { TradingViewWebSocketMessage } from '../models/trading-view-web-socket-message';

@Injectable({
  providedIn: 'root'
})
export class TradingViewWebSocketService {
  private readonly channel = new WebSocket(environment.TRADING_VIEW_WS_API_URL);

  private _authorized$ = new Subject<void>();
  private _onChannelOpen$ = new Subject<Event>();
  private _onChannelClose$ = new Subject<CloseEvent>();
  private _onChannelMessage$ = new Subject<MessageEvent<TradingViewWebSocketMessage[]>>();
  private _onChannelError$ = new Subject<Event>();

  public authorized$ = this._authorized$.asObservable();
  public onChannelOpen$ = this._onChannelOpen$.asObservable();
  public onChannelClose$ = this._onChannelClose$.asObservable();
  public onChannelMessage$ = this._onChannelMessage$.asObservable();
  public onChannelError$ = this._onChannelError$.asObservable();

  constructor() {
    this.channel.onopen = (event: Event) => {
      const packet = new SendPacket({
        m: TradingViewWebSocketSendPacketType.SetAuthToken,
        p: [environment.TRADING_VIEW_AUTH_TOKEN] as any,
      });
      this.send(packet);
      this._onChannelOpen$.next(event);
      this._authorized$.next();
    };

    this.channel.onclose = (event: CloseEvent) => {
      this._onChannelClose$.next(event);
    };

    this.channel.onmessage = (event: MessageEvent<string>) => {
      const messagePacket = new MessagePacket(event.data);
      const formattedMessagePacket = messagePacket.format();

      if (messagePacket.isPing(formattedMessagePacket)) {
        const sendPacket = new SendPacket(`~h~${formattedMessagePacket[0]}`);
        this.send(sendPacket);
      } else {
        this._onChannelMessage$.next({...event, data: messagePacket.getMessages()});
      }
    };

    this.channel.onerror = (event: Event) => {
      this._onChannelError$.next(event);
    };
  }

  public send(packet: SendPacket): void {
    if (this.channel.OPEN) {
      this.channel.send(packet.format());
    }
  }
}
