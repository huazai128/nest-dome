import { jwtTokenSecret } from "@app/common/constants/config.constant";
import { SECRET } from "@app/common/constants/system.constant";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authSerive: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        })
    }

    /**
     * 验证
     * @param {*} payload
     * @return {*} 
     * @memberof JwtStrategy
     */
    async validate(payload: any) {
        console.log(payload, '==========')
        return { userId: payload.sub, username: payload.username };
    }
}