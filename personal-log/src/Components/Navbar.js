import { Link } from 'react-router-dom';
import './navbar.css'
export default function NavBar(){
    return(
        <nav>
            <span className='navbar'><Link to='/'>Home</Link></span>
            <span className='navbar'><Link to='/logs'>Logs</Link></span>
        </nav>
    )
}