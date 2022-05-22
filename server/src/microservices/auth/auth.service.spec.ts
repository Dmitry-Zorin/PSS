// import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { Test } from '@nestjs/testing'
// import { getRepositoryToken } from '@nestjs/typeorm'
// import { AuthService } from './auth.service'
// import { jwtServiceMock, parseToken } from './mock/jwt.service.mock'
// import { UserRepositoryMock } from './mock/user-repository.mock'
// import { User } from './entities/user.entity'

// const TEST_USER: User = {
// 	username: 'username',
// 	password: 'password',
// }

// describe('AuthService', () => {
// 	let authService: AuthService

// 	beforeEach(async () => {
// 		const module = await Test.createTestingModule({
// 			providers: [
// 				AuthService,
// 				{ provide: JwtService, useValue: jwtServiceMock },
// 				{ provide: getRepositoryToken(User), useClass: UserRepositoryMock },
// 			],
// 		}).compile()
// 		authService = module.get(AuthService)
// 	})

// 	test('should return a token without the password', () => {
// 		const { password, ...userInfo } = TEST_USER
// 		const tokenPayload = parseToken(authService.getToken(TEST_USER))
// 		expect(tokenPayload).toEqual(userInfo)
// 	})

// 	test('should hash and verify a password', async () => {
// 		const { password } = TEST_USER

// 		const hashedPassword = await authService.hashPassword(password)
// 		expect(hashedPassword).toBeString()

// 		const verifyPasswordPromise = authService.verifyPassword(password, hashedPassword)
// 		await expect(verifyPasswordPromise).toResolve()
// 	})

// 	test('should fail to verify an incorrect password', async () => {
// 		const { password } = TEST_USER
// 		const hashedPassword = await authService.hashPassword('')
// 		const verifyPasswordPromise = authService.verifyPassword(password, hashedPassword)
// 		await expect(verifyPasswordPromise).rejects.toBeInstanceOf(UnauthorizedException)
// 	})

// 	test('should create and find a user', async () => {
// 		const user = await authService.createUser(TEST_USER)
// 		const foundUser = await authService.findUser(user.username)
// 		expect(foundUser).toEqual(user)
// 	})

// 	test('should fail to create a user with the same username', async () => {
// 		await authService.createUser(TEST_USER)
// 		const createUserPromise = authService.createUser(TEST_USER)
// 		await expect(createUserPromise).rejects.toBeInstanceOf(ConflictException)
// 	})

// 	test('should fail to find a non existent user', async () => {
// 		const findUserPromise = authService.findUser('')
// 		await expect(findUserPromise).rejects.toBeInstanceOf(NotFoundException)
// 	})
// })
