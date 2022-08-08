import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

class UpdateArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            featured,
            launches,
            events,
        } = request.body;

        const updateArticleUseCase = container.resolve(UpdateArticleUseCase);

        const res = await updateArticleUseCase.execute({
            id,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            featured,
            launches,
            events,
        });

        return response.status(201).json(res);
    }
}

export { UpdateArticleController };
