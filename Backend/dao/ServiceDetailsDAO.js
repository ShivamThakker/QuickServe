const mongodb = require('mongodb');
let ServiceDetails;

class ServiceDetailsDAO {
  static async injectDB(conn) {
    if (ServiceDetails) {
      console.log("ServiceDetails Collection present")
      return; // Collection already initialized
    }
    try {
      // Connect to the ServiceDetails collection
      ServiceDetails = await conn.db(process.env.MOVIEREVIEWS_COLLECTION).collection('ServiceDetails');
      console.log("Connected to ServiceDetails collection");
    } catch (e) {
      console.error(`Unable to connect to ServiceDetails collection: ${e}`);
    }
  }


  static async createServiceRequest({ service, city, date, time, userId }) {
    try {
      // Create a new service request
      const serviceRequest = {
        service,
        city,
        date,
        time,
        userId,
      };
      const result = await ServiceDetails.insertOne(serviceRequest);
      return { ...serviceRequest, _id: result.insertedId }; // return the created document
    } catch (error) {
      console.error('Error creating service request:', error);
      throw new Error(error.message);
    }
  }

  static async getServiceSummaries(userId) {
    try {
      // Query for service requests by userId
      const serviceRequests = await ServiceDetails.find({ userId }).toArray();
      return serviceRequests;
    } catch (error) {
      console.error('Error retrieving service requests:', error);
      throw new Error(error.message);
    }
  }
}

module.exports = ServiceDetailsDAO;
