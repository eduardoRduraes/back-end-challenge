import mongoose from "mongoose";

const uri =
    process.env.NODE_ENV === "docker"
        ? `mongodb://database:27017/db`
        : `mongodb://localhost:27017/db`;

mongoose.Promise = global.Promise;

async function connect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        process.exit(1);
    }
}

export default connect;
