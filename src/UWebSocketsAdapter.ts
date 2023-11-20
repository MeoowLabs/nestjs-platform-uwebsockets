import { HttpServer } from '@nestjs/common';
import { HttpRequest, HttpResponse, TemplatedApp } from 'uWebSockets.js';

export class UWebSocketsAdapter<
  TRequest extends HttpRequest = HttpRequest,
  TResponse extends HttpResponse = HttpResponse,
  TInstance extends TemplatedApp = TemplatedApp,
> implements HttpServer<TRequest, TResponse, TInstance>
{
  const;

  public override close() {
    throw new Error('Method not implemented.');
  }
  public override useStaticAssets(...args: any[]) {
    throw new Error('Method not implemented.');
  }
  public override setViewEngine(engine: string) {
    throw new Error('Method not implemented.');
  }
  public override getRequestHostname(request: any) {
    throw new Error('Method not implemented.');
  }
  public override getRequestMethod(request: any) {
    throw new Error('Method not implemented.');
  }
  public override getRequestUrl(request: any) {
    throw new Error('Method not implemented.');
  }
  public override status(response: any, statusCode: number) {
    throw new Error('Method not implemented.');
  }
  public override reply(response: any, body: any, statusCode?: number | undefined) {
    throw new Error('Method not implemented.');
  }
  public override end(response: any, message?: string | undefined) {
    throw new Error('Method not implemented.');
  }
  public override render(response: any, view: string, options: any) {
    throw new Error('Method not implemented.');
  }
  public override redirect(response: any, statusCode: number, url: string) {
    throw new Error('Method not implemented.');
  }
  public override setErrorHandler(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }
  public override setNotFoundHandler(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }
  public override isHeadersSent(response: any) {
    throw new Error('Method not implemented.');
  }
  public override setHeader(response: any, name: string, value: string) {
    throw new Error('Method not implemented.');
  }
  public override registerParserMiddleware(prefix?: string | undefined, rawBody?: boolean | undefined) {
    throw new Error('Method not implemented.');
  }
  public override getType(): string {
    throw new Error('Method not implemented.');
  }
}
