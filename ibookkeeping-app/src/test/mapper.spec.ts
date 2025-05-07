import { User } from "data-provider"
import { UserDto } from "dto"
import { IMapper } from "infrastructure/service/mapper/imapper"
import { Mapper } from "infrastructure/service/mapper/mapper"


describe('mapper test', () => {
    const mapper: IMapper<User, UserDto> = new Mapper(User, UserDto)
    it('test mapping user entity and dto on two ways', () => {

        const testUserDto = new UserDto()
        testUserDto.age = 13
        testUserDto.email = 'email@em.uk'
        testUserDto.name = 'Name';

        const entity = mapper.mapToEntity(testUserDto)

        expect(entity.email).toEqual(testUserDto.email)
        expect(entity.age).toEqual(testUserDto.age)
        expect(entity.name).toEqual(testUserDto.name)
    })
})