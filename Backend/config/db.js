const { MongoClient } = require('mongodb');

let dbConnection;

const connectDB = async () => {
  if (!dbConnection) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
      await client.connect();
      dbConnection = client.db(process.env.DB_NAME);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      throw error;
    }
  }
  return dbConnection;
};

module.exports = { connectDB };
