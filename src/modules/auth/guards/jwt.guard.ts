import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // 在这里添加自定义的认证逻辑
        // 例如调用 super.logIn(request) 来建立一个session
        return super.canActivate(context);
    }


    /**
     * 处理请求
     * @param {*} err
     * @param {*} user
     * @param {*} info
     * @return {*} 
     * @memberof JwtAuthGuard
     */
    handleRequest(err, user, info) {
        console.log('=====', user)
        // 可以抛出一个基于info或者err参数的异常
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}