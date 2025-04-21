const mongoose = require("mongoose");

async function connectMongoDB(mongoURL) {
    return mongoose.connect(mongoURL);
}

module.exports = {
    connectMongoDB,
};