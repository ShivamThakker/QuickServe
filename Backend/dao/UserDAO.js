// UserDAO.js
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;

let users;

class UserDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.MOVIEREVIEWS_COLLECTION).collection('users');
    } catch (e) {
      console.error(`Unable to connect to users collection: ${e}`);
    }
  }

  // UserDAO.js or wherever your DAO logic is

  static async createUser(userInfo) {
    try {
      const { name, phoneNumber, email, service, hourlyRate, photo } = userInfo;
      const newUser = {
        name,
        phoneNumber,
        email,
        service,
        hourlyRate,
        photo,
      };
      // Use the insertOne method
      const result = await users.insertOne(newUser);
      
      // Retrieve the inserted document using the insertedId
      const insertedUser = await users.findOne({ _id: result.insertedId });
      
      return insertedUser;
    } catch (e) {
      console.error(`Unable to create user: ${e}`);
      throw e;
    }
  }

  static async getAllUsers() {
    try {
      return await users.find({}).toArray();
    } catch (error) {
      console.error("Error retrieving all users: ", error);
      throw error; // Rethrow after logging to handle it further up the call stack
    }
  }

  static async getUsers() {
    // const db = await connectDB();
    try {
      const userList = await users.find().toArray();
      return userList;
    } catch (e) {
      console.error(`Unable to get users: ${e}`);
      throw e;
    }
  }
}

module.exports = UserDAO;