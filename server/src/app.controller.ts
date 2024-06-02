import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): string {
    let num = +(req.signedCookies["test"] ?? 0);
    console.log("num: ",num);
    console.log("test: ",req.signedCookies["test"]);
    console.log("typeof test: ",typeof req.signedCookies["test"]);
    
    num++;

    res.cookie("test",num,{
      signed:true
    });

    return this.appService.getHello() +` num: ${num}`;
  }
}
