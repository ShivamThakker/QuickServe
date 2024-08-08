// const ServiceRequest = require('../models/ServiceRequest');
const mongodb = require('mongodb')
const ServiceSeeker = require('../models/ServiceSeeker')
let ServiceRequest;

class ServiceDAO {
  static async injectDB(conn) {
    if (ServiceRequest) {
      console.log("ServiceRequest Collection present")
      return;
    }
    try {
      ServiceRequest = await conn.db(process.env.MOVIEREVIEWS_COLLECTION).collection('ServiceRequest');
    } catch (e) {
      console.error(`Unable to connect to ServiceRequest collection: ${e}`);
    }

    
  }

  static async findServiceSeekerByGoogleId(googleId) {
    try {
      // Find the service seeker by googleId
      const user = await ServiceRequest.findOne({ googleId: String(googleId) });
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }


  static async createServiceSeeker({ googleId, name, email, picture }) {
    try {
      // Create a new service seeker
      const serviceseeker = new ServiceSeeker({
        googleId,
        name,
        email,
        picture,
      });
      const result = await ServiceRequest.insertOne(serviceseeker);
      // const insertedUser = await ServiceRequest.findOne({googleId: result.insertedId });
      
      return serviceseeker;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }


//  Methods above this are currently in use


  static async getServiceRequestsByUserId(userId) {
    try {
      const serviceRequests = await ServiceRequest.find({ user: userId }).toArray();
      return serviceRequests;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = ServiceDAO;
