import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportModel {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    currentBudget: number;

    @IsOptional()
    @IsNumber()
    plannedBudget?: number;
}

export class ReportDto {
    name: string;
    plannedBudget?: number;
    userId: string;
    currentBudget?: number;
}