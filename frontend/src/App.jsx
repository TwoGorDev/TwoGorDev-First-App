// styles
import './App.css';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/account/Account';
import Products from './pages/dashboard/products/Products';
import Calculator from './pages/dashboard/calculator/Calculator';

// layouts
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';

// utilities
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from './contexts/UserAuthContext';
import getFormattedDate from './utilities/getFormattedDate';

function App() {
	const { userToken } = useContext(UserAuthContext);
	const currentDate = getFormattedDate(new Date());

	return (
		<>
			<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={userToken ? <Navigate to={`/dashboard/${currentDate}`} /> : <Home />} />
							<Route path='login' element={userToken ? <Navigate to={`/dashboard/${currentDate}`}/> : <Login />} />
							<Route path='register' element={userToken ? <Navigate to={`/dashboard/${currentDate}`}/> : <Register />} />
							<Route path='/account' element={!userToken ? <Login /> : <Account />} />

							<Route path='dashboard' element={!userToken ? <Login /> : <DashboardLayout />}>
								<Route path=':date' element={<Dashboard />}/>
								<Route path="products" element={<Products />} />
								<Route path="calculator" element={<Calculator />} />
							</Route>

						</Route>
					</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
