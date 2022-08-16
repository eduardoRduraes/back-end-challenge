import "dotenv/config";
import mongoose from "mongoose";

const docker = process.env.DOCKER_URI as string;
const localhost = process.env.LOCALHOST_URI as string;
const remote = process.env.REMOTE_URI as string;

const uri = process.env.NODE_ENV === "docker" ? docker : localhost;

mongoose.Promise = global.Promise;

async function connect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        process.exit(1);
    }
}

export default connect;
