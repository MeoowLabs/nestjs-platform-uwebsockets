import { HttpRequest, HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeBodyFromUWebSocketsHttpBodyBuilder } from './ExpressLikeBodyFromUWebSocketsHttpBodyBuilder';
import { ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder } from './ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder';
import { ExpressLikeParamsFromUWebSocketsHttpParamsBuilder } from './ExpressLikeParamsFromUWebSocketsHttpParamsBuilder';
import { ExpressLikeQueryFromUWebSocketsHttpQueryBuilder } from './ExpressLikeQueryFromUWebSocketsHttpQueryBuilder';
import { ExpressLikeBody } from '../model/ExpressLikeBody';
import { ExpressLikeHeaders } from '../model/ExpressLikeHeaders';
import { ExpressLikeParams } from '../model/ExpressLikeParams';
import { ExpressLikeQuery } from '../model/ExpressLikeQuery';
import { ExpressLikeRequest } from '../model/ExpressLikeRequest';

export class ExpressLikeRequestFromUWebSocketsHttpRequestBuilder
  implements Builder<ExpressLikeRequest, [HttpRequest, HttpResponse, string]>
{
  readonly #expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<ExpressLikeBody, [HttpResponse]>;
  readonly #expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>;
  readonly #expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>;
  readonly #expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>;

  private constructor(
    expressLikeBodyFromUWebSocketsHttpBodyBuilder?: Builder<ExpressLikeBody, [HttpResponse]>,
    expressLikeHeadersFromUWebSocketsHttpHeadersBuilder?: Builder<ExpressLikeHeaders, [HttpRequest]>,
    expressLikeParamsFromUWebSocketsHttpParamsBuilder?: Builder<ExpressLikeParams, [HttpRequest, string]>,
    expressLikeQueryFromUWebSocketsHttpQueryBuilder?: Builder<ExpressLikeQuery, [HttpRequest]>,
  ) {
    this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder =
      expressLikeBodyFromUWebSocketsHttpBodyBuilder ?? new ExpressLikeBodyFromUWebSocketsHttpBodyBuilder();
    this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder =
      expressLikeHeadersFromUWebSocketsHttpHeadersBuilder ?? new ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder();
    this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder =
      expressLikeParamsFromUWebSocketsHttpParamsBuilder ?? new ExpressLikeParamsFromUWebSocketsHttpParamsBuilder();
    this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder =
      expressLikeQueryFromUWebSocketsHttpQueryBuilder ?? new ExpressLikeQueryFromUWebSocketsHttpQueryBuilder();
  }

  public static new(
    expressLikeBodyFromUWebSocketsHttpBodyBuilder?: Builder<ExpressLikeBody, [HttpResponse]>,
    expressLikeHeadersFromUWebSocketsHttpHeadersBuilder?: Builder<ExpressLikeHeaders, [HttpRequest]>,
    expressLikeParamsFromUWebSocketsHttpParamsBuilder?: Builder<ExpressLikeParams, [HttpRequest, string]>,
    expressLikeQueryFromUWebSocketsHttpQueryBuilder?: Builder<ExpressLikeQuery, [HttpRequest]>,
  ): ExpressLikeRequestFromUWebSocketsHttpRequestBuilder {
    return new ExpressLikeRequestFromUWebSocketsHttpRequestBuilder(
      expressLikeBodyFromUWebSocketsHttpBodyBuilder,
      expressLikeHeadersFromUWebSocketsHttpHeadersBuilder,
      expressLikeParamsFromUWebSocketsHttpParamsBuilder,
      expressLikeQueryFromUWebSocketsHttpQueryBuilder,
    );
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
