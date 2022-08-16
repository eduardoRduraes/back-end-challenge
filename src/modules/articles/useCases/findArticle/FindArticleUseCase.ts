import { IArticle } from "@modules/articles/infra/mongoose/entities/IArticle";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class FindArticleUseCase {
    constructor(
        @inject("ArticleRepository")
        private readonly articleRepository: IArticlesRepository
    ) {}

    async execute(id: string): Promise<IArticle> {
        const article = await this.articleRepository.findById(id);

        if (!article) {
            throw new AppError("Article not found");
        }

        return article;
    }
}

export { FindArticleUseCase };
