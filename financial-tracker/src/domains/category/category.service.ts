import { Injectable } from '@nestjs/common';
import { Category } from 'data-provider';
import { AbstractService, IService } from 'infrastructure';
import { CategoryDto } from './category.models';

export interface ICategoryService extends IService<CategoryDto> {
  getByReportId(reportId: string): Promise<CategoryDto[]>;
}

@Injectable()
export class CategoryService
  extends AbstractService<Category, CategoryDto>
  implements ICategoryService
{
  async getByReportId(reportId: string): Promise<CategoryDto[]> {
    const categories = await this.modelRepository.findManyBy(
      'reportId',
      reportId,
    );
    return categories.map((x) => this.mapper.mapToDto(x));
  }
}
