import { Inject, Injectable } from '@nestjs/common';
import { Category, IModelRepository, Payments, Report } from 'data-provider';
import { AbstractService, IMapper, IService } from 'infrastructure';
import { ReportDto } from './report.models';

export interface IReportsService extends IService<ReportDto> {
   getByUserId(userId: string): Promise<ReportDto[]>;
}
@Injectable()
export class ReportService
   extends AbstractService<Report, ReportDto>
   implements IReportsService
{
   constructor(     
      protected readonly reportsRepository: IModelRepository<Report>,
      protected readonly mapper: IMapper<Report, ReportDto>,
   ) {
      super(reportsRepository, mapper);
   }

   async getByUserId(userId: string): Promise<ReportDto[]> {
      const userReports = await this.modelRepository.findManyBy(
         'userId',
         userId,
      );
      return userReports.map((x) => this.mapper.mapToDto(x));
   }
}
