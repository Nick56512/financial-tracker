import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { INJECTION_KEYS } from "infrastructure/@types/enum.keys";
import { Category, DbContext, EntityRepositoryCreator, IRepositoryCreator } from "data-provider";
import { AbstractService, Mapper } from "infrastructure";
import { CategoryDto } from "dto/category.dto";
import { DatabaseModule } from "modules/database.module";
import { ConfigurationModule } from "modules/config/config.module";

@Module({
    imports: [ConfigurationModule, DatabaseModule],
    controllers: [CategoryController],
    providers: [
        {
           provide: INJECTION_KEYS.CategoryService,
           useFactory: (context: DbContext) => {
                const creator: IRepositoryCreator = new EntityRepositoryCreator(context)
                const repository = creator.createRepository<Category>(Category)
                return new AbstractService(repository, new Mapper(Category, CategoryDto))
            },
           inject: [INJECTION_KEYS.DbContext]
        }
    ]
})
export class CategoryModule {}