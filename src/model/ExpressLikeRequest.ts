import { HttpRequest } from 'uWebSockets.js';

export type ExpressLikeBody = Record<string, unknown>;
export type ExpressLikeParams = Record<string, unknown>;
export type ExpressLikeQuery = Record<string, unknown>;
export interface ExpressLikeHeaders {
  [key: string]: string | string[];

  'set-cookies': string[];
}

export interface ExpressLikeRequest extends HttpRequest {
  body: ExpressLikeBody;
  params: ExpressLikeParams;
  query: ExpressLikeQuery;
  headers: ExpressLikeHeaders;
}
