class MainUseCase {
    async execute(): Promise<string> {
        const year = new Date();

        const message = `<body style="align-items: center; background-image: url('https://www.papeldeparede.etc.br/fotos/wp-content/uploads/shuttle_launch-wide.jpg'); background-repeat: no-repeat; background-position: center;">
            <h1 style="margin: 10rem auto; font-weight: bold; font-size: 3rem; text-align: center; color: white; font-family: 'Roboto', sans-serif;">Fullstack Challenge ${year.getFullYear()} 🏅- <strong style="color: #1E90FF">Space Flight News</strong></h1>
        </body>`;

        return message;
    }
}

export { MainUseCase };
