import { exec } from "child_process";
import cron from "node-cron";

import connect from "../mongoose";
import { app } from "./app";

const server = app.listen(3333, async () => {
    console.log("Server is running!");
    await connect();
    cron.schedule("30 11 * * *", async () => {
        const node = exec("node migrate.js");
        node.stdout?.on("data", (data) => {
            console.log(`stdout: ${data.toString()}`);
        });

        node.stderr?.on("data", (data) => {
            console.log(`stderr: ${data.toString()}`);
        });

        node.on("error", (error) => {
            console.log(error);
        });
        node.on("exit", () => {
            console.log("exit");
            process.exit(1);
        });
    });
});

export { server };
