import { ICreateArticleDTO } from "../dtos/ICreateArticleDTO";
import { Article } from "../infra/mongoose/entities/Article";

interface IArticlesRepository {
    create({
        featured,
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        publishedAt,
        launches,
        events,
    }: ICreateArticleDTO): Promise<Article>;

    findById(id: string): Promise<Article>;

    findByTitle(title: string): Promise<Article>;

    deleteArticle(id: string): Promise<void>;

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
    }: Article): Promise<Article>;

    listArticle(): Promise<Article[]>;
}

export { IArticlesRepository };
