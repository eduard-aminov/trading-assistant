import {
  TradingViewWebSocketMessagePacket,
  TradingViewWebSocketPacketData
} from '../interfaces/trading-view-web-socket-packet.interface';
import { TradingViewWebSocketMessagePacketType } from '../enums/trading-view-packet-type';

export class TradingViewWebSocketMessage {
  type: TradingViewWebSocketMessagePacketType;
  sessionId: string;
  data: TradingViewWebSocketPacketData;

  constructor(
    packet: TradingViewWebSocketMessagePacket,
  ) {
    this.type = packet.m;
    this.sessionId = packet.p?.[0];
    this.data = packet.p;
  }
}
