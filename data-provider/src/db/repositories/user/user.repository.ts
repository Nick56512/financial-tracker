import { User } from "entities";
import { IUserRepository } from "./iuser.repository";
import { EntityRepository } from "../entity/entity.repository";
import { Repository } from "typeorm";

export class UserRepository extends EntityRepository<User> implements IUserRepository {

    constructor(protected readonly repository: Repository<User>) {
        super(repository)
    }
    
    async findByEmail(email: string): Promise<User | null> {
       return this.repository.findOne({
            where: {
                email
            }
       })
    }
}
