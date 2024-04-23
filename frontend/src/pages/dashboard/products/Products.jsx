// styles
import './Products.css';

// components
import ProductsTable from '../../../components/productsTable/ProductsTable';

// utilities
import useDataApi from '../../../hooks/useDataApi';
import { useEffect, useState, useRef } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import Loader from '../../../components/loader/Loader';

export default function Products() {
	const { getData } = useDataApi();
	const [products, setProducts] = useState([]);
	const [query, setQuery] = useState('');
	const firstRender = useRef(true);

	// Debouncing search query
	const debouncedQuery = useDebounce(query, 500);

	// Fetch products from the server on component mount
	useEffect(() => {
		// Fetching function
		const fetch = async (endpoint) => {
			const products = await getData(endpoint);
			setProducts(products);
		}

		// Prevent double data fetch
		if (firstRender.current) {
			firstRender.current = false;
			return
		}

		// Fetch data from the server on every change in user's search bar input
		if (debouncedQuery) {
			fetch(`/products/search/${debouncedQuery}`)
		} else {
			fetch('/products');
		}
	}, [debouncedQuery])

	return (
		<div className='products'>
			{products.length > 0 ?
				<>
					<input
						className='search-bar'
						type='text'
						placeholder='Search products...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<ProductsTable products={products}/>
				</>
			: 
				<Loader />
			}
		</div>
	);
}
