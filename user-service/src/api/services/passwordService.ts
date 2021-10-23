import * as bcrypt from 'bcrypt';
import { saltRound }  from '../../config/settings';

class passwordService {

    public hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(parseInt(saltRound));
        return bcrypt.hashSync(password, salt);
    }

    public async comparePassword(password, hashPassword): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default passwordService;
