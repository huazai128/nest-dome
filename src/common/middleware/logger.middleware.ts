import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: () => void) {
        console.log(`请求之前，这里获取session缓存，看看是否过期`);
        // 设置跨域
        res.setHeader('Access-Control-Allow-Origin', '*')
        // 设置请求，简单请求和非简单请求
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
        console.log('响应之后，登录成功后，设置cookie')
    }
}
