import { IsNotEmpty, IsString } from "class-validator"

export class CategoryDto {
    name: string
    description?: string
    allocatedBudget?: number
}

export class CreateNewCategoryModel {
    @IsString()
    @IsNotEmpty()
    name: string
}
