import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public status(): string {
    return 'ok';
  }
}
