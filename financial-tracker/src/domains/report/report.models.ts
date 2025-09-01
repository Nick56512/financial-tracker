import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ReportDto {
  id?: string;
  createdAt?: Date;
  name: string;
  plannedBudget?: number;
  userId: string;
  currentBudget?: number;
}

export class CreateReportPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  currentBudget: number;

  @IsOptional()
  @IsNumber()
  plannedBudget?: number;
}

export class UpdateReportPayload extends CreateReportPayload {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
