import { Link } from 'react-router-dom';
import '../styles/Snav.css';
import AuthService from '../utils/auth';
//this is the nav for those logged into the app
export default function Snav() {
    return (
        <div className='sidenav'>
            <ul >
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
            </ul>
        </div>
    )
}