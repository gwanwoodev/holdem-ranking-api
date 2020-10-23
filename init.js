import "@babel/polyfill";
import app from "./app";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = 8001;
const handleListening = () => console.log(`Listening on http://localhost:${PORT}`);

/* Mongoose Connect */
const connection = mongoose.connect("mongodb+srv://gwanwoodev:t1BHNZHRC0RSYOW1@cluster0.0g4io.mongodb.net/holdem?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => console.log(err));

/* Server Start */
app.listen(PORT, handleListening);

