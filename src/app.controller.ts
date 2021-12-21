import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    // @Render('index')
    getHello() {
        return this.appService.getHello();
        // return {
        //     message: '1212',
        // };
    }
}
