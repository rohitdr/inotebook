const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?tls=false"
const connectToMongo =  ()=>{
 
         mongoose.connect((mongoURI),()=>{
            console.log("connected")
        })

    
   
}
module.exports =connectToMongo;