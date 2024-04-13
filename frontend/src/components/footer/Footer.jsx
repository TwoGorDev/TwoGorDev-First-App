import { useLocation } from 'react-router-dom';

// styles
import './Footer.css'

export default function () {
  const location = useLocation();

  const footerClass =
		location.pathname === '/' ? 'home-footer' : 'footer'

  return (
    <footer className={footerClass}>
        <span>Copyright &copy; {(new Date().getFullYear())}  HealThyBody Inc.</span>
    </footer>
  )
}