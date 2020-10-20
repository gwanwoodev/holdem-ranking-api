import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const adsSchema = new Schema({
    idx: Number,
    location: String,
    profile: String,
    name: String,
});

adsSchema.plugin(autoIncrement.plugin, {
    model: "ads",
    field: "idx",
    startAt: 1,
    increment: 1
});

export default mongoose.model("ads", adsSchema);