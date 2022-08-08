import connect from "../mongoose";
import { app } from "./app";

const server = app.listen(3333, async () => {
    console.log("Server is running!");
    await connect();
});

export { server };
