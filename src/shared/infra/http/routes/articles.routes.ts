import { CreateArticleController } from "@modules/articles/useCases/createArticle/CreateArticleController";
import { DeleteArticleController } from "@modules/articles/useCases/deleteArticle/DeleteArticleController";
import { FindArticleController } from "@modules/articles/useCases/findArticle/FindArticleController";
import { ListArticleController } from "@modules/articles/useCases/listArticle/ListArticleController";
import { UpdateArticleController } from "@modules/articles/useCases/updateArticle/UpdateArticleController";
import { Router } from "express";

const articlesRoutes = Router();

const createArticleController = new CreateArticleController();
const deleteArticleController = new DeleteArticleController();
const listArticleController = new ListArticleController();
const updateArticleController = new UpdateArticleController();
const findArticleController = new FindArticleController();

articlesRoutes.post("/", createArticleController.handle);
articlesRoutes.get("/", listArticleController.handle);
articlesRoutes.put("/:id", updateArticleController.handle);
articlesRoutes.get("/:id", findArticleController.handle);
articlesRoutes.delete("/:id", deleteArticleController.handle);

export { articlesRoutes };
