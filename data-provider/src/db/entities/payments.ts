import { Entity, Column, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { Report } from "./report";
import { Category } from "./category";
import { DbTablesNames } from "types";

@Entity({ name: DbTablesNames.payments })
export class Payments extends PrimaryKeyEntity {
    
    @Column({ type: 'decimal', nullable: true})
    amount: number;

    @Column({ name: 'reportId', type: 'uuid' })
    reportId: string

    @Column({ name: 'categoryId', type: 'uuid' })
    categoryId: string

    @DeleteDateColumn()
    deletedAt?: Date


    @ManyToOne(() => Report, (report) => report.payments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'reportId' })
    report: Report

    @ManyToOne(() => Category, (category) => category.payments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}