import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { UserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = new PrismaClient().user;

  public async login(userData: UserDto): Promise<TokenData> {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided.");

    const matchedUserData: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!matchedUserData) throw new HttpException(409, `Provided email ${userData.email} does not match any account.`);

    const isPasswordMatching: boolean = await compare(userData.password, matchedUserData.password);
    if (!isPasswordMatching) throw new HttpException(409, "Provided password does not match the given account's password.");

    const tokenData = this.createToken(matchedUserData);

    return tokenData;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
