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
    }): IArticle {
        const article = instanceToInstance({
            id: _id,
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

export { ArticleMap };
