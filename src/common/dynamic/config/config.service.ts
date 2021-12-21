import { CONFIG_OPTIONS } from "@app/common/constants/system.constant";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
    constructor(
        // 更具provide注入
        @Inject(CONFIG_OPTIONS) readonly config: any
    ) {
        console.log(this.config, '=======注入config成功了,拿到数据')
    }
}