import { PrimaryGeneratedColumn } from "typeorm";

export class PrimaryKeyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}