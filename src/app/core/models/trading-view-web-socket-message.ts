import {
  TradingViewWebSocketPacket,
  TradingViewWebSocketPacketData
} from '../interfaces/trading-view-web-socket-packet.interface';
import { TradingViewPacketType } from '../enums/trading-view-packet-type';

export class TradingViewWebSocketMessage {
  type: TradingViewPacketType;
  data: TradingViewWebSocketPacketData;

  constructor(
    packet: TradingViewWebSocketPacket,
  ) {
    this.type = packet.m;
    this.data = packet.p;
  }
}
