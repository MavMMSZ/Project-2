import { Link } from 'react-router-dom';

//this is the nav for those logged into the app
export default function Snav() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/readlist">Read List</Link>
            <Link to="/wantlist">Want to Read</Link>
            <Link to="/Login">Login</Link>
        </div>
    )
}