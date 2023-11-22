import { RequestMethod } from '@nestjs/common';
import { RequestHandler, NestApplicationOptions, VersionValue, VersioningOptions } from '@nestjs/common/interfaces';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core';
import { HttpRequest, HttpResponse, RecognizedString, TemplatedApp } from 'uWebSockets.js';

const DEFAULT_PATH: string = '';

export class UWebSocketsAdapter<
  TInstance extends TemplatedApp = TemplatedApp,
  TRequest extends HttpRequest = HttpRequest,
  TResponse extends HttpResponse = HttpResponse,
> extends AbstractHttpAdapter<any, TRequest, TResponse> {
  protected declare instance: TInstance;

  readonly #anyRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #delRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #getRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #headRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #optionsRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #patchRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #postRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;
  readonly #putRequestHandler: (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void;

  public constructor(instance: TInstance) {
    super(instance);

    this.#anyRequestHandler = this.#buildRequestHandler(this.instance.any.bind(this.instance));
    this.#delRequestHandler = this.#buildRequestHandler(this.instance.del.bind(this.instance));
    this.#getRequestHandler = this.#buildRequestHandler(this.instance.get.bind(this.instance));
    this.#headRequestHandler = this.#buildRequestHandler(this.instance.head.bind(this.instance));
    this.#optionsRequestHandler = this.#buildRequestHandler(this.instance.options.bind(this.instance));
    this.#patchRequestHandler = this.#buildRequestHandler(this.instance.patch.bind(this.instance));
    this.#postRequestHandler = this.#buildRequestHandler(this.instance.post.bind(this.instance));
    this.#putRequestHandler = this.#buildRequestHandler(this.instance.put.bind(this.instance));
  }

  public close(): void {
    this.instance.close();
  }

  public initHttpServer(_options: NestApplicationOptions): void {
    this.httpServer = {
      address: () => {},
      once: () => {},
    };
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
    //TO-DO
  }

  public setNotFoundHandler(handler: Function, prefix?: string | undefined) {
    //TO-DO
  }

  public applyVersionFilter(
    _handler: Function,
    _version: VersionValue,
    _versioningOptions: VersioningOptions,
  ): (req: TRequest, res: TResponse, next: () => void) => Function {
    throw new Error('Method not implemented.');
  }

  public useBodyParser?(..._args: any[]) {
    throw new Error('Method not implemented.');
  }

  public override get(handler: RequestHandler<TRequest, TResponse>): void;
  public override get(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override get(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#getRequestHandler(handlerOrPath, handler);
  }

  public override post(handler: RequestHandler<TRequest, TResponse>): void;
  public override post(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override post(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#postRequestHandler(handlerOrPath, handler);
  }

  public override head(handler: RequestHandler<TRequest, TResponse>): void;
  public override head(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override head(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#headRequestHandler(handlerOrPath, handler);
  }

  public override delete(handler: RequestHandler<TRequest, TResponse>): void;
  public override delete(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override delete(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#delRequestHandler(handlerOrPath, handler);
  }

  public override put(handler: RequestHandler<TRequest, TResponse>): void;
  public override put(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override put(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#putRequestHandler(handlerOrPath, handler);
  }

  public override patch(handler: RequestHandler<TRequest, TResponse>): void;
  public override patch(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override patch(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#patchRequestHandler(handlerOrPath, handler);
  }

  public override all(handler: RequestHandler<TRequest, TResponse>): void;
  public override all(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override all(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#anyRequestHandler(handlerOrPath, handler);
  }

  public override options(handler: RequestHandler<TRequest, TResponse>): void;
  public override options(path: string, handler: RequestHandler<TRequest, TResponse>): void;
  public override options(
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ): void {
    this.#optionsRequestHandler(handlerOrPath, handler);
  }

  public override listen(port: string | number, callback?: (() => void) | undefined): void;
  public override listen(port: string | number, hostname: string, callback?: (() => void) | undefined): void;
  public override listen(
    port: string | number,
    hostnameOrCallback: string | (() => void) | undefined,
    callback?: (() => void) | undefined,
  ): void {
    const resolvedPort: number = typeof port === 'string' ? Number(port) : port;
    let resolvedHost: string = '0.0.0.0';
    let resolvedCallback: () => void = () => {};

    if (typeof hostnameOrCallback === 'string') {
      resolvedHost = hostnameOrCallback;

      if (callback !== undefined) {
        resolvedCallback = callback;
      }
    } else {
      if (hostnameOrCallback !== undefined) {
        resolvedCallback = hostnameOrCallback;
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
        this.setHeader(response, 'Content-Type', 'application/json');
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

  public isHeadersSent(_response: TResponse): boolean {
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
    //TO-DO
  }

  public enableCors(_options: CorsOptions | CorsOptionsDelegate<TRequest>) {
    throw new Error('Method not implemented.');
  }

  public getType(): string {
    return 'uwebsockets';
  }

  private resolveHandler(handler: RequestHandler<TRequest, TResponse>): (res: HttpResponse, req: HttpRequest) => void {
    return (response: HttpResponse, request: HttpRequest): void => {
      handler(request as TRequest, response as TResponse);
    };
  }

  #buildRequestHandler(
    uwsHandler: (
      pattern: RecognizedString,
      handler: (res: HttpResponse, req: HttpRequest) => void | Promise<void>,
    ) => void,
  ): (
    handlerOrPath: RequestHandler<TRequest, TResponse> | string,
    handler?: RequestHandler<TRequest, TResponse>,
  ) => void {
    return (
      handlerOrPath: RequestHandler<TRequest, TResponse> | string,
      handler?: RequestHandler<TRequest, TResponse>,
    ) => {
      let path: string;
      let requestHandler: RequestHandler<TRequest, TResponse>;

      if (typeof handlerOrPath === 'string') {
        path = handlerOrPath;
        requestHandler = handler!;
      } else {
        path = DEFAULT_PATH;
        requestHandler = handlerOrPath;
      }

      uwsHandler(path, (response: HttpResponse, request: HttpRequest): void =>
        requestHandler(request as TRequest, response as TResponse),
      );
    };
  }
}
