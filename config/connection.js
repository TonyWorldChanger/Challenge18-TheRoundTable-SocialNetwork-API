const { connect, connection } = require("mongoose");

const connectionString = 
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Challenge18-TheRoundTable-SocialNetwork-API";

    connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    module.exports = connection;