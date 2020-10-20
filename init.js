import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";



const PORT = 4000;
const handleListening = () => console.log(`Listening on http://localhost:${PORT}`);


/* Mongoose Connect */
const connection = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => console.log(err));


/* Server Start */
app.listen(PORT, handleListening);

