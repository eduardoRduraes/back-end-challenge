import { Router } from "express";

import { articlesRoutes } from "./articles.routes";

const router = Router();

router.use("/article", articlesRoutes);

export { router };
