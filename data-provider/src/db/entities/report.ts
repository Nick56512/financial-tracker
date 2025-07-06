import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { Payments } from "./payments";
import { User } from "./user";

export enum BudgetPeriod {
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

@Entity()
export class Report extends PrimaryKeyEntity {
    
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'integer' })
    currentBudget: number;

    @Column({ type: 'integer' })
    plannedBudget: number;

    @Column( { type: 'enum', enum: BudgetPeriod, default: BudgetPeriod.MONTHLY })
    budgetPeriod: BudgetPeriod;

    @OneToMany(() => Payments, (payment) => payment.report)
    payments: Payments[];

    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}