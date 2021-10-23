import express from "express";
import authController from "../../controllers/auth/auth-controller";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const authController = await new authController();
        res.status(200).json({
            message: "Test",
            test: authController.invoke()
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

export default router;
