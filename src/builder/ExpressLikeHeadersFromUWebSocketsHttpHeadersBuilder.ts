import { HttpRequest } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeHeaders } from '../model/ExpressLikeRequest';

export class ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder implements Builder<ExpressLikeHeaders, [HttpRequest]> {
  public build(request: HttpRequest): ExpressLikeHeaders {
    const expressLikeHeaders: ExpressLikeHeaders = {};

    request.forEach((key: string, value: string) => {
      expressLikeHeaders[key] = value;
    });

    return expressLikeHeaders;
  }
}
