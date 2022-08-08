import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteArticleUseCase } from "./DeleteArticleUseCase";

class DeleteArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteArticleUseCase = container.resolve(DeleteArticleUseCase);
        const message = await deleteArticleUseCase.execute(id as string);

        return response.status(201).json(message);
    }
}

export { DeleteArticleController };
