import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description?: string

    @IsNumber()
    allocatedBudget: number
}