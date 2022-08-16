import { IArticleProps } from "@modules/articles/dtos/IArticleProps";
import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";

import { ArticleModel } from "../entities/ArticleSchema";
import { IArticle } from "../entities/IArticle";
import { ArticleMap } from "../mapper/ArticleMap";

class ArticleRepository implements IArticlesRepository {
    private data: typeof ArticleModel;

    constructor() {
        this.data = ArticleModel;
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
        const article: IArticleProps = await this.data.create({
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

    async findById(id: string): Promise<IArticle | null> {
        const article = await this.data.findById({
            _id: id,
        });

        if (!article) return null;

        return ArticleMap.toDTO(article);
    }

    async findByTitle(title: string): Promise<IArticle | null> {
        const article = await this.data.findOne<IArticle | null>({
            title,
        });

        if (!article) return null;

        return ArticleMap.toDTO(article as IArticleProps);
    }

    async deleteArticle(id: string): Promise<void> {
        await this.data.findByIdAndDelete({ _id: id });
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
        const article = await this.data.findOneAndUpdate(
            { _id: id },
            {
                featured,
                title,
                url,
                imageUrl,
                newsSite,
                summary,
                publishedAt,
                launches,
                events,
            },
            {
                returnDocument: "after",
            }
        );

        return ArticleMap.toDTO(article as IArticleProps);
    }

    async listArticle(limit: number, skip: number): Promise<IArticle[]> {
        const articles: IArticle[] = await this.data
            .find()
            .sort({ publishedAt: -1 })
            .limit(limit as number)
            .skip(skip as number);

        const articleMap = articles.map((a) =>
            ArticleMap.toDTO(a as IArticleProps)
        );

        return articleMap;
    }
}

export { ArticleRepository };
