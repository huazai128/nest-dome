import { prop, plugin } from '@typegoose/typegoose'
import { AutoIncrementID } from '@typegoose/auto-increment'
import * as mongoosePaginate from 'mongoose-paginate'
import { getProviderByTypegoose } from '@app/common/transformers/model.transformer'
import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator'

@plugin(mongoosePaginate)
@plugin(AutoIncrementID, { field: 'id', startAt: 1 })
export class Cats {

    @prop({ unique: true })
    id: number

    @IsNotEmpty({ message: 'cats名称?' })
    @IsString({ message: '字符串？' })
    @prop({ required: true })
    name: string

    @IsNotEmpty({ message: '年龄为空？' })
    @IsInt({ message: '数字?' })
    @Min(0, { message: '最小为0岁' })
    @Max(110, { message: '最大为110岁' })
    @prop({ required: true })
    age: number

    @IsString({ message: '字符串？' })
    breed: string;
}

export const CatsProvider = getProviderByTypegoose(Cats)