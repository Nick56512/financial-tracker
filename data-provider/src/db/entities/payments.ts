import { Entity, Column, ManyToOne } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { User } from "./user";
import { Category } from "./category";
import { Report } from "./report";

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