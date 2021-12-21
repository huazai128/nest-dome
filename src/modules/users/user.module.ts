import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

import { getProviderByTypeormClass } from '@app/common/transformers/model.transformer';
export const userProvider = getProviderByTypeormClass(User)

@Module({
    controllers: [UserController],
    providers: [UserService, userProvider],
    exports: [UserService]
})
export class UserModule { }