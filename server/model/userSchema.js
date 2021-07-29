const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');;
const userSchema = new mongoose.Schema({
    // Mongoose component   
    name : {
        type: String,
        required:true,
    },
    email : {
        type: String,
        required:true,
    },
    phone : {
        type: Number,
        required:true,
    },
    work : {
        type: String,
        required:true,
    },
    password : {
        type: String,
        required:true,
    },
    cpassword : {
        type: String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    messages:[
        {
            name : {
                type: String,
                required:true,
            },
            email : {
                type: String,
                required:true,
            },
            phone : {
                type: Number,
                required:true,
            },
            message:{
                type:String,
                required:true,
            }


        }
    ],
    tokens :[
        {
            token:{
                type:String,
                required:true,
            }    
        
        }
    ]

});

// we are hashing the password
// this is an instance of mongoose which define all the datas so we will use this for hashing  
userSchema.pre('save', async function (next){
    console.log('Hi from inside')
    // the pre before 'save' defines this functions should be performed before saving 
    if(this.isModified('password')){
        // so this password means the password given by the user a present should be hashed
        // 12 is the number of rounds to be hased 
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    // since it is a middleware 
    next();

});

// We are generating a token 
// token is used for authentication of the personal page 
userSchema.methods.generateAuthToken = async function (){
    try{
        // jwt has two function one is the sign function for authenticating the id given by the user and the id already saved in the database
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
        // the this tokens is th array where we will conacat the object token to it 
        this.tokens = this.tokens.concat({token: token});
        // so this is the token array which is saved to the mongoose database 
        await  this.save();
        // this return token do that we can get it inside the root we called in auth section 
        return token;
    }catch(err){
        console.log(err)

    }
}
// storing the message 
// so the argument passed by the addMessage should be accepted here as parameter in the function 
userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        // so in this.message we add the value of the name,email,phone,message 
        this.messages=this.messages.concate({name,email,phone,message})
        // so the this is saved here 
        await this.save();
        // we should return something if we call anything outside the function 
        return this.messages;
    }catch(error){
        console.log(error)
    }

}



const User = mongoose.model('USER',userSchema);

module.exports = User;