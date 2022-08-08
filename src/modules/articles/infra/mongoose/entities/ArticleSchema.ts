import mongoose from "mongoose";

import { IArticle } from "./IArticle";

const ArticleSchema = new mongoose.Schema<IArticle>(
    {
        id: {
            type: String,
            require: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
        imageUrl: {
            type: String,
            require: true,
        },
        newsSite: {
            type: String,
            require: true,
        },
        summary: {
            type: String,
            require: true,
        },
        publishedAt: {
            type: String,
            default: Date.now().toString(),
            require: true,
        },
        launches: {
            type: [Array],
            require: false,
        },
        events: {
            type: [Array],
            require: false,
        },
    },
    {
        timestamps: true,
    }
);

const ArticleModel = mongoose.model<IArticle>("articles", ArticleSchema);

export { ArticleModel };
