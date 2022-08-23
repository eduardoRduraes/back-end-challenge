import { exec } from "child_process";
import cron from "node-cron";

import connect from "../mongoose";
import { app } from "./app";

const server = app.listen(3333, async () => {
    console.log("Server is running!");
    await connect();
    cron.schedule("5 16 * * *", async () => {
        const node = exec("node migrate.js");
        console.log("script");
        node.stdout?.on("data", (data) => {
            process.stdout.write(`stdout: ${data.toString()}`);
        });

        node.stderr?.on("data", (data) => {
            process.stdout.write(`stderr: ${data.toString()}`);
        });

        node.on("error", (error) => {
            console.log(error);
        });

        node.on("close", () => {
            process.stdout.write("exit");
        });
    });
});

export { server };
