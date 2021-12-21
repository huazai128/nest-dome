import { Connection } from 'typeorm';
import { Connection as MongodbConnection } from 'mongoose'
import { Inject, Provider } from '@nestjs/common'
import { REPOSITORY, DB_CONNECTION_TOKEN, DATABASE_CONNECTION } from '../constants/system.constant';
import { getModelForClass } from '@typegoose/typegoose';


export interface TypeClass {
    new(...args: [])
}

// provider名称
export function getModelName(name: string): string {
    return name.toLocaleUpperCase() + REPOSITORY
}

// mysql 工厂提供者
export function getProviderByTypeormClass(typeormClass: TypeClass): Provider {
    return {
        provide: getModelName(typeormClass.name),
        useFactory: (connection: Connection) => {
            return connection.getRepository(typeormClass)
        },
        inject: [DB_CONNECTION_TOKEN]
    }
}

// mongodb 工厂提供者
export function getProviderByTypegoose(typegooseClass: TypeClass): Provider {
    return {
        provide: getModelName(typegooseClass.name),
        useFactory: (connection: MongodbConnection) => {
            return getModelForClass(typegooseClass, { existingConnection: connection })
        },
        inject: [DATABASE_CONNECTION]
    }
}

// Model 注入器
export function InjectModel(model: TypeClass) {
    return Inject(getModelName(model.name))
}