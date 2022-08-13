import { MainController } from "@modules/main/MainController";
import { MainUseCase } from "@modules/main/MainUseCase";
import { Router } from "express";

import { articlesRoutes } from "./articles.routes";

const router = Router();

const mainUseCase = new MainUseCase();
const mainController = new MainController(mainUseCase);

router.use("/articles", articlesRoutes);

router.use("/", (request, response) =>
    mainController.handle(request, response)
);
export { router };
