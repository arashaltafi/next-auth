const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return true
        } else {
            const db = await mongoose.connect("mongodb://root:4bcDTWAyN7WfPUBIlinc6LlR@makalu.liara.cloud:30837/my-app?authSource=admin", {
                useNewUrlParser: true,
            });
            console.log('Connected to MongoDB');
            return db.connection;
        }
    } catch (error) {
        console.error('DB connection error:', error);
    }
}

export default connectToDB