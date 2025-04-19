import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Payments } from "entities";

@Entity()
export class Category {
    @PrimaryColumn('uuid')
    categoryId: string 

    @Column({ type: 'varchar', length: 255, unique: true})
    name: string

    @Column({ type: 'varchar', length: 255, nullable: true})
    description: string

    @Column({ type: 'integer' })
    allocatedBudget: number

    @OneToMany(() => Payments, (payment) => payment.category)
    payments: Payments[]
}