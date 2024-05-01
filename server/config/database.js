const mongoose = require("mongoose");
require("dotenv").config();
const password=encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_URL = `mongodb+srv://devansh2706:${password}@cluster0.s4ovg3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("DB Connected Successfully"))
        .catch((error) => {
            console.log("DB Connection Failed");
            console.error(error);
            process.exit(1);
        })
};