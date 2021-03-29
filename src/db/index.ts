import * as mongoose from 'mongoose';
import config from '../config';

// mongoose returns a promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoose.uri, {
            // options that must be added to avoid warnings in the console
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err);
        process.exit(1); // 1 means failure
    }
}

export default connectDB;