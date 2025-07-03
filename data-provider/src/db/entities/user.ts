import { Entity, Column, OneToMany } from 'typeorm'
import { Payments, Report, PrimaryKeyEntity } from "./index.js" 

@Entity()
export class User extends PrimaryKeyEntity {
        
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'int', nullable: true })
    age: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @OneToMany(() => Payments, (payment) => payment.user)
    payments: Payments[]

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]
}