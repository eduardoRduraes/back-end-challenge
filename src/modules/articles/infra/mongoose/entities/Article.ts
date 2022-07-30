import { IProperties } from "modules/articles/dtos/IProperties";
import { v4 as uuidV4 } from "uuid";

class Article {
    id: string;
    featured: boolean;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    launches?: IProperties[];
    events?: IProperties[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Article };
