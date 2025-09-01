import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { INJECTION_KEYS } from 'core/@types/enum.keys';
import { Category, IModelRepository } from 'data-provider';
import { IMapper, Mapper } from 'infrastructure';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.models';

@Module({
   controllers: [CategoryController],
   providers: [
      {
         provide: INJECTION_KEYS.CategoryService,
         useFactory: (repository: IModelRepository<Category>) => {
            const categoryMapper: IMapper<Category, CategoryDto> = new Mapper(
               Category,
               CategoryDto,
            );
            return new CategoryService(repository, categoryMapper);
         },
         inject: [INJECTION_KEYS.CategoryRepository],
      },
   ],
})
export class CategoryModule {}
