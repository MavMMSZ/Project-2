import { Link } from 'react-router-dom';
import '../styles/Snav.css';
import AuthService from '../utils/auth';
//this is the nav for those logged into the app
export default function Snav() {
    return (
<<<<<<< HEAD
        <div>
        <ul >
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/readlist">Read List</Link>
            </li> 
            <li>
                <Link to="/wantlist">Want to Read</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
          </li>
        </ul>
=======
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
>>>>>>> f34b7ee5a4755f5f0886f3b4a59ff0d44420a46b
        </div>
    )
}