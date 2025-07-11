import { Controller, Get, Post, Inject, Param, ParseUUIDPipe, Body, UsePipes, ValidationPipe, Delete, Query } from "@nestjs/common";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { CategoryDto } from "models/dtos";
import { ICategoryService } from "./category.service";
import { CreateNewCategoryModel } from "./category.models";

@Controller(ControllersRoutes.category)
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private readonly categoryService: ICategoryService) {}

    @Get(EndpointsRoutes.all)
    public async getAll(): Promise<CategoryDto[]> {
        return this.categoryService.getAll()
    }

    @Get(`${EndpointsRoutes.getById}/:${EndpointsParameters.id}`)
    public async getById(@Param(EndpointsParameters.id, new ParseUUIDPipe())id: string): Promise<CategoryDto | null> {
        return this.categoryService.findById(id)
    }

    @Post(EndpointsRoutes.create)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    public async createCategory(@Body() newCategory: CreateNewCategoryModel) {
        const categoryId = await this.categoryService.createOrUpdate({
            allocatedBudget: 20,
            name: 'ddd'
        }) 
        return 
    }

    @Delete(EndpointsRoutes.remove)
    public async removeCategory(@Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string) {
        return this.categoryService.removeById(id)
    }
}