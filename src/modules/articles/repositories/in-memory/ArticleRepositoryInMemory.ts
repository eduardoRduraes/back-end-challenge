import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IArticle } from "@modules/articles/infra/mongoose/entities/IArticle";

import { IArticlesRepository } from "../IArticlesRepository";

class ArticleRepositoryInMemory implements IArticlesRepository {
    private articles: IArticle[] = [];

    async create({
        id,
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
        const data: IArticle = {
            id,
            featured,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            launches,
            events,
        };

        this.articles = [data, ...this.articles];
        return data;
    }

    async findByTitle(title: string): Promise<IArticle> {
        return this.articles.find((article) => article.title === title);
    }

    async findById(id: string): Promise<IArticle> {
        return this.articles.find((article) => article.id === id);
    }

    async deleteArticle(id: string): Promise<void> {
        const index = this.articles.findIndex((f) => f.id === id);
        this.articles.slice(index, 1);
    }

    async updateArticle({
        id,
        featured,
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        publishedAt,
        launches,
        events,
    }: IArticle): Promise<IArticle> {
        const index = this.articles.findIndex((f) => f.id === id);

        const data = {
            id,
            featured,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            launches,
            events,
        };

        this.articles[index] = data;
        return data;
    }

    async listArticle(): Promise<IArticle[]> {
        return this.articles;
    }
}

export { ArticleRepositoryInMemory };
