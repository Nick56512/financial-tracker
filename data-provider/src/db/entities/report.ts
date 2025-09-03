import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { User } from "./user";
import { Category } from "./category";
import { Payments } from "./payments";
import { DbTablesNames } from "types";

@Entity({ name: DbTablesNames.reports })
export class Report extends PrimaryKeyEntity {
   
    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'integer' })
    currentBudget: number;

    @Column({ type: 'integer', nullable: true })
    plannedBudget: number;

    @Column({ type: 'uuid' })
    userId: string;
    
    @DeleteDateColumn()
    deletedAt?: Date




    @OneToMany(() => Category, (category) => category.report, { lazy: true, 
        cascade: ['soft-remove', 'remove']
    })
    categories: Promise<Category[]>

    @OneToMany(() => Payments, (payments) => payments.report, { lazy: true,
        cascade: ['soft-remove', 'remove']
    })
    payments: Promise<Payments[]>

    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({ name: 'userId' })
    user: User;
}