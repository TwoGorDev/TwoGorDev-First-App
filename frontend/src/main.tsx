// Main
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Contexts
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx';
import { ProductsContextProvider } from './contexts/ProductsContext.jsx';
import { SummaryContextProvider } from './contexts/SummaryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<UserAuthContextProvider>
		<ProductsContextProvider>
			<SummaryContextProvider>
				<App />
			</SummaryContextProvider>
		</ProductsContextProvider>
	</UserAuthContextProvider>
);
