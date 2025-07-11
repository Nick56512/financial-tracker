import { Injectable } from "@nestjs/common";
import { Category } from "data-provider";
import { AbstractService, IService } from "infrastructure";
import { CategoryDto } from "models/dtos";

export interface ICategoryService extends IService<CategoryDto> {
    getAllReportCategories(reportId: string)
}

@Injectable()
export class CategoryService extends AbstractService<Category, CategoryDto> implements ICategoryService {


    getAllReportCategories(reportId: string) {
        // TODO: get all categories in report
    }
}