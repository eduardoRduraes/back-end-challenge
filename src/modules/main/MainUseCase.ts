class MainUseCase {
    async execute(): Promise<string> {
        const year = new Date();

        const message = `<body style="margin: 25rem auto; align-items: center;">
            <h1 style="text-align: center; font-family: 'Roboto', sans-serif">Fullstack Challenge ${year.getFullYear()} 🏅 - <strong style="color:blue">Space Flight News</strong></h1>
        </body>`;

        return message;
    }
}

export { MainUseCase };
