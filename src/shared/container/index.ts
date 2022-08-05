import { ArticleRepository } from "@modules/articles/infra/mongoose/repositories/ArticleRepository";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { container } from "tsyringe";

container.registerSingleton<IArticlesRepository>(
    "ArticleRepository",
    ArticleRepository
);
