import { ICreateArticleDTO } from "modules/articles/dtos/ICreateArticleDTO";

import { Article } from "../../infra/mongoose/entities/Article";
import { IArticlesRepository } from "../IArticlesRepository";

class ArticleRepositoryInMemory implements IArticlesRepository {
    private articles: Article[] = [];

    async create({
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
        const data = Object.assign(new Article(), {
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

        this.articles = [data, ...this.articles];
        return data;
    }

    async findByTitle(title: string): Promise<Article> {
        return this.articles.find((article) => article.title === title);
    }

    async findById(id: string): Promise<Article> {
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
    }: Article): Promise<Article> {
        const index = this.articles.findIndex((f) => f.id === id);

        const data = Object.assign(new Article(), {
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
        });

        this.articles[index] = data;
        return data;
    }

    async listArticle(): Promise<Article[]> {
        return this.articles;
    }
}

export { ArticleRepositoryInMemory };
