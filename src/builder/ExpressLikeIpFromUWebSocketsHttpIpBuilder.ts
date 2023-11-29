import { HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';

export class ExpressLikeIpFromUWebSocketsHttpIpBuilder implements Builder<string, [HttpResponse]> {
  public build(response: HttpResponse): string {
    const textDecoder: TextDecoder = new TextDecoder();

    const expressLikeIp: string = textDecoder.decode(response.getRemoteAddressAsText());

    return expressLikeIp;
  }
}
