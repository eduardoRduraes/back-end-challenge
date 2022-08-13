import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "@shared/infra/http/app";

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

describe("Create Article Controller", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    beforeEach(async () => {
        await mongoose.connection.dropCollection("articles");
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it("should be able to create a new article", async () => {
        const response = await request(app)
            .post("/articles")
            .send(makeFakeArticle);

        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(201);
    });

    it("should not be able to create a new article if already exists", async () => {
        await request(app).post("/articles").send(makeFakeArticle);
        const response = await request(app)
            .post("/articles")
            .send(makeFakeArticle);

        expect(response.body.message).toBe("Article already exists!");
        expect(response.status).toBe(400);
    });
});
