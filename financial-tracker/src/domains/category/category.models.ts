import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CategoryDto {
    name: string
    description?: string
    allocatedBudget?: number
}

export class CreateNewCategoryModel {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmpty()
    @IsNumber()
    allocatedBudget?: number
}
