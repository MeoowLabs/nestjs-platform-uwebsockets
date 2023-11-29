import { Body, Controller, Get, Headers, Param, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(':id')
  public status(@Body() body: any, @Param('id') id: string, @Headers() head: any, @Query() query: any): string {
    console.log(body);
    console.log(id);
    console.log(head);
    console.log(query);
    return 'ok';
  }
}
