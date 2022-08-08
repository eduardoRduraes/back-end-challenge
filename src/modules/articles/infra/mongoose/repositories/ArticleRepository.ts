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

    async findById(id: string): Promise<IArticle> {
        const article = await this.data.findById({ _id: id });
        return article as IArticle;
    }

    async findByTitle(title: string): Promise<IArticle> {
        const article: IArticle = (await this.data.findOne({
            title,
        })) as IArticle;
        return article;
    }

    async deleteArticle(id: string): Promise<void> {
        await this.data.deleteOne({ _id: id });
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

    async listArticle(): Promise<IArticle[]> {
        const articles: IArticle[] = await this.data.find();

        const articleMap = articles.map((a) =>
            ArticleMap.toDTO(a as IArticleProps)
        );

        return articleMap;
    }
}

export { ArticleRepository };
