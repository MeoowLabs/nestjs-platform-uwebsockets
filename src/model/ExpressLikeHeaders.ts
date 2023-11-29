export interface ExpressLikeHeaders {
  [key: string]: string | string[];

  'set-cookies'?: string[];
}
