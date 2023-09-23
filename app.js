import express from "express";
import mongoose from 'mongoose';
import { router } from "./routes/user-routes";
import { blogRouter } from "./routes/blog-routes";
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://admin:os8LFtUwkwJHDuVV@cluster0.94duaj8.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(port))
    .then(() => {
        console.log("connected to database and listening on port : " + port)
    })
    .catch((err) => {
        console.log(err)
    })





// password mgdb = os8LFtUwkwJHDuVV