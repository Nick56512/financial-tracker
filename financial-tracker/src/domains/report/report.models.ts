import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BudgetPeriod } from "data-provider";

export class CreateReportModel {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    currentBudget?: number;

    @IsNumber()
    plannedBudget: number;
}

export class ReportDto {
    name: string;
    plannedBudget: number;
    userId: string;

    budgetPeriod?: BudgetPeriod;
    currentBudget?: number;
}