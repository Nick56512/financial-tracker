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
    protected readonly paymentsRepository: IModelRepository<Payments>,
    protected readonly categoryRepository: IModelRepository<Category>,
    protected readonly reportsRepository: IModelRepository<Report>,
    protected readonly mapper: IMapper<Report, ReportDto>,
  ) {
    super(reportsRepository, mapper);
  }

  async getByUserId(userId: string): Promise<ReportDto[]> {
    const userReports = await this.modelRepository.findManyBy('userId', userId);
    return userReports.map((x) => this.mapper.mapToDto(x));
  }
  override async removeById(entityId: string): Promise<boolean> {
    const report = await this.reportsRepository.findById(entityId);
    if (!report) {
      return false;
    }
    const categories = await report.categories;
    const payments = await report.payments;
    for (const payment of payments) {
      await this.paymentsRepository.removeById(payment.id);
    }
    for (const category of categories) {
      await this.paymentsRepository.removeById(category.id);
    }
    return await this.reportsRepository.removeById(entityId);
  }
}
