import { createConnection } from "typeorm";
import { DB_CONNECTION_TOKEN, DATABASE_CONNECTION } from "../constants/system.constant";
import { ConfigService } from "../dynamic/config/config.service";
import * as mongoose from 'mongoose';
import { join } from 'path'

// 以下是异步数据库连接
export const databaseProviders = [
    {
        provide: DB_CONNECTION_TOKEN, //  mysql 数据库
        useFactory: async (configService: ConfigService) => { // 使用工厂提供者
            console.log(configService.config, '拿到了服务了'); // ConfigModule 是全局模块
            const { type, host, port, username, password, database } = configService.config;
            // 异步提供者，等数据库连接成功后，才能往下走
            return await createConnection({
                type,
                host,
                port,
                username,
                password,
                database,
                entities: [
                    join(__dirname, "../../modules/**/*.entity{.ts,.js}") // 这里路径必须要正确
                ],
                synchronize: true,
            }).then((connection) => {
                console.log('mysql数据库链接成功')
                return connection
            }).catch((error) => {
                console.log('链接失败', error)
            })
        },
        inject: [ConfigService] // 注入第三方provider
    },
    {
        provide: DATABASE_CONNECTION, //  mongodb 数据库
        useFactory: async (configService: ConfigService) => {
            let reconnectionTask = null;
            const RECONNECT_INTERVAL = 6000
            function connect() {
                return mongoose.connect(configService.config.dbUrl)
            }

            mongoose.connection.on('disconnected', () => {
                console.error(`数据库失去连接！尝试 ${RECONNECT_INTERVAL / 1000}s 后重连`)
                reconnectionTask = setTimeout(connect, RECONNECT_INTERVAL)
            })

            mongoose.connection.on('open', () => {
                console.log('mongodb数据库连接成功')
                clearTimeout(reconnectionTask)
                reconnectionTask = null
            })

            mongoose.connection.on('error', (error) => {
                console.error('数据库连接异常', error)
                mongoose.disconnect();
            })

            return connect();
        },
        inject: [ConfigService] // 注入第三方provider
    }
]