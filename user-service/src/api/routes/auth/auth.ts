import express from "express";
import * as AuthController from "../../controllers/auth/auth-controller";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await AuthController.invoke();
        res.status(200).json({
            message: "Test",
            test: result
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

export default router;
