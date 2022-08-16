import { ICreateArticleDTO } from "../dtos/ICreateArticleDTO";
import { IArticle } from "../infra/mongoose/entities/IArticle";

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
    }: ICreateArticleDTO): Promise<IArticle>;

    findById(id: string): Promise<IArticle | null>;

    findByTitle(title: string): Promise<IArticle | null>;

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
    }: IArticle): Promise<IArticle>;

    listArticle(limit: number, skip: number): Promise<IArticle[]>;
}

export { IArticlesRepository };
