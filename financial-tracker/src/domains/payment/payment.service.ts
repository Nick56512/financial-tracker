import { Inject, Injectable } from "@nestjs/common";
import { IModelRepository, Payments } from "data-provider";
import { AbstractService, IMapper, IService } from "infrastructure";
import { PaymentDto } from "models/dtos";

export interface IUserPaymentsService extends IService<PaymentDto> {
    getUserPayments(userId: string): Promise<PaymentDto[]>
}

@Injectable()
export class PaymentService extends AbstractService<Payments, PaymentDto> implements IUserPaymentsService {
    constructor(private readonly paymentRepository: IModelRepository<Payments>,
                mapper: IMapper<Payments, PaymentDto> ){
        super(paymentRepository, mapper)
    }
    async getUserPayments(userId: string): Promise<PaymentDto[]> {
        const payments = await this.paymentRepository.findManyBy('userId', userId)
        return payments.map(x => this.mapper.mapToDto(x))
    }

}