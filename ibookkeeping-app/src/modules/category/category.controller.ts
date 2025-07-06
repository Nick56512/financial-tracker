import { Controller, Get, Post, Inject, Param, ParseUUIDPipe, Body, UsePipes, ValidationPipe, Delete, Query } from "@nestjs/common";
import { IService } from "infrastructure";
import { INJECTION_KEYS } from "types";
import { CategoryDto } from "models/dtos";

@Controller('category')
export class CategoryController {

    constructor(@Inject(INJECTION_KEYS.CategoryService) private service: IService<CategoryDto>) {}

    @Get('all')
    public async getAll(): Promise<CategoryDto[]> {
        return this.service.getAll()
    }

    @Get('getById/:id')
    public async getById(@Param('id', new ParseUUIDPipe())id: string): Promise<CategoryDto | null> {
        return this.service.findById(id)
    }

    @Post('create')
    public async createCategory(@Body(new ValidationPipe({ whitelist: true })) newCategory: CategoryDto) {
        return this.service.createOrUpdate(newCategory)
    }

    @Delete('remove')
    public async removeCategory(@Query('id', new ParseUUIDPipe()) id: string) {
        return this.service.removeById(id)
    }
}