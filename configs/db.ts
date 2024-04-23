const mongoose = require('mongoose');

const connectToDB = async () => {
    const url = "mongodb://root:zjDnLGwajh1hzVSL4CrnYKwn@makalu.liara.cloud:34721/my-app?authSource=admin"
    try {
        await mongoose.connect(url);
        return mongoose.connection;
    } catch (error) {
        console.error('DB connection error:', error);
    }
}

export default connectToDB