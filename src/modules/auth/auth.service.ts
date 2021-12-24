import { decodeMd5 } from "@app/utils/util";
import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    /**
     * 验证用户
     * @param {string} username
     * @param {string} pass
     * @return {*}  {Promise<any>}
     * @memberof AuthService
     */
    async validateUser(username: string, pass: string): Promise<any> {
        // 获取用户
        const user = await this.userService.findNameOne(username);
        if (user) {
            const dlPass = decodeMd5(pass)
            if (user.password === dlPass) {
                // 密码加密
                const dcPass = decodeMd5(pass)
                const { password, ...result } = user
                if (dcPass === password) {
                    return result
                }
            }
        }
        return '密码错误'
    }

    /**
     * 登录
     * @param {*} { username, id }
     * @return {*} 
     * @memberof AuthService
     */
    async login({ username, id }: any) {
        return {
            access_token: this.jwtService.sign({ username: username, sub: id })
        }
    }
}