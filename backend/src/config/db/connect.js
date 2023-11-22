import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("SUCCESS");
    } catch (error) {
        console.log("ERROR");
    }
}

export default connect;
