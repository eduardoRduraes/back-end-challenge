import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { ArticleRepositoryInMemory } from "@modules/articles/repositories/in-memory/ArticleRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

describe("Update Article", () => {
    let articleRepositoryInMemory: ArticleRepositoryInMemory;
    let updateArticleUseCase: UpdateArticleUseCase;

    beforeEach(() => {
        articleRepositoryInMemory = new ArticleRepositoryInMemory();
        updateArticleUseCase = new UpdateArticleUseCase(
            articleRepositoryInMemory
        );
    });

    const makeFakeArticle = (): ICreateArticleDTO => ({
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
    });

    const makeFakeArticleUpdate = {
        id: "",
        title: "NASA to Host Briefings to Preview Artemis I Moon Mission 1",
        url: "http://www.nasa.gov/press-release/nasa-to-host-briefings-to-preview-artemis-i-moon-mission",
        imageUrl:
            "https://www.nasa.gov/sites/default/files/thumbnails/image/52200283798_d6ea9d7db6_k.jpeg?itok=UJgfcgGg",
        newsSite: "NASA",
        summary:
            "NASA will host a pair of briefings on Wednesday, Aug. 3, and Friday, Aug. 5, to preview the upcoming Artemis I lunar mission.",
        publishedAt: "2022-07-30T22:08:20.000Z",
        featured: true,
        launches: [],
        events: [],
    };

    it("should be able to update article", async () => {
        const { id } = await articleRepositoryInMemory.create(
            makeFakeArticle()
        );

        makeFakeArticleUpdate.id = id;

        const response = await updateArticleUseCase.execute(
            makeFakeArticleUpdate
        );

        expect(response).toHaveProperty("id");
    });

    it("should not be able update if article is not exists", async () => {
        await expect(
            updateArticleUseCase.execute(makeFakeArticleUpdate)
        ).rejects.toThrow(AppError);
    });
});
