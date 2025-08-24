import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CategoryDto {
    name: string
    description?: string
    allocatedBudget?: number
}

export class CreateNewCategoryModel {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsUUID()
    @IsNotEmpty()
    reportId: string

    @IsOptional()
    @IsNumber()
    allocatedBudget?: number
}
