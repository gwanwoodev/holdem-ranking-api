import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linksSchema = new Schema({
    imagePath1: String,
    imagePath2: String,
    imagePath3: String,
    imagePath4: String,
    imagePath5: String,
});

export default mongoose.model("links", linkSchema);