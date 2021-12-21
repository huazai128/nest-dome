import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
        console.log('响应拦截器数据，此时可以对数据进行处理哈')
        return next.handle()
            .pipe(
                map(data => ({ data })),
            );
    }
}
