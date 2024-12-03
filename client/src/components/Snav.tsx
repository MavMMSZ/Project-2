import { Link } from 'react-router-dom';
import '../styles/Snav.css';
//this is the nav for those logged into the app
export default function Snav() {
    return (
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
        </div>
    )
}