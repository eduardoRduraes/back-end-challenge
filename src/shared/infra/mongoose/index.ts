import mongoose from "mongoose";

const uri = `mongodb://localhost:27017/spacenews`;

mongoose.Promise = global.Promise;

async function connect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        process.exit(1);
    }
}

export default connect;
