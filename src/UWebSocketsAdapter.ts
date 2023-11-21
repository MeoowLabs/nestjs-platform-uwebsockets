import { HttpServer, NestApplicationOptions, RequestMethod, VersioningOptions } from '@nestjs/common';
import { RequestHandler, ErrorHandler, VersionValue } from '@nestjs/common/interfaces';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpRequest, HttpResponse, TemplatedApp } from 'uWebSockets.js';

export class UWebSocketsAdapter<
  TRequest extends HttpRequest = HttpRequest,
  TResponse extends HttpResponse = HttpResponse,
  TInstance extends TemplatedApp = TemplatedApp,
> implements HttpServer<TRequest, TResponse, TInstance>
{
  public constructor(private readonly instance: TInstance) {}

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
  public get(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.get(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public post(handler: RequestHandler<TRequest, TResponse>): void;
  public post(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public post(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.post(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public head(handler: RequestHandler<TRequest, TResponse>): void;
  public head(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public head(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.head(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public delete(handler: RequestHandler<TRequest, TResponse>): void;
  public delete(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public delete(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.del(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public put(handler: RequestHandler<TRequest, TResponse>): void;
  public put(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public put(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.put(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public patch(handler: RequestHandler<TRequest, TResponse>): void;
  public patch(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public patch(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      this.instance.patch(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public all(handler: RequestHandler<TRequest, TResponse>): void;
  public all(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public all(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    _handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    if (typeof pathOrHandler === 'string') {
      throw new Error('Method not implemented.');
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public options(handler: RequestHandler<TRequest, TResponse>): void;
  public options(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public options(
    pathOrHandler: string | RequestHandler<TRequest, TResponse>,
    handler?: RequestHandler<TRequest, TResponse>,
  ): any {
    if (typeof pathOrHandler === 'string') {
      this.instance.options(pathOrHandler, (response: HttpResponse, request: HttpRequest) => {
        handler!(request as TRequest, response as TResponse);
      });
    } else {
      throw new Error('Method not implemented.');
    }
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

  public render(response: any, view: string, options: any) {
    throw new Error('Method not implemented.');
  }

  public redirect(response: TResponse, statusCode: number, url: string): void {
    this.status(response, statusCode);
    response.writeHeader('Location', url);
  }

  public isHeadersSent(_response: TResponse): boolean {
    return true;
  }

  public setHeader(response: TResponse, name: string, value: string): void {
    response.writeHeader(name, value);
  }

  public setErrorHandler?(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }

  public setNotFoundHandler?(handler: Function, prefix?: string | undefined) {
    throw new Error('Method not implemented.');
  }

  public useStaticAssets?(...args: any[]): this {
    throw new Error('Method not implemented.');
  }

  public setBaseViewsDir?(path: string | string[]): this {
    throw new Error('Method not implemented.');
  }

  public setViewEngine?(engineOrOptions: any): this {
    throw new Error('Method not implemented.');
  }

  public createMiddlewareFactory(
    method: RequestMethod,
  ): ((path: string, callback: Function) => any) | Promise<(path: string, callback: Function) => any> {
    throw new Error('Method not implemented.');
  }

  public getRequestHostname?(request: TRequest): string {
    return request.getHeader('Host');
  }

  public getRequestMethod?(request: TRequest): string {
    return request.getMethod();
  }

  public getRequestUrl?(request: TRequest): string {
    return request.getUrl();
  }

  public getInstance(): TInstance {
    return this.instance;
  }

  public registerParserMiddleware(..._args: any[]) {
    throw new Error('Method not implemented.');
  }

  public enableCors(_options: CorsOptions | CorsOptionsDelegate<TRequest>) {
    throw new Error('Method not implemented.');
  }

  public getHttpServer() {
    throw new Error('Method not implemented.');
  }

  public initHttpServer(options: NestApplicationOptions): void {
    throw new Error('Method not implemented.');
  }

  public close() {
    throw new Error('Method not implemented.');
  }

  public getType(): string {
    return 'uwebsockets';
  }

  public init?(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public applyVersionFilter(
    handler: Function,
    version: VersionValue,
    versioningOptions: VersioningOptions,
  ): (req: TRequest, res: TResponse, next: () => void) => Function {
    throw new Error('Method not implemented.');
  }
}
