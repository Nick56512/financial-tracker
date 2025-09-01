import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { INJECTION_KEYS } from 'core/@types/enum.keys';
import { Category, IModelRepository, Payments, Report } from 'data-provider';
import { IMapper, Mapper } from 'infrastructure';
import { ReportDto } from './report.models';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [
    {
      provide: INJECTION_KEYS.ReportsService,
      useFactory: (
        reportsRepository: IModelRepository<Report>,
        categoryRepository: IModelRepository<Category>,
        paymentsRepository: IModelRepository<Payments>,
      ) => {
        const mapper: IMapper<Report, ReportDto> = new Mapper(
          Report,
          ReportDto,
        );
        return new ReportService(
          paymentsRepository,
          categoryRepository,
          reportsRepository,
          mapper,
        );
      },
      inject: [
        INJECTION_KEYS.ReportsRepository,
        INJECTION_KEYS.CategoryRepository,
        INJECTION_KEYS.PaymentsRepository,
      ],
    },
  ],
})
export class ReportsModule {}
