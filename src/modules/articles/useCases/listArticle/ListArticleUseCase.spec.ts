import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { ArticleRepositoryInMemory } from "@modules/articles/repositories/in-memory/ArticleRepositoryInMemory";
import { v4 as uuidV4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

import { ListArticleUseCase } from "./ListArticleUseCase";

describe("List Article", () => {
    let articleRepositoryInMemory: ArticleRepositoryInMemory;
    let listArticleUseCase: ListArticleUseCase;

    beforeEach(() => {
        articleRepositoryInMemory = new ArticleRepositoryInMemory();
        listArticleUseCase = new ListArticleUseCase(articleRepositoryInMemory);
    });

    const makeFakeListArticles: ICreateArticleDTO[] = [
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

    it("should be able to list Articles register", async () => {
        await articleRepositoryInMemory.create(makeFakeListArticles[0]);
        await articleRepositoryInMemory.create(makeFakeListArticles[1]);
        await articleRepositoryInMemory.create(makeFakeListArticles[2]);

        const response = await listArticleUseCase.execute();

        expect(response).toHaveLength(3);
        expect(response[1]).toBeTruthy();
        expect(response[1]).toHaveProperty("id");
    });

    it("should be able returns error if not there is register articles", async () => {
        await expect(listArticleUseCase.execute()).rejects.toThrow(AppError);
    });
});
