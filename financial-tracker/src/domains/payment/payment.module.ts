import { Module } from "@nestjs/common";
import { PaymentsController } from "./payment.controller";
import { INJECTION_KEYS } from "core/@types/enum.keys";
import { DbContext, EntityRepositoryCreator, IModelRepository, IRepositoryCreator, Payments } from "data-provider";
import { IMapper, Mapper } from "infrastructure";
import { PaymentDto } from "models/dtos";
import { PaymentService } from "./payment.service";

@Module({
    controllers: [PaymentsController],
    providers: [
        {
            provide: INJECTION_KEYS.PaymentService,
            useFactory: (repository: IModelRepository<Payments>) => {
                const mapper: IMapper<Payments, PaymentDto> = new Mapper(Payments, PaymentDto)
                return new PaymentService(repository, mapper)
            },
            inject: [ INJECTION_KEYS.PaymentsRepository ]
        }
    ]
})
export class PaymentsModule {}