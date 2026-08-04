import { Router, type IRouter } from "express";
import healthRouter from "./health";
import badgesRouter from "./badges";

const router: IRouter = Router();

router.use(healthRouter);
router.use(badgesRouter);

export default router;
