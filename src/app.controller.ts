import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { LocalAuthGuard } from './modules/auth/guards/local.guard';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authServise: AuthService
    ) { }

    @Get()
    // @Render('index')
    getHello() {
        return this.appService.getHello();
        // return {
        //     message: '1212',
        // };
    }

    /**
     * 登录
     * @param {*} req
     * @return {*} 
     * @memberof AppController
     */
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req.user, 'req.user')
        return this.authServise.login(req.user)
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile') // 需要在Authorization: Bearer 添加toekn
    getProfile(@Request() req) {
        console.log(req.user, '=======')
        return req.user;
    }

}
