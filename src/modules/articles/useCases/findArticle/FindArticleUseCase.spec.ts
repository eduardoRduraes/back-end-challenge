import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { ArticleRepositoryInMemory } from "@modules/articles/repositories/in-memory/ArticleRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { FindArticleUseCase } from "./FindArticleUseCase";

describe("Find Article UseCase", () => {
    let articleRepositoryInMemory: ArticleRepositoryInMemory;
    let findArticleUseCase: FindArticleUseCase;

    beforeEach(() => {
        articleRepositoryInMemory = new ArticleRepositoryInMemory();
        findArticleUseCase = new FindArticleUseCase(articleRepositoryInMemory);
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
        const { id } = await articleRepositoryInMemory.create(makeFakeArticle);

        const response = await findArticleUseCase.execute(id);

        expect(response).toHaveProperty("id");

        expect(response.title).toBe(
            "NASA to Host Briefings to Preview Artemis I Moon Mission"
        );
    });

    it("should be able to return an alert if the article is not found", async () => {
        await expect(
            findArticleUseCase.execute("e6d29059116e4539b9eab179b6709fc5")
        ).rejects.toEqual(new AppError("Article not found"));
    });
});
