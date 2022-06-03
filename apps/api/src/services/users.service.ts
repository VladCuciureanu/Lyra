import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class UserService {
  public users = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findMany();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "No user ID was provided.");

    const matchedUserData: User = await this.users.findUnique({ where: { id: userId } });
    if (!matchedUserData) throw new HttpException(409, "Couldn't find a user with given ID.");

    return matchedUserData;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided.");

    const matchedUserData: User = await this.users.findUnique({ where: { email: userData.email } });
    if (matchedUserData) throw new HttpException(409, `Provided email ${userData.email} is already in use by another account.`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided.");

    const matchedUserData: User = await this.users.findUnique({ where: { id: userId } });
    if (!matchedUserData) throw new HttpException(409, "Provided user ID does not match any account.");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData = await this.users.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "No user ID was provided.");

    const matchedUserData: User = await this.users.findUnique({ where: { id: userId } });
    if (!matchedUserData) throw new HttpException(409, "Provided user ID does not match any account.");

    const deleteUserData = await this.users.delete({ where: { id: userId } });
    return deleteUserData;
  }
}

export default UserService;
