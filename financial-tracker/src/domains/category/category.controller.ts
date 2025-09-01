import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  ParseUUIDPipe,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import {
  ControllersRoutes,
  EndpointsParameters,
  EndpointsRoutes,
  INJECTION_KEYS,
} from 'core/@types/enum.keys';
import { ICategoryService } from './category.service';
import {
  CategoryDto,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from './category.models';
import { JwtAuthGuard } from 'core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard';

@Controller(ControllersRoutes.categories)
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(
    @Inject(INJECTION_KEYS.CategoryService)
    private readonly categoryService: ICategoryService,
  ) {}

  @Get(EndpointsRoutes.filter)
  public async getByReportId(
    @Query(EndpointsParameters.reportId, new ParseUUIDPipe()) reportId: string,
  ) {
    return this.categoryService.getByReportId(reportId);
  }

  @Get()
  public async getById(
    @Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string,
  ): Promise<CategoryDto | null> {
    return this.categoryService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async createCategory(@Body() newCategory: CreateCategoryPayload) {
    const id = await this.categoryService.createOrUpdate({
      ...newCategory,
    });
    return {
      id,
      ...newCategory,
    };
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async updateCategoty(@Body() category: UpdateCategoryPayload) {
    await this.categoryService.createOrUpdate({
      ...category,
    });
    return category;
  }

  @Delete()
  public async removeCategory(
    @Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string,
  ) {
    const success = await this.categoryService.removeById(id);
    return {
      success,
    };
  }
}
