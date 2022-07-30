import { IArticlesRepository } from "../../repositories/IArticlesRepository";

class ListArticleUseCase {
    constructor(private readonly articleRepository: IArticlesRepository) {}

    async execute() {
        const response = await this.articleRepository.listArticle();

        return response;
    }
}

export { ListArticleUseCase };
