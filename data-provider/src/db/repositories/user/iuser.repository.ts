import { User } from "entities";
import { IModelRepository } from "../entity/imodel.repository";

export interface IUserRepository extends IModelRepository<User> {
    findByEmail(email: string): Promise<User | null>
}