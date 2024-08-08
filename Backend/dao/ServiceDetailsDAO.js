const { mongodb, ObjectId } = require('mongodb');
let ServiceDetails;
let Summary;

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

    try {
        Summary = await conn.db(process.env.MOVIEREVIEWS_COLLECTION).collection('Summary');
        console.log('Connected to Summary colelction')
      } catch (e) {
        console.error(`Unable to connect to ServiceRequest collection: ${e}`);
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
      return { ...serviceRequest, _id: result.insertedId.toString() }; // return the created document
    } catch (error) {
      console.error('Error creating service request:', error);
      throw new Error(error.message);
    }
  }

  static async getServiceDetailsById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid service ID format');
    }

    try {
      const serviceDetails = await ServiceDetails.findOne({ _id: new ObjectId(id) });
      if (!serviceDetails) {
        throw new Error('Service request not found');
      }
      return serviceDetails;
    } catch (error) {
      console.error('Error fetching service details:', error);
      throw new Error(error.message);
    }
  }

  static async getSummaryByServiceId(serviceId) {
    if (!ObjectId.isValid(serviceId)) {
      throw new Error('Invalid service ID format');
    }

    try {
      const summaryDetails = await Summary.findOne({ serviceId: new ObjectId(serviceId) });
      if (!summaryDetails) {
        throw new Error('Summary not found');
      }
      return summaryDetails;
    } catch (error) {
      console.error('Error fetching summary details:', error);
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

  static async addSummary({ serviceId, address, pricePerHour }) {
    try {
      const summary = {
        serviceId: new ObjectId(serviceId), // Ensure the ID is an ObjectId
        address,
        pricePerHour,
      };
      const result = await Summary.insertOne(summary);
      return { ...summary, _id: result.insertedId.toString() }; // Return the created summary document
    } catch (error) {
      console.error('Error adding summary:', error);
      throw new Error(error.message);
    }
  }
}

module.exports = ServiceDetailsDAO;
