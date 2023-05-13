const express = require("express");
const mongoose = require("mongoose");
const mongo_URI =
  "mongodb+srv://username:password@cluster0.cnjdrby.mongodb.net/partha?retryWrites=true&w=majority";

//db connected and read data
const mongoDB = async () => {
  await mongoose.connect(
    mongo_URI,
    { useNewUrlParser: true },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("DB connected Successfully!");
        const fetched_data = await mongoose.connection.db.collection(
          "food_data"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const food_category = await mongoose.connection.db.collection("food_categories");
          food_category.find({}).toArray(function(err,catData){
            if (err) {
              console.log(err);
            } else {
              global.food_data = data;
              global.food_category=catData;
            }


          })

         
        });
      }
    }
  );
};

module.exports = mongoDB;
