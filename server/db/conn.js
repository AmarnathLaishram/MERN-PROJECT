const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    // This is to prevent deprecationWarning 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify:false 
}).then(()=>{
    console.log(`Connection Successfull`)
}).catch((err)=>console.log(`No Connection`));