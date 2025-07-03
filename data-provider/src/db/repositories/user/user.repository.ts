import { IUserRepository } from "./iuser.repository.js";
import { EntityRepository } from "../entity/entity.repository.js";
import { Repository } from "typeorm";
import { User } from '../../entities/index.js'

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
