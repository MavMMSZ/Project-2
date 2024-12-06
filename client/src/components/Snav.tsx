import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Snav.css';
import AuthService from '../utils/auth';

export default function Snav() {
    const user = AuthService.getUser(); 

    return (
        <div>
            <ul className='link'>
                <li>
                    <Link to="/" className='button'>Home</Link>
                </li>
                {AuthService.loggedIn() === false ?
                    "" : <>
                        <li>
                            <Link to="/readlist" className='button'>Read List</Link>
                        </li>
                        <li>
                            <Link to="/wantlist" className='button'>Want to Read</Link>
                        </li>
                    </>
                }
                {AuthService.loggedIn() === false ?
                    <li>
                        <Link to="/Login" className='button'>Login</Link>
                    </li>
                    :
                    <li>
                        <Link onClick={AuthService.logout} to="/Logout" className='button'>Logout</Link>
                    </li>
                }
                {AuthService.loggedIn() === false ?
                    <li>
                        <Link to="/Signup" className='button'>Register</Link>
                    </li> 
                    : ""
                }
                {/* Conditional render of "Welcome {user}" */}
                {AuthService.loggedIn() && user && (
                    <li className='welcome-message'>
                        Welcome, {user}!
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Snav;
