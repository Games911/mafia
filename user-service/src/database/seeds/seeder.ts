import { Token, IToken, createToken } from '../models/auth/token';
import { Permission, IPermission, createPermission } from '../models/auth/permission';
import { Role, IRole, createRole } from '../models/auth/role';
import { User, IUser, createUser } from '../models/auth/user';
import passwordService  from '../../api/services/passwordService';
import { Status } from '../interfaces/status';

class Seeder {

    public async start(): Promise<void> {
        this.removeStore();
        await this.seedData().then();
    }

    private async seedData(): Promise<IToken | void> {
        const hash = 'sdadiwe9399uadj9jj3d9237nz27n29zn923n9nznz';
        const token1: IToken = {hash: hash, status: Status.ACTIVE};
        const token2: IToken = {hash: hash, status: Status.ACTIVE};
        await createToken(token1).then();
        await createToken(token2).then();

        const permission1: IPermission = {name: 'Permission 1', status: Status.ACTIVE};
        const permission2: IPermission = {name: 'Permission 2', status: Status.NEW};
        const permission3: IPermission = {name: 'Permission 3', status: Status.ACTIVE};
        const permission4: IPermission = {name: 'Permission 4', status: Status.ACTIVE};
        await createPermission(permission1).then();
        await createPermission(permission2).then();
        await createPermission(permission3).then();
        await createPermission(permission4).then();

        const role1: IRole = {name: 'Role 1', statue: Status.ACTIVE, permissions: [permission1, permission2]};
        const role2: IRole = {name: 'Role 2', statue: Status.ACTIVE, permissions: [permission3, permission4]};
        const role3: IRole = {name: 'Role 3', statue: Status.ACTIVE, permissions: [permission1, permission3]};
        await createRole(role1).then();
        await createRole(role2).then();
        await createRole(role3).then();

        let passwordService = new passwordService();
        const passwordHash = passwordService.hashPassword('123');
        const user1: IUser = {
            email: 'user1@gmail.com',
            nickname: 'user1',
            password: passwordHash,
            status: Status.NEW,
            role: role1,
            token: token1
        };
        const user2: IUser = {
            email: 'user2@gmail.com',
            nickname: 'user2',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role2,
            token: token1
        };
        const user3: IUser = {
            email: 'user3@gmail.com',
            nickname: 'user3',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role3,
            token: token2
        };
        const user4: IUser = {
            email: 'user4@gmail.com',
            nickname: 'user4',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role1,
            token: token1
        };
        await createUser(user1).then();
        await createUser(user2).then();
        await createUser(user3).then();
        await createUser(user4).then();
    }



    private removeStore(): void {
        Token.remove({}, function() {

        });
        Permission.remove({}, function() {

        });
        Role.remove({}, function() {

        });
        User.remove({}, function() {

        });
    }
}

export default Seeder;
