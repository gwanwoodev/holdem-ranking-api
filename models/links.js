import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linksSchema = new Schema({
    imagePath: String,
    imageTarget: Number,
    imageLocate: String,
});

export default mongoose.model("links", linksSchema);