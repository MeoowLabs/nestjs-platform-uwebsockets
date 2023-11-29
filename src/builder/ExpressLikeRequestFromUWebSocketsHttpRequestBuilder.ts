import { HttpRequest, HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import {
  ExpressLikeBody,
  ExpressLikeHeaders,
  ExpressLikeParams,
  ExpressLikeQuery,
  ExpressLikeRequest,
} from '../model/ExpressLikeRequest';

export class ExpressLikeRequestFromUWebSocketsHttpRequestBuilder
  implements Builder<ExpressLikeRequest, [HttpRequest, HttpResponse, string]>
{
  readonly #expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<ExpressLikeBody, [HttpResponse]>;
  readonly #expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>;
  readonly #expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>;
  readonly #expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>;

  private constructor(
    readonly expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<ExpressLikeBody, [HttpResponse]>,
    readonly expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>,
    readonly expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>,
    readonly expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>,
  ) {
    this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder = expressLikeBodyFromUWebSocketsHttpBodyBuilder;
    this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder = expressLikeHeadersFromUWebSocketsHttpHeadersBuilder;
    this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder = expressLikeParamsFromUWebSocketsHttpParamsBuilder;
    this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder = expressLikeQueryFromUWebSocketsHttpQueryBuilder;
  }

  public build(request: HttpRequest, response: HttpResponse, path: string): ExpressLikeRequest {
    const body: ExpressLikeBody = this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder.build(response);
    const headers: ExpressLikeHeaders = this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder.build(request);
    const params: ExpressLikeParams = this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder.build(request, path);
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
