import { PrimaryKeyEntity, User } from "entities";
import { IUserRepository } from "./iuser.repository";
import { Repository } from "typeorm";
import { EntityRepository } from "../entity/entity.repository";

export class UserRepository extends EntityRepository<User> implements IUserRepository<User> {

    constructor(protected readonly repository: Repository<User>) {
        super(repository);
    }

    findByLogin(email: string): Promise<User | null> {
        return this.repository.findOne({
            where: { email }
        });
    }
}
