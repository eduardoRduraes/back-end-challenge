/* eslint-disable @typescript-eslint/ban-types */
import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { Article } from "@modules/articles/infra/mongoose/entities/ArticleSchema";
import request from "supertest";

import { app } from "@shared/infra/http/app";
import { server } from "@shared/infra/http/server";

describe("Create Article Controller", () => {
    beforeEach(async () => {
        await Article.deleteMany();
    });

    afterAll(async () => {
        await Article.db.close();
        await server.close();
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

    it("should be able to create a new article", async () => {
        const response = await request(app)
            .post("/article")
            .send(makeFakeArticle);

        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(201);
    });
});
