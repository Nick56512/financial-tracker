import { User } from "data-provider"
import { UserDto } from "dto"
import { IMapper, Mapper } from "infrastructure"

jest.mock('dto', () => ({
    UserDto: jest.fn().mockImplementation(() => ({
        age: 13,
        email: 'email@em.uk',
        name: 'Name'
    }))
}))

jest.mock('data-provider', () => ({
    User: jest.fn().mockImplementation(() => ({}))
}))

function testMapper() {

    describe('mapper test', () => {
        const mapper: IMapper<User, UserDto> = new Mapper(User, UserDto)
        it('test mapping user entity and dto on two ways', () => {
            const testUserDto = new UserDto()
            const entity = mapper.mapToEntity(testUserDto)
    
            expect(entity.email).toEqual(testUserDto.email)
            expect(entity.age).toEqual(testUserDto.age)
            expect(entity.name).toEqual(testUserDto.name)
        })
    })
}

testMapper()
