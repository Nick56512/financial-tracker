import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { INJECTION_KEYS } from "types";
import { Category, DbContext, EntityRepositoryCreator, IRepositoryCreator } from "data-provider";
import { AbstractService, Mapper } from "infrastructure";
import { CategoryDto } from "models/dtos";

@Module({
    controllers: [CategoryController],
    providers: [
        {
           provide: INJECTION_KEYS.CategoryService,
           useFactory: async (context: DbContext) => {
                const creator: IRepositoryCreator<Category> = new EntityRepositoryCreator(context)
                const repository = creator.createRepository(Category)
                return new AbstractService(repository, new Mapper(Category, CategoryDto))
            },
           inject: [INJECTION_KEYS.DbContext]
        }
    ]
})
export class CategoryModule {}