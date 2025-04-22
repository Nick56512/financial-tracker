import { PrimaryKeyEntity } from "./abstract.entity";
import { Category } from "./category";
import { Report } from "./report";
import { User } from "./user";
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