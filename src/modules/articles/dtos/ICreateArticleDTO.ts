import { IProperties } from "./IProperties";

interface ICreateArticleDTO {
    featured: boolean;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    launches?: IProperties[];
    events?: IProperties[];
}

export { ICreateArticleDTO };
