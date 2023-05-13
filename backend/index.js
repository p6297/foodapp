
const express = require("express");
const app = express();
const mongoDB = require("../backend/db");
mongoDB();
const port = process.env.MY_PORT;
app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested.With, Content-Type, Accept"
    );
    next();
})


app.use(express.json());


app.get("/",(req,res)=> {
    res.send("<h1>Hi, partha</h1>");
});


app.use("/api",require("./routes/createUser"))
app.use("/api",require("./routes/DisplayData"))



app.listen(5000,()=> {
    console.log(`server is Uunning on 5000`);
})