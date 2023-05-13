const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=> {
    try {
        res.send([global.food_data,global.food_category]);
        console.log(global.food_data)
    } catch (error) {
        console.log("error:",error);
        res.send("server error")
        
    }
})

module.exports=router;