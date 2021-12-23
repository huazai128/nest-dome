import { jwtTokenSecret } from "@app/common/constants/config.constant";
import { SECRET } from "@app/common/constants/system.constant";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

/**
 * JWT 
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authSerive: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 在API请求头中获取token信息 
            ignoreExpiration: false, // token 过期、请求将被拒绝，发出401 没有权限
            secretOrKey: SECRET, // 秘密来签署令牌
        })
    }

    /**
     * 获取登录时的用户信息
     * @param {*} payload
     * @return {*} 
     * @memberof JwtStrategy
     */
    async validate(payload: any) {
        console.log(payload, '==========')
        return { userId: payload.sub, username: payload.username };
    }
}