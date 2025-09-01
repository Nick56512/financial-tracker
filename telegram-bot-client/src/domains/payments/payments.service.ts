import { AxiosHttpService } from '@domains/infrastructure/http-service/axios.http.service';
import { Payment, PaymentsSummaryByCategories } from './payments.models';
import { FinanceApiEndpoints } from '@core/api.routes';
import { AxiosResponse } from 'axios';

export interface IGetSummaryByCategories {
   getSummaryByCategoriesInReport(
      reportId: string
   ): Promise<PaymentsSummaryByCategories>;
}

export class PaymentsService
   extends AxiosHttpService<Payment>
   implements IGetSummaryByCategories
{
   async getSummaryByCategoriesInReport(
      reportId: string
   ): Promise<PaymentsSummaryByCategories> {
      const result: AxiosResponse<PaymentsSummaryByCategories> =
         await this.http.get(`/${FinanceApiEndpoints.summary}`, {
            params: {
               reportId,
               groupBy: 'category',
            },
         });
      return result.data;
   }
}
