import { BudgetPeriod } from 'data-provider'
import { PaymentDto } from './payment.dto';
import { IsString } from 'class-validator';

export class ReportDto {
    @IsString()
    
    name: string;

    currentBudget: number;
    plannedBudget: number;

    budgetPeriod: BudgetPeriod;

    payments: PaymentDto[];
}