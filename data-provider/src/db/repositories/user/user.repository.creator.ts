import { EntityTarget } from "typeorm";
import { IRepositoryCreator } from "../irepository.creator.js";
import { DbContext } from "db/context.js";
import { UserRepository } from "./user.repository.js";
import { IUserRepository } from "./iuser.repository.js";
import { User } from '../../entities/index.js'

export class UserRepositoryCreator implements IRepositoryCreator<User> {
    constructor(private readonly dbContext: DbContext) {}
    
    createRepository(entityTarget: EntityTarget<User>): IUserRepository {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new UserRepository(ormRepository)
    }
}