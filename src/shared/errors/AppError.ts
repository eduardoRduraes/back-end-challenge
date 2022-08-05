class AppError extends Error {
    readonly message: string;
    readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { AppError };
