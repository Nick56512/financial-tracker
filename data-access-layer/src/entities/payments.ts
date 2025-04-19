import { Category, User, Report } from "entities";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Payments {
    @PrimaryColumn('uuid')
    paymentId: string;

    @Column({ type: 'integer'})
    amount: number;

    @ManyToOne(() => User, (user) => user.payments)
    user: User;

    @ManyToOne(() => Category, (category) => category.payments)
    category: Category;

    @ManyToOne(() => Report, (report) => report.payments)
    report: Report;
}