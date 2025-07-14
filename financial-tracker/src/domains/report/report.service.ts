import { Injectable } from "@nestjs/common";
import { Report } from "data-provider";
import { AbstractService, IService } from "infrastructure";
import { ReportDto } from "./report.models";

export interface IReportsService extends IService<ReportDto> {
    getByUserId(userId: string): Promise<ReportDto[]>
}
@Injectable()
export class ReportService extends AbstractService<Report, ReportDto> implements IReportsService {
    async getByUserId(userId: string): Promise<ReportDto[]> {
        const userReports = await this.modelRepository.findManyBy('userId', userId)
        return userReports.map(x => this.mapper.mapToDto(x))
    }
}