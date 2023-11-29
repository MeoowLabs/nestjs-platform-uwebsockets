import { HttpRequest } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeQuery } from '../model/ExpressLikeQuery';

export class ExpressLikeQueryFromUWebSocketsHttpQueryBuilder implements Builder<ExpressLikeQuery, [HttpRequest]> {
  public build(request: HttpRequest): ExpressLikeQuery {
    const queryString: string = request.getQuery();

    const urlSearchParams: URLSearchParams = new URLSearchParams(queryString);

    const queryParams: [string, string][] = Array.from(urlSearchParams.entries());

    const expressLikeQuery: ExpressLikeQuery = Object.fromEntries(queryParams);

    return expressLikeQuery;
  }
}
