import { Entity, Column, OneToMany } from 'typeorm'
import { Report } from './report'
import { PrimaryKeyEntity } from './primary.key.entity'
import { DbTablesNames } from 'types'

@Entity({ name: DbTablesNames.users })
export class User extends PrimaryKeyEntity {
        
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'int', nullable: true })
    age: number

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string

    @OneToMany(() => Report, (report) => report.user, { lazy: true })
    reports: Promise<Report[]>
}