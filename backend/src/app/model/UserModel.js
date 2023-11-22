import mongoose from "mongoose";
const Schema = mongoose.Schema;
import moment from "moment-timezone";
const time = moment
    .tz(Date.now(), "Asia/Ho_Chi_Minh")
    .format("DD-MM-YYYY HH:mm:ss");

const UserShema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    admin: { type: Boolean, default: false },
    email: { type: String, unique: true, require: true },
    createdAt: { type: String, default: time },
    updatedAt: { type: String, default: time },
});
export default mongoose.model("UserShema", UserShema);
