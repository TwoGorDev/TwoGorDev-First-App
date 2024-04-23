import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// utilities
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<UserAuthContextProvider>
		<App />
	</UserAuthContextProvider>
);
