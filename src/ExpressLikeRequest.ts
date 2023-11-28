import { HttpRequest, HttpResponse } from 'uWebSockets.js';

export interface ExpressLikeRequest extends HttpRequest {
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  headers: {
    [key: string]: string | string[];

    'set-cookies': string[];
  };
}

function buildExpressLikeRequest(
  request: HttpRequest,
  response: HttpResponse,
  parameters: Record<string, string | string[]>,
): ExpressLikeRequest {
  return {
    body: {},
  };
}

function parseBody(response: HttpResponse): Promise<string> {
  response.onData((chunk: ArrayBuffer, isLast: boolean): void {

  })
}
