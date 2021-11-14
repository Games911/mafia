import * as PasswordService from '../../services/password-service';
import * as JwtService from '../../services/auth/jwt-service';
import { User, findByNickname } from '../../../database/models/auth/user';
import { Status } from '../../../database/enums/status';
import { Token, removeTokenEntry } from '../../../database/models/auth/token';

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

export const loginUser = async (nickname, password): Promise<User> => {
    const user = await findByNickname(nickname);
    if (user && await PasswordService.comparePassword(password, user.password)) {
        const tokenHash = await JwtService.createToken(user);

        if (typeof user.token !== 'undefined') {
            await removeTokenEntry(user.token);
        }

        user.token = await Token.create({hash: tokenHash, status: Status.ACTIVE});
        await user.updateOne(user);
        return user;
    }
    throw new Error('Wrong nickname or password');
}
