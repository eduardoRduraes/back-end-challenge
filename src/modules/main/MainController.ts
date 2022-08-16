import { Request, Response } from "express";

import { MainUseCase } from "./MainUseCase";

class MainController {
    constructor(private mainUseCase: MainUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const message = await this.mainUseCase.execute();
        return response.status(200).send(message);
    }
}

export { MainController };
