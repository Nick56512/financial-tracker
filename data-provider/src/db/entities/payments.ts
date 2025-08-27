import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { Report } from "./report";
import { Category } from "./category";
import { DbTablesNames } from "types";

@Entity({ name: DbTablesNames.payments })
export class Payments extends PrimaryKeyEntity {
    
    @Column({ type: 'integer'})
    amount: number;

    @ManyToOne(() => Report, (report) => report.payments)
    report: Report

    @Column({ name: 'reportId', type: 'uuid' })
    reportId: string

    @ManyToOne(() => Category, (category) => category.payments)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'uuid' })
    categoryId: string
}