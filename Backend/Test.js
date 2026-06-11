require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");

// Force Node to use Google's DNS for resolving names
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!");
    } catch (err) {
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error(err);
    }
}

test();