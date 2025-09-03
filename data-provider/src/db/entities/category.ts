import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
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

    @Column({ name: 'reportId',  type: 'uuid' })
    reportId: string

    @DeleteDateColumn()
    deletedAt?: Date



    @ManyToOne(() => Report, (report) => report.categories, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'reportId' })
    report: Report
    @OneToMany(() => Payments, (payment) => payment.category, { lazy: true,
        cascade: ['soft-remove', 'remove']
    })
    payments: Promise<Payments[]>
}