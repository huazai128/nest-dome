import { EHttpStatus, TExceptionOption, THttpErrorResponse } from "@app/interfaces/http.interface";
import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";

/**
 * 全局异常拦截器，拦截全局抛出所有异常，规范输出错误
 * @export
 * @class ErrorExceptionFilter
 * @implements {ExceptionFilter<HttpException>}
 */
// @Catch(HttpException) // 单纯拦截http 异常错误，不拦截其他错误
@Catch() // 拦截所有异常错误
export class ErrorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorOptions = exception.getResponse() as TExceptionOption; // 获取相应错误信息
        const isString = typeof (errorOptions) === 'string'
        // 获取错误信息提示
        const errMessage = isString ? errorOptions : errorOptions.message
        // 获取错误信息, 处理错误信息，拿到最后的信息数据
        const errorInfo = isString ? null : errorOptions.error
        const parentErrorInfo = errorInfo ? String(errorInfo) : null
        const isChildrenError = errorInfo?.status && errorInfo?.message
        const resultError = (isChildrenError && errorInfo.message) || parentErrorInfo
        const resultStatus = isChildrenError ? errorInfo.status : status
        const data: THttpErrorResponse = {
            status: EHttpStatus.Error,
            message: errMessage,
            error: resultError,
            // debug: isDevMode ? exception.stack : null,
        }
        // 对默认的 404 进行特殊处理
        if (status === HttpStatus.NOT_FOUND) {
            data.error = `资源不存在`
            data.message = `接口 ${request.method} -> ${request.url} 无效`
        }
        return response.status(resultStatus).jsonp(data)
    }
}