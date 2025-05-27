import { Controller, Get } from "@nestjs/common";
import { CategoryDto } from "dto/category.dto";
import { IService } from "infrastructure";

@Controller('category')
export class CategoryController {

    constructor(private service: IService<CategoryDto>) {}

    @Get('all')
    public async getAll(): Promise<CategoryDto[]> {
        return this.service.getAll()
    }
}