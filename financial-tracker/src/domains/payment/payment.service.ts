import { Inject, Injectable } from "@nestjs/common";
import { IModelRepository, IQueryBuilderRepository, Payments, SumByFieldResult } from "data-provider";
import { AbstractService, IMapper, IService } from "infrastructure";
import { FilterPaymentsQuery, PaymentDto, PaymentsSummaryByCategories, SummaryCategory } from "./payment.models";

export interface IUserPaymentsService extends IService<PaymentDto> {
    filter(params: FilterPaymentsQuery): Promise<PaymentDto[]>
    getPaymentsSummaryByCategories(reportId: string): Promise<PaymentsSummaryByCategories>
}

@Injectable()
export class PaymentService extends AbstractService<Payments, PaymentDto> implements IUserPaymentsService {
    constructor(private readonly paymentRepository: IQueryBuilderRepository<Payments>,
                mapper: IMapper<Payments, PaymentDto> ){
        super(paymentRepository, mapper)
    }
    async filter(params: FilterPaymentsQuery): Promise<PaymentDto[]> {
        return (await this.paymentRepository.filterByMany(params))
                .map(x => this.mapper.mapToDto(x))
    }
    async getPaymentsSummaryByCategories(reportId: string): Promise<PaymentsSummaryByCategories> {
        const rows = await this.paymentRepository.sumByField('categoryId', 'amount', ['categoryId'], {
            reportId
        })

        const categories: SummaryCategory[] = rows.map(x => ({
            categoryId:  x.categoryId,
            categoryName: 'name',
            sum: x.sum
        }))

        const total = categories.reduce((acc, category) => acc += category.sum, 0)
        return {
            categories,
            reportId,
            total
        }
    }

}