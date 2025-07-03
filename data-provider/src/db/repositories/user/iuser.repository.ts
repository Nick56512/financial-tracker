import { IModelRepository } from "../entity/imodel.repository.js";
import { User } from '../../entities/index.js'

export interface IUserRepository extends IModelRepository<User> {
    findByEmail(email: string): Promise<User | null>
}