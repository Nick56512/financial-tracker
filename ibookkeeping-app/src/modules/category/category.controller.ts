import { Controller, Get, Inject } from "@nestjs/common";
import { CategoryDto } from "dto/category.dto";
import { IService } from "infrastructure";
import { INJECTION_KEYS } from "infrastructure/@types/enum.keys";

@Controller('category')
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private service: IService<CategoryDto>) {}

    @Get('all')
    public async getAll(): Promise<CategoryDto[]> {
        return this.service.getAll()
    }
}