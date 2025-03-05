const mongoose = require('mongoose')

const connectDatabase = async () =>{
    try{
     await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,  // Ensure TLS is enabled
            serverSelectionTimeoutMS: 5000,  // Timeout after 5s if no response
            socketTimeoutMS: 45000,
   });
        console.log(`mongoDb is connect to the host : ${mongoose.connection.host}`)
    } catch(error){
          console.log("DataBase Connection error", error);
          throw error;
    }
}

module.exports = connectDatabase;