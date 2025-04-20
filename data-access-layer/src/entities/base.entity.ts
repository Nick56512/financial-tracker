import { UUID } from "crypto";
import { PrimaryGeneratedColumn } from "typeorm";

export class PrimaryKeyEntity {
    @PrimaryGeneratedColumn({  })
    id: UUID;
}