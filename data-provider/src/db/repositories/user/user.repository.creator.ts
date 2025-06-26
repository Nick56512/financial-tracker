import { EntityTarget, Repository } from "typeorm";
import { DbContext } from "../../context";
import { IRepositoryCreator } from "../irepository.creator";
import { UserRepository } from "./user.repository";
import { IModelRepository } from "../entity/imodel.repository";
import { User } from "entities";

export class UserRepositoryCreator implements IRepositoryCreator {
    constructor(private readonly dbContext: DbContext) {}
    createRepository<Entity>(entityTarget: EntityTarget<User>): IModelRepository<User> {
        const ormRepository: Repository<User> = this.dbContext.getConnection().getRepository(entityTarget)
        return new UserRepository(ormRepository)
    }
}