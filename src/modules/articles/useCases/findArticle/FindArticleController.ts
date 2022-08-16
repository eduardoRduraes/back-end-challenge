import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindArticleUseCase } from "./FindArticleUseCase";

class FindArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findArticleUseCase = container.resolve(FindArticleUseCase);

        const article = await findArticleUseCase.execute(id);

        return response.status(201).json(article);
    }
}

export { FindArticleController };
