import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { INJECTION_KEYS } from "core/@types/enum.keys";
import { Category, IModelRepository, IRepositoryCreator } from "data-provider";
import { IMapper, Mapper } from "infrastructure";
import { CategoryDto } from "models/dtos";
import { CategoryService } from "./category.service";

@Module({
    controllers: [ CategoryController ],
    providers: [
        {
            provide: INJECTION_KEYS.CategoryService,
            useFactory: (repository: IModelRepository<Category>) => {
                const mapper: IMapper<Category, CategoryDto> = new Mapper(Category, CategoryDto)
                return new CategoryService(repository, mapper)
            },
            inject: [ INJECTION_KEYS.CategoryRepository ]
        }
    ]
})
export class CategoryModule {}