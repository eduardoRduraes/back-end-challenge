import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListArticleUseCase } from "./ListArticleUseCase";

interface IQueryProps {
    limit: number;
    skip: number;
}

class ListArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { limit, skip } = request.query as unknown as IQueryProps;

        const listArticleUseCase = container.resolve(ListArticleUseCase);

        const articles = await listArticleUseCase.execute(limit, skip);

        return response.status(201).json(articles);
    }
}

export { ListArticleController };
