import * as PasswordService from '../../services/password-service';
import * as JwtService from '../../services/auth/jwt-service';
import { User } from '../../../database/models/auth/user';
import { Status } from '../../../database/enums/status';
import { Token } from '../../../database/models/auth/token';

export const signup = async (email, nickname, password): Promise<User> => {
    const passwordHash = await PasswordService.hashPassword(password);
    const user: User = await User.create({
        email: email,
        nickname: nickname,
        password: passwordHash,
        status: Status.NEW,
        created: new Date(),
        updated: new Date(),
    });
    const tokenHash = await JwtService.createToken(user);
    user.token = await Token.create({hash: tokenHash, status: Status.ACTIVE});
    await user.updateOne(user);
    return user;
}
