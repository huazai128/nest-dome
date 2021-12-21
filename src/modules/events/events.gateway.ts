import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

// 已经处理跨域，前端还是请求有跨域问题·
@WebSocketGateway({ cors: { origin: '*', credentials: true } })
export class EventsGateway {
    @WebSocketServer()
    private server: Server // socket 服务

    @SubscribeMessage('events') // 定义事件
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        console.log(data, '====') // 获取emit传递的数据
        // 发送数据到客户端，通过监听events事件获取数据
        return from([1, 2, 3, 4]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }
}