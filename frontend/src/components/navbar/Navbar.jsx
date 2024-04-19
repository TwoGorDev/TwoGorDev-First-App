import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react'

// styles
import './Navbar.css';


export default function Navbar() {
  const location = useLocation();
  const [navMobileActive, setNavMobileActive] = useState(false);

  const navClass = ['/', '/register', '/login'].includes(location.pathname)? 'home-nav' : 'nav';

  return (
    <nav className={navClass}>
      <div className="hamburger" onClick={() => setNavMobileActive(prevState => !prevState)}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
      <ul className='nav-list wrapper'>
        <li className='logo'>
          <Link className='logo-link' to='/'>
            HealThyBody
          </Link>
        </li>
        
          <>
            <li>
              <NavLink className='nav-link' to='dashboard'>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='account'>
                Account
              </NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='register'>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='login'>
                Login
              </NavLink>
            </li>
          </>
        
      </ul>
    </nav>
  );
}