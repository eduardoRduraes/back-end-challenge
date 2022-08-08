import { IProperties } from "@modules/articles/dtos/IProperties";
import mongoose from "mongoose";

interface IArticle extends mongoose.Document {
    id: string;
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
