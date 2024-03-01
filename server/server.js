import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = 9000;
import router from "./router/auth-router.js"; //importing router from auth-router
import db from "./utils/db.js";
import errorMiddleware from "./middleware/error.js";
import cors from "cors";

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(errorMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.json()); //to alow json data transfer
app.use("/",router); // tellin server that we are using router MOUNTING ROUTE 



db().then(()=>{
    //listening
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log(err);
})




// app.get("/", (req, res) => {
//     res.status(200).send("Hello World! from Home");
// })
// app.get("/signup", (req, res) => {
//     res.status(200).send("Hello World! from signup");   
// })
// app.get("/login", (req, res) => {
//     res.status(200).send("Hello World! from login");
// })