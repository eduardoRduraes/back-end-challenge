import { IProperties } from "@modules/articles/dtos/IProperties";

interface IArticle {
    id?: string;
    featured?: boolean;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    launches?: IProperties[];
    events?: IProperties[];
}

export { IArticle };
