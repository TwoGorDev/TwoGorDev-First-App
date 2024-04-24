import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// utilities
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx'
import { ProductsContextProvider } from './contexts/ProductsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<UserAuthContextProvider>
		<ProductsContextProvider>
			<App />
		</ProductsContextProvider>
	</UserAuthContextProvider>
);
