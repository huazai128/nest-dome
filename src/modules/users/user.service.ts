import { InjectModel } from "@app/common/transformers/model.transformer";
import { decodeMd5 } from "@app/utils/util";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: Repository<User>
    ) { }

    /**
     * 创建用户
     * @param {CreateUserDto} createUserDto
     * @return {*}  {Promise<User>}
     * @memberof UserService
     */
    async create(createUserDto: CreateUserDto): Promise<User | any> {
        const user = new User();
        const username = await this.findNameOne(createUserDto.username)
        console.log(username, 'username')
        if (!!username) {
            return { msg: '用户已存在' }
        } else {
            console.log(createUserDto)
            user.username = createUserDto.username
            // 密码加密
            user.password = decodeMd5(createUserDto.password);
            console.log(user, 'user')
            return this.userRepository.save(user)
        }
    }

    /**
     * 查询所有数据
     * @return {*}  {Promise<User[]>}
     * @memberof UserService
     */
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    /**
     * 根据Id查询
     * @param {string} id
     * @return {*}  {Promise<User>}
     * @memberof UserService
     */
    findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id)
    }

    /**
     * 根据username查询
     * @param {string} username
     * @return {*}  {Promise<User>}
     * @memberof UserService
     */
    findNameOne(username: string): Promise<User> {
        return this.userRepository.findOne({ username: username })
    }

}