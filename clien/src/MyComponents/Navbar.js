import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <> 
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">laishram's</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" activeClassName = "nav_active" to="/">Home <span class="sr-only"></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName = "nav_active" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName = "nav_active" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName = "nav_active" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName = "nav_active" to="/signup">Signup</NavLink>
                        </li>
                        
                    </ul>
                </div>
            </nav>   
        </>
    )
}

export default Navbar
