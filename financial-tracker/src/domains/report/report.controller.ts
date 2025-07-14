import { Controller, Inject, Get, Post, Query, ParseUUIDPipe, UsePipes, ValidationPipe, Body, BadRequestException, UseGuards, Param } from "@nestjs/common";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { IReportsService } from "./report.service";
import { CreateReportModel, ReportDto } from "./report.models";
import { JwtPayload } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.strategy";
import { User } from "core/decorators/user.decorator";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";

@Controller(ControllersRoutes.reports)
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseGuards(JwtAuthGuard)
export class ReportController {
    constructor(@Inject(INJECTION_KEYS.ReportsService) private readonly reportsService: IReportsService) {}

    @Get()
    public getAll(): Promise<ReportDto[]> {
        return this.reportsService.getAll()
    }

    @Get(`:${EndpointsParameters.id}`)
    public getById(@Param(EndpointsParameters.id, new ParseUUIDPipe()) id: string ): Promise<ReportDto | null> {
        return this.reportsService.findById(id)
    }

    @Post()
    public async create(@Body() createReportModel: CreateReportModel,
                        @User() user: JwtPayload) {
        if(!user.userId) {
            throw new BadRequestException()
        }
        const reportDto: ReportDto = {
            name: createReportModel.name,
            plannedBudget: createReportModel.plannedBudget,
            userId: user.userId,
            currentBudget: 0
        }
        const newId = await this.reportsService.createOrUpdate(reportDto)
        return { id: newId }
    }

    @Get(EndpointsRoutes.filter) 
    public getByUserId(@Query(EndpointsParameters.userId, new ParseUUIDPipe()) userId: string) {
        return this.reportsService.getByUserId(userId)
    }
}