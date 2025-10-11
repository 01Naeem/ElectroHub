const mongoose = require('mongoose');

const dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ ElectroHubDataBase Connected Successfully!`)
    } catch (error) {
        console.error(`❌ MongoDB connection error: `, error);
        process.exit(1);
    }
}

module.exports = dataBaseConnection;
