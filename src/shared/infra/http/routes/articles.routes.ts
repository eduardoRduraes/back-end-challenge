import { CreateArticleController } from "@modules/articles/useCases/createArticle/CreateArticleController";
import { Router } from "express";

const articlesRoutes = Router();

const createArticleController = new CreateArticleController();

articlesRoutes.post("/", createArticleController.handle);

export { articlesRoutes };
