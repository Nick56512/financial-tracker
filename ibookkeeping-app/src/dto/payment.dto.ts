import { Type } from "class-transformer";
import { CategoryDto } from "./category.dto";

export class PaymentDto {
    amount: number;
    
    @Type(() => CategoryDto)
    category: CategoryDto;
}