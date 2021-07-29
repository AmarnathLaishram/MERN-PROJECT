import React,{useEffect,useState} from 'react';
import amar from '../image/amar.jpg';
import {useHistory} from 'react-router-dom';

const About = () => {
    const history = useHistory();
    const [userData,setUserData] = useState({})
    const callAboutPage = async()=>{
        try{
            const res =  await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"

            });
            
            const data = await res.json();
            console.log(data);

            setUserData(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
            history.push('/login')

        }
    }
    useEffect(() => {
        callAboutPage();
    }, []);
    return (
        <>
            <div className="emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-3 offset-lg-1">
                            <div className="profile-img">
                                <img src={userData.name=="Thoithoi Laishram"?amar:"no image"} alt="no image" />
                            </div>
                        </div>

                        <div className="col-md-5 ">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>Web Developer</h6>
                                <p className="profile-rating mt-3 mb-5">RANKINGS: <span>1/10</span> </p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" id="home-tab" aria-controls="home"  data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item"> 
                                        <a className="nav-link" aria-current="page" id="profile-tab" aria-controls="profile" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" value="Edit Profile" />
                        </div>
                    </div>
                    <div className="row">
                        {/* left side url  */}
                        <div className="col-md-3 offset-lg-1">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="https://touch.facebook.com/home.php">Facebook</a> <br />
                                <a href="https://www.instagram.com/?hl=en">Instagram</a> <br />
                                <a href="https://www.youtube.com/">Youtube</a> <br />
                                <a href="">Youtube</a> <br />
                            </div>
                        </div>
                        {/* right side data toggle  */}
                        <div className="col-md-7 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row"> 
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>67890234</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Contact</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>67890234</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Student</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Work</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>web Development</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Language</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>JavaScript</p>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6">
                                            <label>Project</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>MIT Website</p>
                                        </div>
                                    </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About
