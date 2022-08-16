import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Find Article Controller", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    const makeFakeArticle: ICreateArticleDTO = {
        title: "NASA to Host Briefings to Preview Artemis I Moon Mission",
        url: "http://www.nasa.gov/press-release/nasa-to-host-briefings-to-preview-artemis-i-moon-mission",
        imageUrl:
            "https://www.nasa.gov/sites/default/files/thumbnails/image/52200283798_d6ea9d7db6_k.jpeg?itok=UJgfcgGg",
        newsSite: "NASA",
        summary:
            "NASA will host a pair of briefings on Wednesday, Aug. 3, and Friday, Aug. 5, to preview the upcoming Artemis I lunar mission.",
        publishedAt: "2022-07-27T22:10:00.000Z",
        featured: false,
        launches: [
            {
                id: "65896761-b6ca-4df3-9699-e077a360c52a",
                provider: "Launch Library 2",
            },
        ],
        events: [
            {
                id: "65896761-b6ca-4df3-9399-e077a360c52a",
                provider: "Launch Library 1",
            },
        ],
    };

    it("should be able to find an article by id", async () => {
        const response = await request(app)
            .post("/articles")
            .send(makeFakeArticle);

        const article = await request(app).get(`/articles/${response.body.id}`);

        expect(article.body).toBeTruthy();
        expect(article.body).toHaveProperty("id");
        expect(article.body.id).toBe(response.body.id);
        expect(article.status).toBe(201);
    });
});
