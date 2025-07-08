import { Controller, Get, Post, Inject, Param, ParseUUIDPipe, Body, UsePipes, ValidationPipe, Delete, Query } from "@nestjs/common";
import { IService } from "infrastructure";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "types";
import { CategoryDto } from "models/dtos";

@Controller(ControllersRoutes.category)
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private service: IService<CategoryDto>) {}

    @Get(EndpointsRoutes.all)
    public async getAll(): Promise<CategoryDto[]> {
        return this.service.getAll()
    }

    @Get(`${EndpointsRoutes.getById}/:${EndpointsParameters.id}`)
    public async getById(@Param(EndpointsParameters.id, new ParseUUIDPipe())id: string): Promise<CategoryDto | null> {
        return this.service.findById(id)
    }

    @Post(EndpointsRoutes.create)
    public async createCategory(@Body(new ValidationPipe({ whitelist: true })) newCategory: CategoryDto) {
        return this.service.createOrUpdate(newCategory)
    }

    @Delete(EndpointsRoutes.remove)
    public async removeCategory(@Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string) {
        return this.service.removeById(id)
    }
}