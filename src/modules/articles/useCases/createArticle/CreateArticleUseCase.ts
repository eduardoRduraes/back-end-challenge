import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IArticle } from "@modules/articles/infra/mongoose/entities/IArticle";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateArticleUseCase {
    constructor(
        @inject("ArticleRepository")
        private readonly articleRepository: IArticlesRepository
    ) {}

    async execute({
        featured,
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        publishedAt,
        launches,
        events,
    }: ICreateArticleDTO): Promise<IArticle> {
        const isExists = await this.articleRepository.findByTitle(title);

        if (isExists) {
            throw new AppError("Article already exists!");
        }

        const article = await this.articleRepository.create({
            featured,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            launches,
            events,
        });

        return article;
    }
}

export { CreateArticleUseCase };
