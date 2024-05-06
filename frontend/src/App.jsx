// Styles
import './App.css';

// Pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/dashboard/products/Products';
import Calculator from './pages/dashboard/calculator/Calculator';
import Profile from './pages/account/profile/Profile';
import Settings from './pages/account/settings/Settings';
import ContactUs from './pages/account/contactUs/ContactUs';

// Layouts
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';
import AccountLayout from './layouts/AccountLayout';

// Utilities & Hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

// Contexts
import { UserAuthContext } from './contexts/UserAuthContext';
import { SummaryContext } from './contexts/SummaryContext';

function App() {
	// External logic/state
	const { isLoggedIn } = useContext(UserAuthContext);
	const { date } = useContext(SummaryContext);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>

						<Route index element={isLoggedIn ? <Navigate to={`/dashboard?date=${date}`} /> : <Home />} />

						<Route path='login' element={isLoggedIn ? <Navigate to={`/dashboard?date=${date}`}/> : <Login />} />
						
						<Route path='register' element={isLoggedIn ? <Navigate to={`/dashboard?date=${date}`}/> : <Register />} />
						
						<Route path='dashboard' element={!isLoggedIn ? <Login /> : <DashboardLayout />}>
							<Route index element={<Dashboard />}/>
							<Route path="products" element={<Products />} />
							<Route path="calculator" element={<Calculator />} />
						</Route>

						<Route path='account' element={!isLoggedIn ? <Login /> : <AccountLayout />}>
							<Route path='profile' element={<Profile />} />
							<Route path='settings' element={<Settings />} />
							<Route path='contactus' element={<ContactUs />} />
						</Route>

					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
