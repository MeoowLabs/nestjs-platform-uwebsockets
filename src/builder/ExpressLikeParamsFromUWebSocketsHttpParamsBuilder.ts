import { HttpRequest } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeParams } from '../model/ExpressLikeParams';

export class ExpressLikeParamsFromUWebSocketsHttpParamsBuilder
  implements Builder<ExpressLikeParams, [HttpRequest, string]>
{
  public build(request: HttpRequest, path: string): ExpressLikeParams {
    const expressLikeParams: ExpressLikeParams = {};

    const segments: string[] = request.getUrl().split('/');
    const pathSegments: string[] = path.split('/');

    for (let i: number = 0; i < segments.length; i++) {
      const segment: string = segments[i]!;
      const patternSegment: string = pathSegments[i]!;

      if (patternSegment.startsWith(':')) {
        const paramName: string = patternSegment.slice(1);
        expressLikeParams[paramName] = segment;
      } else if (patternSegment.startsWith('{') && patternSegment.endsWith('}')) {
        const paramName: string = patternSegment.slice(1, -1);
        expressLikeParams[paramName] = segment;
      }
    }

    return expressLikeParams;
  }
}
