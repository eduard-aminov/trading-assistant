import { TradingViewMarket } from './trading-view-market.interface';
import {
  TradingViewWebSocketMessagePacketType,
  TradingViewWebSocketSendPacketType
} from '../enums/trading-view-packet-type';
import { TradingViewQuoteData } from './trading-view.interface';

export interface TradingViewWebSocketSendPacket {
  m: TradingViewWebSocketSendPacketType;
  p: any;
}

export interface TradingViewWebSocketMessagePacket {
  m: TradingViewWebSocketMessagePacketType;
  p: TradingViewWebSocketPacketData;
}

export type TradingViewWebSocketResponse = (TradingViewWebSocketMessagePacket | number)[];

export type TradingViewWebSocketPacketData =
  TradingViewWebSocketSymbolResolvedPacketData |
  TradingViewWebSocketDUPacketData |
  TradingViewWebSocketQuoteCompletedPacketData |
  TradingViewWebSocketQsdPacketData |
  TradingViewWebSocketCriticalErrorPacketData;

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

export type TradingViewWebSocketQsdPacketData = [
  string, // sessionId
  {
    n: string, // symbol
    s: string,
    v: Partial<TradingViewQuoteData>
  }
];


export type TradingViewWebSocketCriticalErrorPacketData = [
  string, // sessionId
  string, // error message
  string, // seriesId
];
