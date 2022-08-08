import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IProperties } from "@modules/articles/dtos/IProperties";
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

describe("UpdateArticleController", () => {
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

    it("should be able to find and update data from a article in the database by id", async () => {
        const article = await request(app)
            .post("/article")
            .send(makeFakeArticle);

        makeFakeArticle.title =
            "Soyus to Host Briefings to Preview Artemis I Moon Mission 1";

        makeFakeArticle.events = [
            {
                id: "65896761-b6ca-4df3-9399-e177a360c52a",
                provider: "Launch Library 3",
            },
            ...(makeFakeArticle.events as IProperties[]),
        ];

        const response = await request(app)
            .put(`/article/${article.body.id}`)
            .send(makeFakeArticle);

        expect(response.body.title).toBe(
            "Soyus to Host Briefings to Preview Artemis I Moon Mission 1"
        );
        expect(response.body.events).toHaveLength(2);
    });
});
