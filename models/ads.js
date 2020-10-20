import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adsSchema = new Schema({
    seoul: [{profile: String, name: String, location: String}],
    busan: [{profile: String, name: String, location: String}],
    daegu: [{profile: String, name: String, location: String}],
    incheon: [{profile: String, name: String, location: String}],
    gwangju: [{profile: String, name: String, location: String}],
    daejeon: [{profile: String, name: String, location: String}],
    ulsan: [{profile: String, name: String, location: String}],
    sejong: [{profile: String, name: String, location: String}],
    gyeonggi: [{profile: String, name: String, location: String}],
    kangwon: [{profile: String, name: String, location: String}],
    chungbuk: [{profile: String, name: String, location: String}],
    chungnam: [{profile: String, name: String, location: String}],
    jeonbuk: [{profile: String, name: String, location: String}],
    jeonnam: [{profile: String, name: String, location: String}],
    gyeongbuk: [{profile: String, name: String, location: String}],
    gyeongnam: [{profile: String, name: String, location: String}],
    jaeju: [{profile: String, name: String, location: String}],

});

export default mongoose.model("ads", adsSchema);