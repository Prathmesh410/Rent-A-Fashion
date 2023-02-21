require("dotenv").config();
const express = require("express");
const app = express();
const port =  8000  ;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//imports
const authRoutes = require("./Routes/auth");


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api",authRoutes);


//Database Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() =>{
    console.log("DB Connected")
}).catch(() => {
    console.log("DB not Connected")
});


 //Starting a Server
 app.listen(process.env.PORT,() =>{
     console.log(`app is running at ${port}`);
 });

