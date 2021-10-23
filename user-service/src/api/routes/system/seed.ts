import express from "express";
import Seeder from "../../../database/seeds/seeder";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const seed = await new Seeder();
        await seed.start();
        res.status(200).json({
            result: 'Success'
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

export default router;
