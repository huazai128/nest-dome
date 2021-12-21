import { Module } from '@nestjs/common'
import { CatsControlller } from './cats.controller';
import { CatsProvider } from './cats.model';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsControlller],
    providers: [CatsProvider, CatsService],
})
export class CatsModule { }