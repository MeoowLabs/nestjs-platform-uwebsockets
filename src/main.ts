import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { App } from 'uWebSockets.js';

import { AppModule } from './AppModule';
import { UWebSocketsAdapter } from './UWebSocketsAdapter';

async function bootstrap(): Promise<void> {
  const app: INestApplication<unknown> = await NestFactory.create<INestApplication<unknown>>(
    AppModule,
    new UWebSocketsAdapter(App({})),
    {},
  );

  app.enableShutdownHooks();

  await app.listen(3000, '0.0.0.0');
}

void bootstrap();
