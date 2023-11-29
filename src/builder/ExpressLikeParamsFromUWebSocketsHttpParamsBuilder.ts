import { HttpRequest } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeParams } from '../model/ExpressLikeParams';

export class ExpressLikeParamsFromUWebSocketsHttpParamsBuilder
  implements Builder<ExpressLikeParams, [HttpRequest, string]>
{
  public build(request: HttpRequest, path: string): ExpressLikeParams {
    const expressLikeParams: ExpressLikeParams = {};

    return expressLikeParams;
  }
}
