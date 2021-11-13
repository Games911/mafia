import express from 'express';
import * as AuthController from '../../controllers/auth/auth-controller';
import { User } from '../../../database/models/auth/user';
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const user: User = await AuthController.signup(req.body.email, req.body.nickname, req.body.password);
        res.status(201).json({
            response: {token: user.token.hash, id: user._id}
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

export default router;
