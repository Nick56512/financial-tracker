import { AxiosHttpService } from "@domains/infrastructure/http-service/axios.http.service";
import { Payment, PaymentsSummaryByCategories } from "./payments.models";

export interface IGetSummaryByCategories {
    getSummaryByCategoriesInReport(reportId: string): Promise<PaymentsSummaryByCategories>
}

export class PaymentsService extends AxiosHttpService<Payment> implements IGetSummaryByCategories {
    getSummaryByCategoriesInReport(reportId: string): Promise<PaymentsSummaryByCategories> {
        const result = 
    }
}