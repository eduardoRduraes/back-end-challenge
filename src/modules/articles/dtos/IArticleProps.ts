import { ObjectId } from "mongoose";

import { IProperties } from "./IProperties";

interface IArticleProps {
    _id: ObjectId;
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

export { IArticleProps };
