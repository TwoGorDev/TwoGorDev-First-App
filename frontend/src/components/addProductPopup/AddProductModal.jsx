// styles
import './AddProductModal.css';

// icons
import { IoMdClose } from 'react-icons/io';
import { FaCircleMinus } from 'react-icons/fa6';

// components
import ProductsTable from '../productsTable/ProductsTable';
import Loader from '../loader/Loader';

// utilities
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getFormattedDate from '../../utilities/getFormattedDate';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import useDataApi from '../../hooks/useDataApi';
import useDebounce from '../../hooks/useDebounce';

export default function AddProductModal({ title, setIsAddProductModalOpen, mealId }) {
	const { isPending, error, data, getData, postData } = useDataApi();
	const [addedProducts, setAddedProducts] = useState([]);
	const [totalProductCalories, setTotalProductCalories] = useState([]);
	const [newPortions, setNewPortions] = useState([])
	const [query, setQuery] = useState('');
	const firstRender = useRef(true);
	const navigate = useNavigate();

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

	const totalAmountOfCalories = totalProductCalories.reduce(
		(acc, curr) => acc + curr,
		0
	);
  
	const addProduct = (product) => {
		setAddedProducts((prevProducts) => [...prevProducts, product]);
	};

	const removeProduct = (index) => {
		setAddedProducts((prevProducts) => {
			const newProducts = [...prevProducts];
			newProducts.splice(index, 1);
			return newProducts;
		});
		setTotalProductCalories((prevCalories) => {
			const newCalories = [...prevCalories];
			newCalories.splice(index, 1);
			return newCalories;
		});
	};

	const addDataToDatabase = async () => {
		// Define an empty variable to store new meal ID
		let newMealId;

		// Check if client received meal ID from the server during daily-summary fetch
		// if not - it means that meal is not created in the database yet
		// in that case, create new meal and save it's ID in the empty variable we defined
		if (mealId === 0) {
			const newMeal = {
				type: capitalizeFirstLetter(title),
				date: getFormattedDate(new Date())
			}

			const res = await postData('/meals', newMeal);
			newMealId = res.id;
		}
		
		// Map through new portions and add meal ID to each of them
		const newPortionsWithMealIds = newPortions.map(portion => {
			return {
				mealId: !mealId ? newMealId : mealId,
				...portion
			}
		})
		
		// Create new portions in the database
		await postData('/portions', newPortionsWithMealIds)
		
		// If there's no errors, refresh the page to refetch daily-summary with newly created data
		!error && navigate(0);
	}

	return (
		<div className='add-product-overlay'>
			<div className='product-modal-popup'>
				{data.length > 0 ? 
					<>
						<IoMdClose
							className='modal-close-icon serving-modal-close-icon'
							onClick={() => setIsAddProductModalOpen(false)}
						/>
						<h2 className='modal-title'>{capitalizeFirstLetter(title)}</h2>
						<p className='modal-choose-product-text'>
							Choose your product:
						</p>
						<div className='modal-products-container'>
							<div>
								<input
									className='search-bar'
									type='text'
									placeholder='Search products...'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								/>
								<ProductsTable
									addProduct={addProduct}
									setTotalProductCalories={setTotalProductCalories}
									setNewPortions={setNewPortions}
									products={data}
								/>
							</div>
							<div className='modal-added-products'>
								<h3 className='modal-added-products-title'>Added products: </h3>
								<ul className='added-products-list'>
									{addedProducts.length > 0 &&
										addedProducts.map((product, index) => (
											<li key={index} className='added-products-item'>
												<span className='added-product-item-name'>
													{product.name}
												</span>
												<span className='added-product-item-kcal'>
													{totalProductCalories[index]}kcal
												</span>
												<FaCircleMinus
													className='remove-product-icon'
													onClick={() => removeProduct(index)}
												/>
											</li>
										))}
								</ul>
								<p className='added-products-total-calories'>
									Calories in total: <br />{' '}
									<span>{totalAmountOfCalories} kcal</span>
								</p>
							</div>
						</div>
						<button 
						className='add-products-to-meal-btn'
						onClick={addDataToDatabase}
						>
							Add to {capitalizeFirstLetter(title)}
						</button>
					</>
				:
					<Loader />
				}
			</div>
		</div>
	);
}
