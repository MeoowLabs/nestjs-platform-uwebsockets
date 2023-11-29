import { HttpRequest, HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeBodyFromUWebSocketsHttpBodyBuilder } from './ExpressLikeBodyFromUWebSocketsHttpBodyBuilder';
import { ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder } from './ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder';
import { ExpressLikeIpFromUWebSocketsHttpIpBuilder } from './ExpressLikeIpFromUWebSocketsHttpIpBuilder';
import { ExpressLikeParamsFromUWebSocketsHttpParamsBuilder } from './ExpressLikeParamsFromUWebSocketsHttpParamsBuilder';
import { ExpressLikeQueryFromUWebSocketsHttpQueryBuilder } from './ExpressLikeQueryFromUWebSocketsHttpQueryBuilder';
import { ExpressLikeBody } from '../model/ExpressLikeBody';
import { ExpressLikeHeaders } from '../model/ExpressLikeHeaders';
import { ExpressLikeParams } from '../model/ExpressLikeParams';
import { ExpressLikeQuery } from '../model/ExpressLikeQuery';
import { ExpressLikeRequest } from '../model/ExpressLikeRequest';

export class ExpressLikeRequestFromUWebSocketsHttpRequestBuilder
  implements Builder<Promise<ExpressLikeRequest>, [HttpRequest, HttpResponse, string]>
{
  readonly #expressLikeBodyFromUWebSocketsHttpBodyBuilder: Builder<
    Promise<ExpressLikeBody | undefined>,
    [HttpResponse]
  >;
  readonly #expressLikeHeadersFromUWebSocketsHttpHeadersBuilder: Builder<ExpressLikeHeaders, [HttpRequest]>;
  readonly #expressLikeIpFromUWebSocketsHttpIpBuilder: Builder<string, [HttpResponse]>;
  readonly #expressLikeParamsFromUWebSocketsHttpParamsBuilder: Builder<ExpressLikeParams, [HttpRequest, string]>;
  readonly #expressLikeQueryFromUWebSocketsHttpQueryBuilder: Builder<ExpressLikeQuery, [HttpRequest]>;

  private constructor(
    expressLikeBodyFromUWebSocketsHttpBodyBuilder?: Builder<Promise<ExpressLikeBody | undefined>, [HttpResponse]>,
    expressLikeHeadersFromUWebSocketsHttpHeadersBuilder?: Builder<ExpressLikeHeaders, [HttpRequest]>,
    expressLikeIpFromUWebSocketsHttpIpBuilder?: Builder<string, [HttpResponse]>,
    expressLikeParamsFromUWebSocketsHttpParamsBuilder?: Builder<ExpressLikeParams, [HttpRequest, string]>,
    expressLikeQueryFromUWebSocketsHttpQueryBuilder?: Builder<ExpressLikeQuery, [HttpRequest]>,
  ) {
    this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder =
      expressLikeBodyFromUWebSocketsHttpBodyBuilder ?? new ExpressLikeBodyFromUWebSocketsHttpBodyBuilder();
    this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder =
      expressLikeHeadersFromUWebSocketsHttpHeadersBuilder ?? new ExpressLikeHeadersFromUWebSocketsHttpHeadersBuilder();
    this.#expressLikeIpFromUWebSocketsHttpIpBuilder =
      expressLikeIpFromUWebSocketsHttpIpBuilder ?? new ExpressLikeIpFromUWebSocketsHttpIpBuilder();
    this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder =
      expressLikeParamsFromUWebSocketsHttpParamsBuilder ?? new ExpressLikeParamsFromUWebSocketsHttpParamsBuilder();
    this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder =
      expressLikeQueryFromUWebSocketsHttpQueryBuilder ?? new ExpressLikeQueryFromUWebSocketsHttpQueryBuilder();
  }

  public static new(
    expressLikeBodyFromUWebSocketsHttpBodyBuilder?: Builder<Promise<ExpressLikeBody | undefined>, [HttpResponse]>,
    expressLikeHeadersFromUWebSocketsHttpHeadersBuilder?: Builder<ExpressLikeHeaders, [HttpRequest]>,
    expressLikeIpFromUWebSocketsHttpIpBuilder?: Builder<string, [HttpResponse]>,
    expressLikeParamsFromUWebSocketsHttpParamsBuilder?: Builder<ExpressLikeParams, [HttpRequest, string]>,
    expressLikeQueryFromUWebSocketsHttpQueryBuilder?: Builder<ExpressLikeQuery, [HttpRequest]>,
  ): ExpressLikeRequestFromUWebSocketsHttpRequestBuilder {
    return new ExpressLikeRequestFromUWebSocketsHttpRequestBuilder(
      expressLikeBodyFromUWebSocketsHttpBodyBuilder,
      expressLikeHeadersFromUWebSocketsHttpHeadersBuilder,
      expressLikeIpFromUWebSocketsHttpIpBuilder,
      expressLikeParamsFromUWebSocketsHttpParamsBuilder,
      expressLikeQueryFromUWebSocketsHttpQueryBuilder,
    );
  }

  public async build(request: HttpRequest, response: HttpResponse, path: string): Promise<ExpressLikeRequest> {
    const headers: ExpressLikeHeaders = this.#expressLikeHeadersFromUWebSocketsHttpHeadersBuilder.build(request);
    const params: ExpressLikeParams = this.#expressLikeParamsFromUWebSocketsHttpParamsBuilder.build(request, path);
    const query: ExpressLikeQuery = this.#expressLikeQueryFromUWebSocketsHttpQueryBuilder.build(request);
    const ip: string = this.#expressLikeIpFromUWebSocketsHttpIpBuilder.build(response);
    const body: ExpressLikeBody | undefined = await this.#expressLikeBodyFromUWebSocketsHttpBodyBuilder.build(response);

    const expressLikeRequest: ExpressLikeRequest = {
      ...request,
      body,
      headers,
      ip,
      params,
      query,
    };

    return expressLikeRequest;
  }
}
