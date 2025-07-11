import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { INJECTION_KEYS } from "core/@types/enum.keys";
import { Category, IModelRepository, Payments } from "data-provider";
import { IMapper, Mapper } from "infrastructure";
import { CategoryDto } from "models/dtos";
import { CategoryService } from "./category.service";
import { PaymentDto } from "domains/payment/payment.models";

@Module({
    controllers: [ CategoryController ],
    providers: [
        {
            provide: INJECTION_KEYS.CategoryService,
            useFactory: (repository: IModelRepository<Category>) => {
                const categoryMapper: IMapper<Category, CategoryDto> = new Mapper(Category, CategoryDto)
                const paymentsMapper: IMapper<Payments, PaymentDto> = new Mapper(Payments, PaymentDto)
                return new CategoryService(repository, categoryMapper, paymentsMapper)
            },
            inject: [ INJECTION_KEYS.CategoryRepository ]
        }
    ]
})
export class CategoryModule {}