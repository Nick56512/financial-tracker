import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Payments, Report } from "entities"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string

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