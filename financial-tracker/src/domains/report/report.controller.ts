import {
   Controller,
   Inject,
   Get,
   Post,
   Query,
   ParseUUIDPipe,
   UsePipes,
   ValidationPipe,
   Body,
   BadRequestException,
   UseGuards,
   Param,
   Put,
   Delete,
} from '@nestjs/common';
import {
   ControllersRoutes,
   EndpointsParameters,
   EndpointsRoutes,
   INJECTION_KEYS,
} from 'core/@types/enum.keys';
import { IReportsService } from './report.service';
import {
   CreateReportPayload,
   ReportDto,
   UpdateReportPayload,
} from './report.models';
import { JwtPayload } from 'core/global-modules/jwt-auth-module/guard-strategy/jwt.strategy';
import { User } from 'core/decorators/user.decorator';
import { JwtAuthGuard } from 'core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard';

@Controller(ControllersRoutes.reports)
@UseGuards(JwtAuthGuard)
export class ReportController {
   constructor(
      @Inject(INJECTION_KEYS.ReportsService)
      private readonly reportsService: IReportsService,
   ) {}

   @Get(EndpointsRoutes.filter)
   public getByUserId(@Query(EndpointsParameters.userId) userId: string) {
      return this.reportsService.getByUserId(userId);
   }

   @Get()
   public getById(
      @Query(EndpointsParameters.id, new ParseUUIDPipe()) id: string,
   ): Promise<ReportDto | null> {
      return this.reportsService.findById(id);
   }

   @Post()
   @UsePipes(new ValidationPipe({ whitelist: true }))
   public async createNewReport(
      @Body() createReportModel: CreateReportPayload,
      @User() user: JwtPayload,
   ) {
      if (!user.userId) {
         throw new BadRequestException();
      }
      const reportDto: ReportDto = {
         ...createReportModel,
         userId: user.userId,
      };
      const id = await this.reportsService.createOrUpdate(reportDto);
      return {
         id,
         userId: user.userId,
         ...createReportModel,
      };
   }

   @Put()
   @UsePipes(new ValidationPipe({ whitelist: true }))
   public async updateReport(
      @Body() report: UpdateReportPayload,
      @User() user: JwtPayload,
   ) {
      if (!user.userId) {
         throw new BadRequestException();
      }
      await this.reportsService.createOrUpdate({
         ...report,
         userId: user.userId,
      });
      return {
         userId: user.userId,
         ...report,
      };
   }

   @Delete()
   public async deleteReport(@Query(EndpointsParameters.id) id: string) {
      const success = await this.reportsService.removeById(id);
      return {
         success,
      };
   }
}
