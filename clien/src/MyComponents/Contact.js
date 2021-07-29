import React,{useEffect,useState} from 'react'

const Contact = () => {
    const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""}); 
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"  
                },

            });

            const data = await res.json();
            console.log(data);

            setUserData({ ...userData, name:data.name, email:data.email, phone:data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        userContact();
    }, []);

    const handleInputs = (e)=>{
        const name = e.target.name;
        const value = e.target.value; 
    
        setUserData({ ...userData,[name]:value});
    }  

    // send user data from contact to the backend 
    const contactForm = async (e)=>{
        e.preventDefault();
        const{name, email,phone,message} = userData;

        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name,email,phone,message
            })
        });
        const data  = await res.json();

        if(!data){
            console.log("Message not send")
        }else{
            alert("Message sent");
            setUserData({...userData,message:""})
        }


    }

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            {/* phone number  */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        phone
                                    </div>
                                    <div className="contact_info_text">
                                        +1111 4563 6789
                                    </div>
                                </div>

                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        address
                                    </div>
                                    <div className="contact_info_text">
                                        Nambol,Manipur
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-between align-items-center">
                                <i class="zmdi zmdi-email"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        email
                                    </div>
                                    <div className="contact_info_text">
                                        amarnathlaishram101@gmail.com
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* contactUS form  */}
            <div className="contact_form mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 offset-md-3">
                            <div className="contact_form_container py-10">
                                <div className="contact_form_title py-1 ">
                                    Get In Touch
                                </div>
                                <form method = "POST" id="contact_form">
                                    <div className="contact_form_name d-flex ">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" name="name" value={userData.name} onChange={handleInputs} 
                                        placeholder="Your Name" required="true" />
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" name="email" value={userData.email} onChange={handleInputs} placeholder="Your Email" required="true" />
                                        <input type="number" id="contact_form_name" className="contact_form_name input_field" name="phone" value={userData.phone} onChange={handleInputs}  placeholder="Your Number" required="true" />
                                    </div>
                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field conatct_form_message"  name="message"value={userData.message} onChange={handleInputs}  placeholder="Your Opinion" cols="80" rows="5" required="true"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="btn btn-primary my-3" onClick={contactForm} >Send Message</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;
