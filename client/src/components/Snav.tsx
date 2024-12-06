import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Snav.css';
import AuthService from '../utils/auth';

const Snav: React.FC = () => {
    const user = AuthService.getUser(); // Assuming there's a method to get user info

    return (
        <div className='sidenav-box'>
            <ul className='side-ul'>
                {/* Conditional render of "Welcome {user}" */}
                {AuthService.loggedIn() && user && (
                    <li className='welcome-message'>
                        Welcome, {user}
                    </li>
                )}
                <li>
                    <Link to="/">Home</Link>
                </li>
                {AuthService.loggedIn() === false ?
                    "" : <>
                        <li>
                            <Link to="/readlist">Read List</Link>
                        </li>
                        <li>
                            <Link to="/wantlist">Want to Read</Link>
                        </li>
                    </>
                }
                {AuthService.loggedIn() === false ?
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    :
                    <li>
                        <Link onClick={AuthService.logout} to="/Logout">Logout</Link>
                    </li>
                }
                {AuthService.loggedIn() === false ?
                    <li>
                        <Link to="/Signup">Register</Link>
                    </li> 
                    : ""
                }
            </ul>
        </div>
    );
}

export default Snav;
