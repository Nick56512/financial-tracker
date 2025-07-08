import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { Payments } from "./payments";
import { Report } from "./report";

@Entity()
export class Category extends PrimaryKeyEntity {

    @Column({ type: 'varchar', length: 255, unique: true})
    name: string

    @Column({ type: 'varchar', length: 255, nullable: true})
    description: string

    @Column({ type: 'integer' })
    allocatedBudget: number

    @ManyToOne(() => Report, (report) => report.categories)
    report: Report

    @OneToMany(() => Payments, (payment) => payment.category)
    payments: Payments[]
}