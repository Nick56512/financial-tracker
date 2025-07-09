import { Injectable } from "@nestjs/common";
import { IUserRepository, User } from "data-provider";
import { UserDto } from "models/dtos";
import { Mapper } from "infrastructure";

export interface IUserAccountService {
    findUserByEmail(email: string): Promise<UserDto | null>
    registerNewUser(newUser: UserDto): Promise<string>
    updateAccountInfo(updatedUserDto: UserDto): Promise<boolean>
}

@Injectable()
export class UserAccountService implements IUserAccountService {
    constructor(protected readonly userRepository: IUserRepository,
                protected readonly mapper: Mapper<User, UserDto>) {
    }
    async findUserByEmail(email: string): Promise<UserDto | null> {
        const user = await this.userRepository.findByEmail(email)
        if(user === null) {
            return user 
        }
        return this.mapper.mapToDto(user)
    }
    async registerNewUser(newUser: UserDto): Promise<string> {
        const user = this.mapper.mapToEntity(newUser)
        const addedUser = await this.userRepository.createOrUpdate(user)
        return addedUser.id;
    }

    async updateAccountInfo(updatedUserDto: UserDto): Promise<boolean> {
       const updatedUser = await this.registerNewUser(updatedUserDto)
       return typeof updatedUser === 'string' && updatedUser.length !== 0
    }
}