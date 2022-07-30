import { IArticlesRepository } from "../../repositories/IArticlesRepository";

interface IResponse {
    message: string;
    status: number;
}

class DeleteArticleUseCase {
    constructor(private readonly articleRepository: IArticlesRepository) {}

    async execute(id: string): Promise<IResponse> {
        const isExists = await this.articleRepository.findById(id);

        if (!isExists) {
            throw new Error("Article is not exists!");
        }

        await this.articleRepository.deleteArticle(id);

        return {
            message: "Article delete success!",
            status: 200,
        };
    }
}

export { DeleteArticleUseCase };
