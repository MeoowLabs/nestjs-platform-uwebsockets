import { HttpRequest, HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeBody, ExpressLikeHeaders, ExpressLikeParams, ExpressLikeQuery, ExpressLikeRequest } from '../model/ExpressLikeRequest';

export class ExpressLikeRequestFromUWebSocketsHttpRequestBuilder
  implements Builder<ExpressLikeRequest, [HttpRequest, HttpResponse, string]>
{
  readonly #expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<ExpressLikeBody, [HttpResponse]>;
  readonly #expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>;
  readonly #expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>;
  readonly #expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>;

  private constructor(
    readonly expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<ExpressLikeBody, [HttpResponse]>,
    readonly expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>,
    readonly expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>,
    readonly expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>,
  ) {
    this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder = expressLikeBodyFromUWebSocketsHttpBodyBuilder;
    this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder = expressLikeParamsFromUWebSocketsHttpParamsBuilder;
    this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder = expressLikeHeadersFromUWebSocketsHttpHeadersBuilder;
    this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder = expressLikeQueryFromUWebSocketsHttpQueryBuilder;
  }


  public build(request: HttpRequest, response: HttpResponse, path: string): ExpressLikeRequest {
    const params: ExpressLikeParams = this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder.build(request, path);
    const body: ExpressLikeBody = this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder.build(response);
    const headers: ExpressLikeHeaders = this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder.build(request);
    const query: ExpressLikeQuery = this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder.build(request);

    const expressLikeRequest: ExpressLikeRequest = {
      ...request,
      body,
      headers,
      params,
      query,
    };

    return expressLikeRequest;
  }
}
