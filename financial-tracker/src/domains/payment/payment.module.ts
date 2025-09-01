import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { INJECTION_KEYS } from 'core/@types/enum.keys';
import {
   IModelRepository,
   IQueryBuilderRepository,
   Payments,
   Report,
} from 'data-provider';
import { IMapper, Mapper } from 'infrastructure';
import { PaymentService } from './payment.service';
import { PaymentDto } from './payment.models';

@Module({
   controllers: [PaymentsController],
   providers: [
      {
         provide: INJECTION_KEYS.PaymentService,
         useFactory: (
            paymentsRepository: IQueryBuilderRepository<Payments>,
            reportsRepository: IModelRepository<Report>,
         ) => {
            const mapper: IMapper<Payments, PaymentDto> = new Mapper<
               Payments,
               PaymentDto
            >(Payments, PaymentDto);
            return new PaymentService(
               paymentsRepository,
               reportsRepository,
               mapper,
            );
         },
         inject: [
            INJECTION_KEYS.PaymentsRepository,
            INJECTION_KEYS.ReportsRepository,
         ],
      },
   ],
})
export class PaymentsModule {}
