import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './common/filters/error-exception.filter';
import { getServerIp } from './utils/util';

// import { join } from 'path';
// import * as ejs from 'ejs'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('html');
    // app.engine('html', ejs.renderFile);

    app.useGlobalPipes(new ValidationPipe()); // 全局管道注册
    // app.useGlobalInterceptors(); // 全局拦截器注册
    app.useGlobalFilters(new ErrorExceptionFilter()) // 全局过滤器
    app.enableCors({ // 解决跨域
        credentials: true
    });

    await app.listen(3001);
    console.log(`Application is running on: http://${getServerIp()}:3001`);

}
bootstrap();
