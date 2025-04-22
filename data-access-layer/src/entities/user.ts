import "reflect-metadata"
import { Entity, Column, OneToMany } from 'typeorm'
import { Payments } from "./payments"
import { Report } from "./report"
import { PrimaryKeyEntity } from "./abstract.entity"

@Entity()
export class User extends PrimaryKeyEntity {

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'int', nullable: true })
    age: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @OneToMany(() => Payments, (payment) => payment.user)
    payments: Payments[]

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]
}