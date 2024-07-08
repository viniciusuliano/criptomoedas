import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import './header.modules.css'
export function Header(){
    return(
        <header className='container_header'>
            <Link to='/'>
            <img src={logo} alt="logo" />
            </Link>
        </header>
    )
}