import { BadRequestException } from '@nestjs/common';
import { HttpResponse } from 'uWebSockets.js';

import { Builder } from './Builder';
import { ExpressLikeBody } from '../model/ExpressLikeBody';

export class ExpressLikeBodyFromUWebSocketsHttpBodyBuilder
  implements Builder<Promise<ExpressLikeBody | undefined>, [HttpResponse]>
{
  public async build(response: HttpResponse): Promise<ExpressLikeBody | undefined> {
    const body: Promise<ExpressLikeBody | undefined> = new Promise(
      (resolve: (value: ExpressLikeBody | undefined) => void, reject: (reason?: unknown) => void) => {
        let buffer: Buffer | undefined = undefined;

        response.onData((chunk: ArrayBuffer, isLast: boolean) => {
          const chunkBuffer: Buffer = Buffer.from(chunk);

          if (buffer !== undefined) {
            buffer = Buffer.concat([buffer, chunkBuffer]);
          } else {
            buffer = chunkBuffer;
          }

          if (isLast) {
            let result: ExpressLikeBody | undefined = undefined;

            if (buffer !== undefined) {
              result = JSON.parse(buffer.toString());
            }

            resolve(result);
          }
        });

        response.onAborted(() => reject(new BadRequestException()));
      },
    );

    return body;
  }
}
