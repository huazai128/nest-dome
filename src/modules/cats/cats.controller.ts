import { Controller, UseGuards, Get, Post, Body } from "@nestjs/common";
import { RolesGuard } from "@app/common/guards/rolu.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Roles } from "@app/common/decorators/roles.decorator";
import { Cats } from "./cats.model";

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsControlller {
    constructor(private readonly catsService: CatsService) { }

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto)
    }

    @Get()
    async findAll(): Promise<Cats[]> {
        return this.catsService.findAll();
    }

}