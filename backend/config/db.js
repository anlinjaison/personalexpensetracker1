const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_tracker';
    console.log(`[Database] Connecting to MongoDB...`);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000, // Timeout after 8s instead of hanging
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Could not connect to MongoDB: ${error.message}`);
    console.error(`[Database Tip] Check your MONGO_URI in backend/.env or your network/IP whitelist in MongoDB Atlas.`);
    // We do not call process.exit(1) directly so server stays up and can return informative error responses to API callers
    return null;
  }
};

module.exports = connectDB;
