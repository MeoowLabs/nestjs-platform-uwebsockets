import { HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeBody } from '../model/ExpressLikeBody';

export class ExpressLikeBodyFromUWebSocketsHttpBodyBuilder implements Builder<ExpressLikeBody, [HttpResponse]> {
  public build(response: HttpResponse): ExpressLikeBody {
    throw new Error('Method not implemented.');
  }
}
