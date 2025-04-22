import { Column, Entity, OneToMany } from "typeorm";
import { Payments } from "./payments";
import { PrimaryKeyEntity } from "./abstract.entity";

@Entity()
export class Category extends PrimaryKeyEntity {
 
    @Column({ type: 'varchar', length: 255, unique: true})
    name: string

    @Column({ type: 'varchar', length: 255, nullable: true})
    description: string

    @Column({ type: 'integer' })
    allocatedBudget: number

    @OneToMany(() => Payments, (payment) => payment.category)
    payments: Payments[]
}