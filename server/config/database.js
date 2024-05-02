const mongoose = require("mongoose");
require("dotenv").config();
const password=encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_URL = `mongodb+srv://devansh2706:${password}@cluster0.s4ovg3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
};
