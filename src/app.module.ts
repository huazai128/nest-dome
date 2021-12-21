import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { type, host, port, username, password, database, DB_CONN } from './common/constants/config.constant'

// 中间件
import { LoggerMiddleware } from './common/middleware/logger.middleware';

// 基础模块
import { ConfigModule } from './common/dynamic/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { CoreModule } from '@app/core/core.module';

// 业务模块
import { CatsModule } from './modules/cats/cats.module';
import { EventsModule } from './modules/events/events.module';
import { UserModule } from './modules/users/user.module';

@Module({
    imports: [
        // 基础模块
        ConfigModule.register({ type, host, port, username, password, database, dbUrl: DB_CONN }),
        DatabaseModule,
        CoreModule,

        // 业务模块
        UserModule,
        CatsModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware) // 全局中间件
            .forRoutes('*')
    }
}
