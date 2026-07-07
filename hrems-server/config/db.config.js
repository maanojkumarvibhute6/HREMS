import mongoose from "mongoose";

export const mongodb_server = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: 'HREMS'
        });
        console.log(`Success: MongoDB server connected on http://${connect.connection.host}:${connect.connection.port}`);
        
    } catch (error) {
        console.log(`Failed: MongoDB server connection failure: ${error.message}`);
        process.exit(1);
    }
}