import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "@shared/infra/http/app";

const makeFakeListArticles = [
    {
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
    },
    {
        title: "NASA to Host Briefings to Preview Artemis I Moon Mission 2",
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
    },
    {
        title: "NASA to Host Briefings to Preview Artemis I Moon Mission 3",
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
    },
];

describe("ListArticleController", () => {
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

    it("should be able returns articles list saved", async () => {
        await request(app).post("/article").send(makeFakeListArticles[0]);
        await request(app).post("/article").send(makeFakeListArticles[1]);
        await request(app).post("/article").send(makeFakeListArticles[2]);

        const response = await request(app).get("/article");

        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].id);
        expect(response.body).toHaveLength(3);
    });

    it("should be able returns error message if is not find saved articles", async () => {
        const response = await request(app).get("/article");
        expect(response.body.message).toBe(
            "There are no articles registered in the database!"
        );
        expect(response.status).toBe(400);
    });
});
