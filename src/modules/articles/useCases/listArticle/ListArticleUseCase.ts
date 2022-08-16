import { IArticle } from "@modules/articles/infra/mongoose/entities/IArticle";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListArticleUseCase {
    constructor(
        @inject("ArticleRepository")
        private readonly articleRepository: IArticlesRepository
    ) {}

    async execute(limit: number, skip: number): Promise<IArticle[]> {
        const response = await this.articleRepository.listArticle(limit, skip);

        if (response.length <= 0) {
            throw new AppError(
                "There are no articles registered in the database!"
            );
        }

        return response;
    }
}

export { ListArticleUseCase };
