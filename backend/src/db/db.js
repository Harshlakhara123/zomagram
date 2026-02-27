const mongoose = require("mongoose");


function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("mongodb connected");
        })
        .catch((err) => {
            console.error("mongodb not connected:", err);
        })
}
module.exports = connectDB;