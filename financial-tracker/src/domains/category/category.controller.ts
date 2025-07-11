import { Controller, Get, Post, Inject, Param, ParseUUIDPipe, Body, UsePipes, ValidationPipe, Delete, Query, UseGuards } from "@nestjs/common";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { CategoryDto } from "models/dtos";
import { ICategoryService } from "./category.service";
import { CreateNewCategoryModel } from "./category.models";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";

@Controller(ControllersRoutes.category)
@UseGuards(JwtAuthGuard)
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private readonly categoryService: ICategoryService) {}

    @Get(EndpointsRoutes.getAllCategories)
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
            allocatedBudget: 0,
            name: newCategory.name
        }) 
        return { id: categoryId, name: newCategory.name }
    }

    @Delete(EndpointsRoutes.remove)
    public async removeCategory(@Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string) {
        return this.categoryService.removeById(id)
    }

    @Get(EndpointsRoutes.getAllPayments)
    public async getAllPayments(@Param(EndpointsParameters.id, new ParseUUIDPipe()) id: string) {
        return this.categoryService.getAllCategoryPayments(id)
    }
}