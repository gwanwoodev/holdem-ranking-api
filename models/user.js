import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    rank: Number,
    name: String,
    age: Number,
    location: String,
    profile: String,
    records: [{year: String, rally: String, record: String}],
    published_date: {type: Date, default: Date.now}
});

export default mongoose.model("user", userSchema);