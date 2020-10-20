import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);


const userSchema = new Schema({
    idx: Number,
    rank: Number,
    name: String,
    age: Number,
    location: String,
    profile: String,
    records: [{year: String, rally: String, record: String, money: Number}],
});

userSchema.plugin(autoIncrement.plugin, {
    model: "user",
    field: "idx",
    startAt: 1,
    increment: 1
});

export default mongoose.model("user", userSchema);