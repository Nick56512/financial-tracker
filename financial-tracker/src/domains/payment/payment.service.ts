import { Inject, Injectable } from "@nestjs/common";
import { IModelRepository, Payments } from "data-provider";
import { AbstractService, IMapper, IService } from "infrastructure";
import { PaymentDto } from "./payment.models";

export interface IUserPaymentsService extends IService<PaymentDto> {
    getByReportId(reportId: string): Promise<PaymentDto[]>
    getByCategoryId(categoryId: string): Promise<PaymentDto[]>
}

@Injectable()
export class PaymentService extends AbstractService<Payments, PaymentDto> implements IUserPaymentsService {
    constructor(private readonly paymentRepository: IModelRepository<Payments>,
                mapper: IMapper<Payments, PaymentDto> ){
        super(paymentRepository, mapper)
    }
    async getByReportId(reportId: string): Promise<PaymentDto[]> {
        const payments = await this.paymentRepository.findManyBy('reportId', reportId)
        return payments.map(x => this.mapper.mapToDto(x))
    }
    async getByCategoryId(categoryId: string): Promise<PaymentDto[]> {
        const payments = await this.paymentRepository.findManyBy('categoryId', categoryId)
        return payments.map(x => this.mapper.mapToDto(x))
    }

}