import { HttpRequest } from 'uWebSockets.js';

import { ExpressLikeBody } from './ExpressLikeBody';
import { ExpressLikeHeaders } from './ExpressLikeHeaders';
import { ExpressLikeParams } from './ExpressLikeParams';
import { ExpressLikeQuery } from './ExpressLikeQuery';

export interface ExpressLikeRequest extends HttpRequest {
  body: ExpressLikeBody | undefined;
  ip: string;
  params: ExpressLikeParams;
  query: ExpressLikeQuery;
  headers: ExpressLikeHeaders;
}
