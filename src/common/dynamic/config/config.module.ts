import { CONFIG_OPTIONS } from "@app/common/constants/system.constant";
import { Module, DynamicModule, Global } from "@nestjs/common";
import { ConfigService } from "./config.service";

/**
 * 动态模块
 * @export
 * @class ConfigModule
 */
@Global()
@Module({})
export class ConfigModule {
    static register(options: any): DynamicModule {
        return {
            module: ConfigModule,
            imports: [],
            providers: [
                { // 此处没有导出只能在当前module下Inject
                    provide: CONFIG_OPTIONS, // 值提供者，也可以注入服务： https://docs.nestjs.cn/8/fundamentals?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e6%8f%90%e4%be%9b%e8%80%85
                    useValue: options
                },
                ConfigService
            ],
            exports: [ConfigService]
        }
    }
}