import { RequestMethod } from '@nestjs/common';
import {
  RequestHandler,
  ErrorHandler,
  NestApplicationOptions,
  VersionValue,
  VersioningOptions,
} from '@nestjs/common/interfaces';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core';
import { HttpRequest, HttpResponse, TemplatedApp } from 'uWebSockets.js';

export class UWebSocketsAdapter<
  TInstance extends TemplatedApp = TemplatedApp,
  TRequest extends HttpRequest = HttpRequest,
  TResponse extends HttpResponse = HttpResponse,
> implements AbstractHttpAdapter<TInstance, TRequest, TResponse>
{
  public constructor(protected httpServer: TInstance) {}
  protected instance: any;

  public async init(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public search(port: string | number, callback?: (() => void) | undefined): void;
  public search(port: string | number, hostname: string, callback?: (() => void) | undefined): void;
  public search(port: unknown, hostname?: unknown, callback?: unknown): any {
    throw new Error('Method not implemented.');
  }

  public getHttpServer(): TInstance {
    return this.httpServer;
  }

  public setHttpServer(httpServer: TInstance): void {
    this.httpServer = httpServer;
  }

  public setInstance<T = any>(_instance: T): void {
    throw new Error('Method not implemented.');
  }

  public getInstance<T = any>(): T {
    throw new Error('Method not implemented.');
  }

  public close(): void {
    this.httpServer.close();
  }

  public initHttpServer(_options: NestApplicationOptions): void {
    throw new Error('Method not implemented.');
  }

  public useStaticAssets(..._args: any[]) {
    throw new Error('Method not implemented.');
  }

  public setViewEngine(engine: string) {
    throw new Error('Method not implemented.');
  }

  public render(response: any, view: string, options: any) {
    throw new Error('Method not implemented.');
  }

  public setErrorHandler(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }

  public setNotFoundHandler(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }

  public applyVersionFilter(
    _handler: Function,
    _version: VersionValue,
    _versioningOptions: VersioningOptions,
  ): (req: TRequest, res: TResponse, next: () => void) => Function {
    throw new Error('Method not implemented.');
  }

  public use(handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>): any;
  public use(path: string, handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>): any;
  public use(_path: unknown, _handler?: unknown): any {
    throw new Error('Method not implemented.');
  }

  public useBodyParser?(..._args: any[]) {
    throw new Error('Method not implemented.');
  }

  public get(handler: RequestHandler<TRequest, TResponse>): void;
  public get(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public get(...args: any[]): void {
    this.injectRouteOptions('get', ...args);
  }

  public post(handler: RequestHandler<TRequest, TResponse>): void;
  public post(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public post(...args: any[]): void {
    this.injectRouteOptions('post', ...args);
  }

  public head(handler: RequestHandler<TRequest, TResponse>): void;
  public head(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public head(...args: any[]): void {
    this.injectRouteOptions('patch', ...args);
  }

  public delete(handler: RequestHandler<TRequest, TResponse>): void;
  public delete(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public delete(...args: any[]): void {
    this.injectRouteOptions('delete', ...args);
  }

  public put(handler: RequestHandler<TRequest, TResponse>): void;
  public put(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public put(...args: any[]): void {
    this.injectRouteOptions('put', ...args);
  }

  public patch(handler: RequestHandler<TRequest, TResponse>): void;
  public patch(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public patch(...args: any[]): void {
    this.injectRouteOptions('patch', ...args);
  }

  public all(handler: RequestHandler<TRequest, TResponse>): void;
  public all(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public all(...args: any[]): void {
    this.injectRouteOptions('any', ...args);
  }

  public options(handler: RequestHandler<TRequest, TResponse>): void;
  public options(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public options(...args: any[]): any {
    this.injectRouteOptions('options', ...args);
  }

  public listen(port: string | number, callback?: (() => void) | undefined): void;
  public listen(port: string | number, hostname: string, callback?: (() => void) | undefined): void;
  public listen(
    port: string | number,
    hostnameOrCallback: string | (() => void) | undefined,
    callback?: (() => void) | undefined,
  ): void {
    const resolvedPort: number = typeof port === 'string' ? Number(port) : port;
    let resolvedHost: string = '0.0.0.0';
    let resolvedCallback: () => void = () => {};

    if (typeof hostnameOrCallback === 'string') {
      resolvedHost = hostnameOrCallback;
    } else {
      if (hostnameOrCallback !== undefined) {
        resolvedCallback = hostnameOrCallback;
      } else {
        if (callback !== undefined) {
          resolvedCallback = callback;
        }
      }
    }

    this.instance.listen(resolvedHost, resolvedPort, resolvedCallback);
  }

  public reply(response: TResponse, body: any, statusCode?: number | undefined): void {
    if (statusCode !== undefined) {
      this.status(response, statusCode);
    }

    if (body !== undefined && body !== null) {
      if (typeof body === 'object') {
        response.end(JSON.stringify(body));
      } else {
        response.end(body);
      }
    } else {
      response.end();
    }
  }

  public status(response: TResponse, statusCode: number): void {
    response.writeStatus(`${statusCode}`);
  }

  public end(response: any, message?: string | undefined): void {
    throw new Error('Method not implemented.');
  }

  public redirect(response: TResponse, statusCode: number, url: string): void {
    this.status(response, statusCode);
    response.writeHeader('Location', url);
  }

  public isHeadersSent(response: TResponse): boolean {
    return true;
  }

  public setHeader(response: TResponse, name: string, value: string): void {
    response.writeHeader(name, value);
  }

  public createMiddlewareFactory(
    method: RequestMethod,
  ): ((path: string, callback: Function) => any) | Promise<(path: string, callback: Function) => any> {
    throw new Error('Method not implemented.');
  }

  public getRequestHostname(request: TRequest): string {
    return request.getHeader('Host');
  }

  public getRequestMethod(request: TRequest): string {
    return request.getMethod();
  }

  public getRequestUrl(request: TRequest): string {
    return request.getUrl();
  }

  public registerParserMiddleware(..._args: any[]) {
    throw new Error('Method not implemented.');
  }

  public enableCors(_options: CorsOptions | CorsOptionsDelegate<TRequest>) {
    throw new Error('Method not implemented.');
  }

  public getType(): string {
    return 'uwebsockets';
  }

  private injectRouteOptions(
    routerMethodKey: 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'head' | 'any',
    ...args: any[]
  ): void {
    this.instance[routerMethodKey](...args);
  }
}
