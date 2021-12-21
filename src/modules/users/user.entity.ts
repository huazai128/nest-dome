import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'lastName名称?' })
    @IsString({ message: '字符串？' })
    @Column()
    username: string;

    @Column({ default: true })
    isActive: boolean;

    @IsNotEmpty({ message: 'password名称?' })
    @IsString({ message: '字符串？' })
    @Column()
    password: string

}