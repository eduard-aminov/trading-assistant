import { TradingViewMarket } from './trading-view-market.interface';
import {
  TradingViewWebSocketMessagePacketType,
  TradingViewWebSocketSendPacketType
} from '../enums/trading-view-packet-type';

export interface TradingViewWebSocketSendPacket {
  m: TradingViewWebSocketSendPacketType;
  p: TradingViewWebSocketPacketData;
}

export interface TradingViewWebSocketMessagePacket {
  m: TradingViewWebSocketMessagePacketType;
  p: TradingViewWebSocketPacketData;
}

export type TradingViewWebSocketResponse = (TradingViewWebSocketMessagePacket | number)[];

export type TradingViewWebSocketPacketData =
  TradingViewWebSocketSymbolResolvedPacketData |
  TradingViewWebSocketDUPacketData |
  TradingViewWebSocketQuoteCompletedPacketData;

export type TradingViewWebSocketSymbolResolvedPacketData = [
  string, // sessionId
  string, // seriesId
  TradingViewMarket,
];

export type TradingViewWebSocketDUPacketData = [
  string, // sessionId
  { $prices: { s: { v: number[] }[] } }
];

export type TradingViewWebSocketQuoteCompletedPacketData = [
  string, // sessionId
  string, // symbol
];
