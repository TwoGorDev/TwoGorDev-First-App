import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
	return (
		<>
			<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='/account' element={<Account />} />

							<Route path='dashboard' element={<DashboardLayout />}>
								<Route index element={<Dashboard />} />
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
