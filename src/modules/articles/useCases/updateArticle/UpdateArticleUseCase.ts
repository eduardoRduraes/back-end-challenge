import { IProperties } from "@modules/articles/dtos/IProperties";
import { IArticle } from "@modules/articles/infra/mongoose/entities/IArticle";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    featured: boolean;
    launches: IProperties[];
    events: IProperties[];
}

@injectable()
class UpdateArticleUseCase {
    constructor(
        @inject("ArticleRepository")
        private readonly articleRepository: IArticlesRepository
    ) {}

    async execute(data: IRequest): Promise<IArticle> {
        const isExists = await this.articleRepository.findById(data.id);

        if (!isExists) {
            throw new AppError("Article is not exists!");
        }

        const article = await this.articleRepository.updateArticle(
            data as IArticle
        );

        return article;
    }
}

export { UpdateArticleUseCase };
