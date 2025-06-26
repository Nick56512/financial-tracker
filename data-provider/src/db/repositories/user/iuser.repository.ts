import { PrimaryKeyEntity } from "entities";

export interface IUserRepository<Entity extends PrimaryKeyEntity> {
    findByLogin(email: string): Promise<Entity>
}