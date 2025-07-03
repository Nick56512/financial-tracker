import { User, Report, Category, PrimaryKeyEntity } from "./index.js";
import { Entity, Column, ManyToOne } from "typeorm";


@Entity()
export class Payments extends PrimaryKeyEntity {
    
    @Column({ type: 'integer'})
    amount: number;

    @ManyToOne(() => User, (user) => user.payments)
    user: User;

    @ManyToOne(() => Category, (category) => category.payments)
    category: Category;

    @ManyToOne(() => Report, (report) => report.payments)
    report: Report;
}