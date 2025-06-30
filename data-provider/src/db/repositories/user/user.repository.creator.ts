import { User } from "entities";
import { EntityTarget } from "typeorm";
import { IModelRepository } from "../entity/imodel.repository";
import { IRepositoryCreator } from "../irepository.creator";
import { DbContext } from "db/context";
import { UserRepository } from "./user.repository";
import { IUserRepository } from "./iuser.repository";

export class UserRepositoryCreator implements IRepositoryCreator<User> {
    constructor(private readonly dbContext: DbContext) {}
    
    createRepository(entityTarget: EntityTarget<User>): IUserRepository {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new UserRepository(ormRepository)
    }
}