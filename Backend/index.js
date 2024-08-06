const mongodb = require('mongodb')
const dotenv = require('dotenv')
const app = require('./server.js')
const UserDAO = require('./dao/UserDAO.js');
const ServiceDAO = require('./dao/ServiceDAO.js');
const ServiceDetailsDAO = require('./dao/ServiceDetailsDAO.js')


async function main(){
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )

    const port = process.env.PORT || 5001;

    try{console.log('Attempting to connect to MongoDB...');
        await client.connect();
    
        await UserDAO.injectDB(client);
    
        await ServiceDAO.injectDB(client);

        await ServiceDetailsDAO.injectDB(client);
    

        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

module.exports = app;