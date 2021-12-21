import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 这里是拿到  @Roles('admin')的值
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        // 获取请求中的参数
        const request = context.switchToHttp().getRequest();
        const user = request.user; // 这个值。是缓存到requset上的.可以从session 或者redis中获取用户信息。判断是否有权限
        const hasRole = () =>
            user.roles.some(role => !!roles.find(item => item === role));

        return user && user.roles && hasRole();
    }
}