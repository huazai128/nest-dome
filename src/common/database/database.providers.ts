import { createConnection } from "typeorm";
import { DB_CONN } from "../constants/config.constant";
import { DB_CONNECTION_TOKEN, DATABASE_CONNECTION } from "../constants/system.constant";
import { ConfigService } from "../dynamic/config/config.service";
import * as mongoose from 'mongoose';

// 以下是异步数据库连接
export const databaseProviders = [
    {
        provide: DB_CONNECTION_TOKEN, //  mysql 数据库
        useFactory: async (configService: ConfigService) => { // 使用工厂提供者
            console.log(configService, '拿到了服务了'); // ConfigModule 是全局模块
            // 异步提供者，等数据库连接成功后，才能往下走
            return await createConnection({
                type: 'mysql',
                host: '47.75.135.12',
                port: 6303,
                username: 'net_office_o',
                password: 'ECzTsnSPzu0rQmT0u3L4WjJ9',
                database: 'test',
                entities: [
                    './dist/modules/**/*.entity.js', // 这里引用打包后的文件目录
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
            console.log(configService)
            let reconnectionTask = null;
            const RECONNECT_INTERVAL = 6000
            function connect() {
                return mongoose.connect(DB_CONN)
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