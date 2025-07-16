import { Entity, Column, OneToMany } from 'typeorm'
import { Payments } from './payments'
import { Report } from './report'
import { PrimaryKeyEntity } from './primary.key.entity'

@Entity({ name: 'users' })
export class User extends PrimaryKeyEntity {
        
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'int', nullable: true })
    age: number

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string

    @OneToMany(() => Payments, (payment) => payment.user, { lazy: true })
    payments: Promise<Payments[]>

    @OneToMany(() => Report, (report) => report.user, { lazy: true })
    reports: Promise<Report[]>
}