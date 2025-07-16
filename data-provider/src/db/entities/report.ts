import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { User } from "./user";
import { Category } from "./category";

@Entity({ name: 'reports' })
export class Report extends PrimaryKeyEntity {
    
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'integer' })
    currentBudget: number;

    @Column({ type: 'integer', nullable: true })
    plannedBudget: number;

    @OneToMany(() => Category, (category) => category.report)
    categories: Promise<Category[]>

    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'uuid' })
    userId: string
}