import { Controller, Get, Post, Inject, Param, ParseUUIDPipe, Body, UsePipes, ValidationPipe, Delete, UseGuards, Query } from "@nestjs/common";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { CategoryDto } from "models/dtos";
import { ICategoryService } from "./category.service";
import { CreateNewCategoryModel } from "./category.models";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";

@Controller(ControllersRoutes.categories)
@UseGuards(JwtAuthGuard)
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private readonly categoryService: ICategoryService) {}

    @Get()
    public async getAll(): Promise<CategoryDto[]> {
        return this.categoryService.getAll()
    }

    @Get(`${EndpointsRoutes.filter}`)
    public async getByReportId(@Query(EndpointsParameters.reportId, new ParseUUIDPipe()) reportId: string) {
        return this.categoryService.getByReportId(reportId)
    }

    @Get(`:${EndpointsParameters.id}`)
    public async getById(@Param(EndpointsParameters.id, new ParseUUIDPipe())id: string): Promise<CategoryDto | null> {
        return this.categoryService.findById(id)
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    public async createCategory(@Body() newCategory: CreateNewCategoryModel) {
        const categoryId = await this.categoryService.createOrUpdate({
            allocatedBudget: 0,
            name: newCategory.name
        }) 
        return { id: categoryId, name: newCategory.name }
    }

    @Delete()
    public async removeCategory(@Param(EndpointsParameters.id, new ParseUUIDPipe()) id: string) {
        return this.categoryService.removeById(id)
    }
  

 
}