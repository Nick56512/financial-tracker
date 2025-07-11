import { Injectable } from "@nestjs/common";
import { Category, IModelRepository, Payments } from "data-provider";
import { PaymentDto } from "domains/payment/payment.models";
import { AbstractService, IMapper, IService } from "infrastructure";
import { CategoryDto } from "models/dtos";

export interface ICategoryService extends IService<CategoryDto> {
    getAllCategoryPayments(categoryId: string): Promise<PaymentDto[]>
}

@Injectable()
export class CategoryService extends AbstractService<Category, CategoryDto> implements ICategoryService {

    constructor(private readonly categoryRepository: IModelRepository<Category>,
        private readonly categoryMapper: IMapper<Category, CategoryDto>,
        private readonly paymentsMapper: IMapper<Payments, PaymentDto>
    ) {
        super(categoryRepository, categoryMapper)
    }

    async getAllCategoryPayments(categoryId: string): Promise<PaymentDto[]> {
        const category = await this.modelRepository.findById(categoryId)
        if(!category) {
            return []
        }
        return (await category.payments).map(x => this.paymentsMapper.mapToDto(x))
    }
}