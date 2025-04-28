export class ReportDto {
    name: string;
    currentBudget: number;
    plannedBudget: number;

    @Column( { type: 'enum', enum: BudgetPeriod, default: BudgetPeriod.MONTHLY })
    budgetPeriod: BudgetPeriod;

    payments: Payments[];

}