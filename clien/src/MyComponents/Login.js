import React,{useState} from 'react'
import signup from '../image/signup.jpg'
import { NavLink, useHistory } from 'react-router-dom';

const Login = () => {
    let history = useHistory();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const loginUser = async (e)=> {
        e.preventDefault();
        
        
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const data = res.json();
        if(res.status===400 || !data){
            window.alert('Invalid Credentials')
        }else{
            window.alert('Login Successfull')

            history.push('/')
        }


    }
    return (
        <>
            <section className="signin">
                <div className="container mt-5">
                    <div className="signin-container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure>
                                    <img src={signup} alt="image" />
                                </figure>
                                <NavLink to='/login' className="signin-image-link">I am already Registered</NavLink>
                            </div>
                        </div>
                        <div className="signin-form">
                            <h3 className="form-title">Log In</h3>
                            <form method="POST" className="register-from" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={email}
                                    onChange ={(e)=>setEmail(e.target.value)} placeholder="Your Email" />
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value="password"
                                    onChange ={(e)=>setPassword(e.target.value)} placeholder="New Password" />
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={password} 
                                    onChange={(e)=>{setPassword(e.target.value)}}placeholder="New Password" />
                                </div> 
                                 
                                <div className=" form-button">
                                    <button type="submit" className="btn btn-primary my-2" onClick={loginUser}>Register</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login
