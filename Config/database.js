const mongoose = require('mongoose')

const connectDatabase = async () =>{
    try{
     await mongoose.connect(process.env.DB_LOCAL_URI)
        console.log(`mongoDb is connect to the host : ${mongoose.connection.host}`)
    } catch(error){
          console.log("DataBase Connection error", error);
          throw error;
    }
}

module.exports = connectDatabase;