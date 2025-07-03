import { User } from "../db/entities/index.js";
import { EntityRepository, IModelRepository } from "../db/index.js";
import { createDbContext, getTestUser } from "./stubs.js";

function testDatabaseInteraction() {
    testDbContext()
    testUserRepository()
}

function testDbContext() {
    it('should create a new initialized connection',async () => {
        const context = createDbContext()

        await context.createConnection()
        expect(context.isConnected()).toBeTruthy();

        await context.closeConnection()
        expect(context.isConnected()).toBeFalsy()
    })
}

function testUserRepository() {
    let userRepository: IModelRepository<User>
    let testUser: User = getTestUser()
    let context = createDbContext()
    beforeAll(async () => {
        let connection = await context.createConnection()
        userRepository = new EntityRepository(connection.getRepository(User))
    })
    afterAll(async () => {
        await context.closeConnection()
    })

    it('should create, read and delete user in db', async () => {
        testUser = await userRepository.createOrUpdate(testUser)
        expect(testUser.id).not.toBeNull()
        expect(testUser.id).not.toBe('')
    })
    it('should update user name', async () => {
        const newTestName = 'updatedName'
        testUser.name = newTestName
        testUser = await userRepository.createOrUpdate(testUser)
        expect(testUser.name).toEqual(newTestName)
    })
    it('should get user be id', async () => {
        const user = await userRepository.findById(testUser.id)
        expect(user.id).toEqual(testUser.id)
    })
    it('remove user from database', async () => {
        await userRepository.removeById(testUser.id)
        const user = await userRepository.findById(testUser.id)

        expect(user).toBeNull()
    })
}

describe('test database interaction', testDatabaseInteraction)