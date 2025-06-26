import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"
import { BudgetPeriod } from "data-provider";

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description?: string

    @IsNumber()
    allocatedBudget: number
}


export class PaymentDto {
    amount: number;
    
    @Type(() => CategoryDto)
    category: CategoryDto;
}

export class ReportDto {
    @IsString()
    
    name: string;

    currentBudget: number;
    plannedBudget: number;

    budgetPeriod: BudgetPeriod;

    payments: PaymentDto[];
}


export class UserDto {
    email: string
    age: number
    name: string

    /*@Type(() => )
    reports: Report[]*/
}

export class LoginPayload {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}