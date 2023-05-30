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
const userRoutes = require("./Routes/user");
const productRoutes = require("./Routes/product");
const categoryRoutes = require("./Routes/category");
const reviewRoutes = require("./Routes/review");
const requestRoutes = require("./Routes/request");


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",productRoutes);
app.use("/api",categoryRoutes);
app.use("/api",reviewRoutes);
app.use("/api",requestRoutes);


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

