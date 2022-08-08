import { IArticleProps } from "@modules/articles/dtos/IArticleProps";
import { instanceToInstance } from "class-transformer";

import { IArticle } from "../entities/IArticle";

class ArticleMap {
    static toDTO({
        _id,
        featured,
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        publishedAt,
        launches,
        events,
    }: IArticleProps): IArticle {
        const article = instanceToInstance({
            id: _id.toString(),
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

        return article as IArticle;
    }
}

export { ArticleMap };
