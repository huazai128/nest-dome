import { decodeMd5 } from "@app/utils/util";
import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {

    }

    /**
     * 验证用户
     * @param {string} username
     * @param {string} pass
     * @return {*}  {Promise<any>}
     * @memberof AuthService
     */
    async validateUser(username: string, pass: string): Promise<any> {
        // 获取用户
        const user = await this.userService.findOne(username);
        if (user) {
            // 密码加密
            const dcPass = decodeMd5(pass)
            const { password, ...result } = user
            if (dcPass === password) {
                return result
            }
        }
        return null
    }

    async login() {
        return 111
    }

}