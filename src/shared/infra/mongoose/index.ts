import mongoose from "mongoose";

// eslint-disable-next-line no-multi-assign
const db = (process.env.NODE_ENV = "test" ? "space_test" : "spacenews");

const uri = `mongodb://localhost:27017/${db}`;

mongoose.connect(uri);

mongoose.Promise = global.Promise;

export async function disconnectMongo(): Promise<void> {
    await mongoose.disconnect();
}

export { mongoose };
