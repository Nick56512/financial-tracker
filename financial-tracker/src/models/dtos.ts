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

export class UserDto {
    id?: string
    email: string
    age?: number
    name?: string
}

