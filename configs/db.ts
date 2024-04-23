const { mongoose } = require("mongoose");

const connectToDB = async () => {
    try {
        if (mongoose.connection[0].readyState) {
            return true
        } else {
            await mongoose.connect("mongoose://localhost:27017/next-auth");
        }
    } catch (error) {
        console.error('DB connection error:', error);
    }
}