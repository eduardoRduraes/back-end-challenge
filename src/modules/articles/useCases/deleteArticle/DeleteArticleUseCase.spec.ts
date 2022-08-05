import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { ArticleRepositoryInMemory } from "@modules/articles/repositories/in-memory/ArticleRepositoryInMemory";

import { DeleteArticleUseCase } from "./DeleteArticleUseCase";

describe("Delete Article", () => {
    let articleRepositoryInMemory: ArticleRepositoryInMemory;
    let deleteArticleUseCase: DeleteArticleUseCase;

    beforeEach(() => {
        articleRepositoryInMemory = new ArticleRepositoryInMemory();
        deleteArticleUseCase = new DeleteArticleUseCase(
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

    it("should be able to delete a article is exists", async () => {
        const { id } = await articleRepositoryInMemory.create(
            makeFakeArticle()
        );

        const response = await deleteArticleUseCase.execute(id);

        expect(response.message).toBe("Article delete success!");
        expect(response.status).toBe(200);
    });

    it("should be able returns error if article is not exists!", async () => {
        await expect(deleteArticleUseCase.execute("id")).rejects.toThrow(Error);
    });
});
