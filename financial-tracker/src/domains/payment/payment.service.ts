import { Inject, Injectable } from "@nestjs/common";
import { IModelRepository, Payments } from "data-provider";
import { AbstractService, IMapper, IService } from "infrastructure";
import { PaymentDto } from "./payment.models";

export interface IUserPaymentsService extends IService<PaymentDto> {
    getByUserId(userId: string): Promise<PaymentDto[]>
    getByCategoryId(categoryId: string): Promise<PaymentDto[]>
}

@Injectable()
export class PaymentService extends AbstractService<Payments, PaymentDto> implements IUserPaymentsService {
    constructor(private readonly paymentRepository: IModelRepository<Payments>,
                mapper: IMapper<Payments, PaymentDto> ){
        super(paymentRepository, mapper)
    }
    async getByUserId(userId: string): Promise<PaymentDto[]> {
        const payments = await this.paymentRepository.findManyBy('userId', userId)
        return payments.map(x => this.mapper.mapToDto(x))
    }
    async getByCategoryId(categoryId: string): Promise<PaymentDto[]> {
        const payments = await this.paymentRepository.findManyBy('categoryId', categoryId)
        return payments.map(x => this.mapper.mapToDto(x))
    }

}