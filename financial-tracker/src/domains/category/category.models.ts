import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CategoryDto {
  name: string;
  description?: string;
  allocatedBudget?: number;
  plannedBudget?: number;
}

export class CreateCategoryPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  reportId: string;

  @IsOptional()
  @IsNumber()
  allocatedBudget?: number;

  @IsOptional()
  @IsNumber()
  plannedBudget?: number;
}

export class UpdateCategoryPayload extends CreateCategoryPayload {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
