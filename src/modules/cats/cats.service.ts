import { InjectModel } from "@app/common/transformers/model.transformer";
import { MongooseModel } from "@app/interfaces/mongoose.interface";
import { Injectable } from "@nestjs/common";
import { Cats } from "./cats.model";
import { CreateCatDto } from "./dto/create-cat.dto";


@Injectable()
export class CatsService {
    constructor(
        @InjectModel(Cats)
        private readonly catsService: MongooseModel<Cats>
    ) { }

    async create(cat: CreateCatDto): Promise<Cats> {
        return await this.catsService.create(cat);
    }

    async findAll(): Promise<Cats[]> {
        return await this.catsService.find().exec();
    }
}