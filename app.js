const express = require("express");
const app = express();

const port =  8000  ;

 //Starting a Server
app.get("/",(req,res) =>{
    return res.send("get req");
})


 app.listen(port,() =>{
     console.log(`app is running at ${port}`);
 });
