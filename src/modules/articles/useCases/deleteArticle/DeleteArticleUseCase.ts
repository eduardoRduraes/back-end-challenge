import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IResponse {
    message: string;
    status: number;
}

@injectable()
class DeleteArticleUseCase {
    constructor(
        @inject("ArticleRepository")
        private readonly articleRepository: IArticlesRepository
    ) {}

    async execute(id: string): Promise<IResponse> {
        const isExists = await this.articleRepository.findById(id);

        if (!isExists) {
            throw new AppError("Article is not exists!");
        }

        await this.articleRepository.deleteArticle(id);

        return {
            message: "Article delete success!",
            status: 200,
        };
    }
}

export { DeleteArticleUseCase };
