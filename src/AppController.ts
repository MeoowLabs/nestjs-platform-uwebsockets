import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post(':id')
  public status(@Body() body: any, @Param('id') id: string): string {
    console.log(request);
    console.log(id);
    return 'ok';
  }
}
