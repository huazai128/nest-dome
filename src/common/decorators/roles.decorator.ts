import { SetMetadata } from '@nestjs/common';

// 反射器
export const Roles = (...roles: string[]) => {
    return SetMetadata('roles', roles)
};
