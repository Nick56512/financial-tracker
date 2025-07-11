import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { PrimaryKeyEntity } from "./primary.key.entity";
import { User } from "./user";
import { Category } from "./category";

@Entity()
export class Payments extends PrimaryKeyEntity {
    
    @Column({ type: 'integer'})
    amount: number;

    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'uuid' })
    userId: string

    @ManyToOne(() => Category, (category) => category.payments)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'uuid' })
    categoryId: string
    
}