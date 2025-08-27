import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { Payments } from "./payments";
import { Report } from "./report";
import { DbTablesNames } from "types";

@Entity({ name: DbTablesNames.categories })
export class Category extends PrimaryKeyEntity {

    @Column({ type: 'varchar', length: 255, unique: true})
    name: string

    @Column({ type: 'varchar', length: 255, nullable: true})
    description: string

    @Column({ type: 'integer', nullable: true })
    allocatedBudget: number

    @ManyToOne(() => Report, (report) => report.categories)
    @JoinColumn({ name: 'reportId' })
    report: Report

    @Column({ type: 'uuid' })
    reportId: string

    @OneToMany(() => Payments, (payment) => payment.category, { lazy: true })
    payments: Promise<Payments[]>
}