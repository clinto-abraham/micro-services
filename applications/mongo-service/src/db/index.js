'use strict';

const { default: mongoose } = require('./mongoose');

const connectDB = async () => {
  try {
    const localDB = 'mongodb://127.0.0.1:27017/event_management';
    console.log(process.env.MONGO_URI, 'process.env.MONGO_URI');
    await mongoose.connect(localDB, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // stop app if DB fails
  }
};

// Optional connection listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

module.exports = connectDB;
