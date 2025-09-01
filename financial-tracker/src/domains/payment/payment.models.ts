import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class PaymentDto {
   id?: string;
   amount: number;
   categoryId: string;
   reportId: string;
}

export class FilterPaymentsQuery {
   @IsUUID()
   @IsOptional()
   reportId: string;

   @IsUUID()
   @IsOptional()
   categoryId: string;
}

export class CreatePaymentPayload {
   @IsUUID()
   @IsNotEmpty()
   reportId: string;

   @IsUUID()
   @IsNotEmpty()
   categoryId: string;

   @IsNumber({ allowNaN: false })
   @IsNotEmpty()
   @Min(1)
   amount: number;
}

export class UpdatePaymentPayload extends CreatePaymentPayload {
   @IsUUID()
   @IsNotEmpty()
   id: string;
}

export const enum PaymentsSummaryGroupBy {
   CATEGORY = 'category',
}

export class SummaryCategory {
   categoryId: string;
   categoryName: string;
   sum: number;
}

export type PaymentsSummaryByCategories = {
   categories: SummaryCategory[];
   total: number;
   reportId: string;
   reportCreatedAt: Date;
};
