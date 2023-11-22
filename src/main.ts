import { NestFactory } from '@nestjs/core';
import { App } from 'uWebSockets.js';

import { AppModule } from './AppModule';
import { UWebSocketsAdapter } from './UWebSocketsAdapter';

async function bootstrap(): Promise<void> {
  const app: any = await NestFactory.create<any>(AppModule, new UWebSocketsAdapter(App({})), {});

  app.enableShutdownHooks();

  await app.listen(3000, '0.0.0.0');
}

void bootstrap();
