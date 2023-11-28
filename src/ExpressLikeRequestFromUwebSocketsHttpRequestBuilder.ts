import { HttpRequest, HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeRequest } from './ExpressLikeRequest';

export class ExpressLikeRequestFromUwebSocketsHttpRequestBuilder
  implements Builder<ExpressLikeRequest, [HttpRequest, HttpResponse, string]>
{
  readonly #pathManager: unknown;
  readonly #bodyManager: unknown;

  public build(request: HttpRequest, response: HttpResponse, path: string): ExpressLikeRequest {
    const params = this.#pathManager.getParams(request, path);
    const body = this.#bodyManager.getBody(response);
  }
}
