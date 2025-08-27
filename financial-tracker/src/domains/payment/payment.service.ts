import { Injectable } from "@nestjs/common";
import { IModelRepository, IQueryBuilderRepository, Payments, Report } from "data-provider";
import { AbstractService, IMapper, IService } from "infrastructure";
import { FilterPaymentsQuery, PaymentDto, PaymentsSummaryByCategories, SummaryCategory } from "./payment.models";

export interface IUserPaymentsService extends IService<PaymentDto> {
    filter(params: FilterPaymentsQuery): Promise<PaymentDto[]>
    getPaymentsSummaryByCategories(reportId: string): Promise<PaymentsSummaryByCategories | null>
}

@Injectable()
export class PaymentService extends AbstractService<Payments, PaymentDto> implements IUserPaymentsService {
    constructor(private readonly paymentRepository: IQueryBuilderRepository<Payments>,
                private readonly reportsRepository: IModelRepository<Report>,
                mapper: IMapper<Payments, PaymentDto> ){
        super(paymentRepository, mapper)
    }
    async filter(params: FilterPaymentsQuery): Promise<PaymentDto[]> {
        return (await this.paymentRepository.filterByMany(params))
                .map(x => this.mapper.mapToDto(x))
    }
    async getPaymentsSummaryByCategories(reportId: string): Promise<PaymentsSummaryByCategories | null> {

        const report = await this.reportsRepository.findById(reportId)
        if(!report) {
            return null
        }
        const rows = await this.paymentRepository.sumByField('categoryId', 'amount', ['categoryId'], {
            reportId
        })

        const categories: SummaryCategory[] = rows.map(x => ({
            categoryId: x.categoryId,
            categoryName: 'name',
            sum: x.sum
        }))

        const total = categories.reduce((acc, category) => acc += category.sum, 0)
        return {
            reportCreatedAt: report.createdAt,
            categories,
            reportId,
            total
        }
    }

}