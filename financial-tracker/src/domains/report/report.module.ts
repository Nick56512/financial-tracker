import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { INJECTION_KEYS } from "core/@types/enum.keys";
import { IModelRepository } from "data-provider";
import { Report } from 'data-provider'
import { IMapper, Mapper } from "infrastructure";
import { ReportDto } from "./report.models";
import { ReportService } from "./report.service";

@Module({
    controllers: [ReportController],
    providers: [
        {
            provide: INJECTION_KEYS.ReportsService,
            useFactory: (reportsRepository: IModelRepository<Report>) => {
                const mapper: IMapper<Report, ReportDto> = new Mapper(Report, ReportDto)
                return new ReportService(reportsRepository, mapper)
            },
            inject: [INJECTION_KEYS.ReportsRepository]
        }
    ]
})
export class ReportsModule {}