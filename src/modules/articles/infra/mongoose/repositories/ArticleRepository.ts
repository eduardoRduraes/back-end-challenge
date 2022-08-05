import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";

import { Article } from "../entities/ArticleSchema";
import { IArticle } from "../entities/IArticle";
import { ArticleMap } from "../mapper/ArticleMap";

class ArticleRepository implements IArticlesRepository {
    private data;

    constructor() {
        this.data = Article;
    }

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
    }: ICreateArticleDTO): Promise<IArticle> {
        const article = await this.data.create({
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

        return ArticleMap.toDTO(article);
    }

    async findById(id: string): Promise<IArticle> {
        const article = await this.data.findById({ _id: id });
        return article;
    }

    async findByTitle(title: string): Promise<IArticle> {
        const article: IArticle = await this.data.findOne({ title });
        return article;
    }

    async deleteArticle(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateArticle({
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
        throw new Error("Method not implemented.");
    }

    async listArticle(): Promise<IArticle[]> {
        const articles: IArticle[] = await this.data.find();
        return articles;
    }
}

export { ArticleRepository };
