import React ,{useState} from 'react'
import signup from '../image/signup.jpg'
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
    const history=useHistory();
    const [user, setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    });
    let name,value;
    const handleInputs = (e)=>{
        console.log(e);
        name=e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});

    }
    const PostData = async (e) =>{
        e.preventDefault(); 

        //  object destructuring 
        const{name,email, phone, work, password, cpassword} = user;
         
        // here we are using the fetch function to fetch data from react to the database 
        // so the root './register' is from the server having localhost 5000 so we will be using proxy at package.json to let the web know that if the root of the server is not given go the proxy which is given at package .json 
        // but if we dont want to use proxy then we can just write the whole root at the fetcg part then CORS policy error will appear 
        const res = await fetch('/register',{
            method:"POST",
            // here we are defining the data header and body just like we did in the postman 
            headers:{
                "Content-Type":"application/json"
            },
            // everything in the web must be in string so we must convert the json into string 
            body:JSON.stringify({
                name,email, phone, work, password, cpassword
            })
        });
        // here we are checking if we go the data correctly or not 
        const data = await res.json();
        // this are the error we get in the datbase section 
        if(res.status===422|| !data){
            window.alert("Invalid Registrartion");
            console.log("Invalid");
        }else{
            window.alert("Regstration Successfull");
            console.log("Regstration Successfull");

            history.push('/login')
        }
    }
    return (
        <>
           <section className = "signup">
               <div className = "container mt-5">
                   <div className="signup-content">
                       <h3 className = "form-title">Sign Up</h3>
                       <div className="signup-form d-flex">
                           <form method="POST" className="register-from" id="register-form">
                               <div className="form-group">
                                   <label htmlFor="name">
                                   <i class="zmdi zmdi-account"></i>
                                   </label>
                                   <input type="text" name="name" id="name" autoComplete = "off" value={user.name} onChange={handleInputs} placeholder = "Your Name" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="email">     
                                   <i class="zmdi zmdi-email"></i>
                                   </label>
                                   <input type="email" name="email" id="email" autoComplete = "off" value={user.email} onChange={handleInputs} placeholder = "Your Email" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="phone">
                                        <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                   </label>
                                   <input type="number" name="phone" id="phone" autoComplete = "off" value={user.phone} onChange={handleInputs} placeholder = "Your Contact" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="work">
                                        <i class="zmdi zmdi-slideshow"></i>
                                   </label>
                                   <input type="text" name="work" id="work" autoComplete = "off" value={user.work} onChange={handleInputs} placeholder = "Your Profession" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                   </label>
                                   <input type="password" name="password" id="password" autoComplete = "off" value={user.password} onChange={handleInputs} placeholder = "New Password" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="cpassword">
                                        <i class="zmdi zmdi-lock"></i>
                                   </label>
                                   <input type="password" name="cpassword" id="cpassword" autoComplete = "off" value={user.cpassword} onChange={handleInputs} placeholder = "Confirm Your Password" />
                               </div>
                               <div className=" form-button">
                                   <button type = "submit" className = "btn btn-primary my-2" value = "register" onClick ={PostData} >Register</button>
                               </div>
                           </form>
                           <div className = "signup-image">
                               <figure>
                                   <img src={signup} alt="image" />
                               </figure>
                               <NavLink to='/login' className="signup-image-link">I am already Registered</NavLink>
                           </div>
                        </div> 
                   </div>
               </div>
           </section>
        </>
    )
}

export default Signup
