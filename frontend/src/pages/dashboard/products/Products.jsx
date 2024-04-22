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
	const { data, getData } = useDataApi();
	const [query, setQuery] = useState('');
	const firstRender = useRef(true);

	// Debouncing search query
	const debouncedQuery = useDebounce(query, 500);

	// Fetch products from the server on component mount
	useEffect(() => {
		// Prevent double data fetch
		if (firstRender.current) {
			firstRender.current = false;
			return
		}

		// Fetch data from the server on every change in user's search bar input
		if (debouncedQuery) {
			getData(`/products/search/${debouncedQuery}`)
		} else {
			getData('/products');
		}
	}, [debouncedQuery])

	return (
		<div className='products'>
			{data.length > 0 ?
				<>
					<input
						className='search-bar'
						type='text'
						placeholder='Search products...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<ProductsTable products={data}/>
				</>
			: 
				<Loader />
			}
		</div>
	);
}
