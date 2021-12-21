import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

/**
 * 自定义全局拦截器模块，用多种方法注册， 1、使用module注册。2、全局使用 useGlobalInterceptors()注册
 * @export
 * @class CoreModule
 */
@Module({
    // 服务提供者
    providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }, //日志拦截器
        { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor }, // 请求错误拦截器
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }, // 响应拦截器
        { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor }, // 响应超时拦截器
    ],
})
export class CoreModule { }
