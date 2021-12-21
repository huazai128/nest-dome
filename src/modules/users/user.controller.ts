import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userSerivce: UserService) { }
    @Post()
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.userSerivce.create(user)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userSerivce.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userSerivce.findOne(id);
    }

}