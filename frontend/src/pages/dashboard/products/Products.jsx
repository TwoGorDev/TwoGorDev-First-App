// Styles
import './Products.css';

// Components, Icons & Images
import ProductsTable from '../../../components/productsTable/ProductsTable';
import Loader from '../../../components/loader/Loader';
import AddNewProductModal from '../../../components/addNewProductModal/AddNewProductModal';

// Utilities & Hooks
import { useEffect, useState, useContext } from 'react';
import useDebounce from '../../../hooks/useDebounce';

// Contexts
import { ProductsContext } from '../../../contexts/ProductsContext';

export default function Products() {
	// External logic/state
	const { products, isPending, setEndpoint } = useContext(ProductsContext);

	// Local logic/state
	const [query, setQuery] = useState('');
	const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] =useState(false);

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
			<div className='products-info-container'>
				<h3 className='products-info-heading'>
					{products.length > 0
						? 'Search for the desired product or create a new one'
						: 'Search for the product'}
				</h3>

				<div className='products-info-content'>
					<input
						className='products-table-search'
						type='text'
						placeholder='Search products...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					{products.length > 0 && (
						<>
							<div className='separating-line'></div>

							<button
								className='create-new-product-btn'
								onClick={() => setIsAddNewProductModalOpen(true)}>
								Create new product
							</button>
						</>
					)}
				</div>
			</div>
			{isPending ? (
				<Loader />
			) : (
				<ProductsTable
					products={products}
					setIsModalOpen={setIsAddNewProductModalOpen}
				/>
			)}
			{isAddNewProductModalOpen && (
				<AddNewProductModal
					isModalOpen={isAddNewProductModalOpen}
					setIsModalOpen={setIsAddNewProductModalOpen}
				/>
			)}
		</div>
	);
}
