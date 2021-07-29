import React from 'react';
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <>
           <div id="notfound">
               <div className="notfound">
                   <div className="notfound-404">
                       <h1>404</h1>
                   </div>
                   <h2>We are sorry page not found !</h2>
                   <p className="mb-5">The page you are looking for might be removed had its name change or is temporarily unavailable
                   </p>
                   <NavLink to="/">Back to Home page</NavLink>
               </div>
            </div> 
        </>
    )
}

export default Errorpage
