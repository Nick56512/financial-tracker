import { Injectable } from "@nestjs/common";
import { IUserRepository, User } from "data-provider";
import { UserDto } from "models/dtos";
import { AbstractService, Mapper } from "infrastructure";

export interface IUserService {
    findUserByEmail(email: string): Promise<UserDto | null>
    registerNewUser(newUser: UserDto): Promise<boolean>
}

@Injectable()
export class UserService extends AbstractService<User, UserDto> implements IUserService {
    constructor(protected readonly userRepository: IUserRepository,
                protected readonly mapper: Mapper<User, UserDto>) {
        super(userRepository, mapper)
    }
    async findUserByEmail(email: string): Promise<UserDto | null> {
        const user = await this.userRepository.findByEmail(email)
        if(user === null) {
            return user 
        }
        return this.mapper.mapToDto(user)
    }
    async registerNewUser(newUser: UserDto): Promise<boolean> {
        const existsUser: User | null = await this.userRepository.findByEmail(newUser.email)
        if(existsUser != null) {
            return false
        }
        const user = this.mapper.mapToEntity(newUser)
        return (await this.userRepository.createOrUpdate(user)) != null
    }
}