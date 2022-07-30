import { ICreateArticleDTO } from "modules/articles/dtos/ICreateArticleDTO";
import { Article } from "modules/articles/infra/mongoose/entities/Article";
import { IArticlesRepository } from "modules/articles/repositories/IArticlesRepository";

class CreateArticleUseCase {
    constructor(private readonly articleRepository: IArticlesRepository) {}

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
    }: ICreateArticleDTO): Promise<Article> {
        const isExists = await this.articleRepository.findByTitle(title);

        if (isExists) {
            throw new Error("Article already exists!");
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
