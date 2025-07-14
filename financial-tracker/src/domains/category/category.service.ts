import { Injectable } from "@nestjs/common";
import { Category, IModelRepository, Payments } from "data-provider";
import { PaymentDto } from "domains/payment/payment.models";
import { AbstractService, IMapper, IService } from "infrastructure";
import { CategoryDto } from "models/dtos";

export interface ICategoryService extends IService<CategoryDto> {
    getByReportId(reportId: string): Promise<CategoryDto[]>
}

@Injectable()
export class CategoryService extends AbstractService<Category, CategoryDto> implements ICategoryService {
    async getByReportId(reportId: string): Promise<CategoryDto[]> {
        const categories = await this.modelRepository.findManyBy('reportId', reportId)
        return categories.map(x => this.mapper.mapToDto(x))
    }
}