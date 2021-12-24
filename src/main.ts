import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './common/filters/error-exception.filter';
import { getServerIp } from './utils/util';
import * as helmet from 'helmet';
// import { join } from 'path';
// import * as ejs from 'ejs'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 使用模板引起
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('html');
    // app.engine('html', ejs.renderFile);

    // 安全帽
    app.use(helmet())

    app.useGlobalPipes(new ValidationPipe({ // 基本配置查看https://docs.nestjs.cn/8/techniques?id=%e9%aa%8c%e8%af%81
        enableDebugMessages: true, // 打印详情
        disableErrorMessages: true, // 禁止错误信息返回给用户
        transform: true, // 将普通Javascript 对象转成DTO类
    })); // 全局管道注册
    // app.useGlobalInterceptors(); // 全局拦截器注册
    app.useGlobalFilters(new ErrorExceptionFilter()) // 全局过滤器
    app.enableCors({ // 解决跨域
        credentials: true
    });

    await app.listen(3001);
    console.log(process.env.NODE_ENV); // 判断环境
    console.log(`Application is running on: http://${getServerIp()}:3001`);

}
bootstrap();
