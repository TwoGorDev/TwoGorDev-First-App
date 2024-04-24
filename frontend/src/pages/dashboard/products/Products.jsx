// styles
import './Products.css';

// components
import ProductsTable from '../../../components/productsTable/ProductsTable';

// utilities
import { useEffect, useState, useContext } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import Loader from '../../../components/loader/Loader';
import { ProductsContext } from '../../../contexts/ProductsContext';

export default function Products() {
	const { products, setEndpoint } = useContext(ProductsContext);
	const [query, setQuery] = useState('');

	// Debouncing search query
	const debouncedQuery = useDebounce(query, 500);

	// Fetch products from the server on component mount
	useEffect(() => {
		if (debouncedQuery) {
			setEndpoint(`/products/search/${debouncedQuery}`);
		} else {
			setEndpoint('/products');
		}
	}, [debouncedQuery]);

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
