import { Outlet } from 'react-router-dom';

// components
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

// layout

export default function Layout() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
