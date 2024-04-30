// Styles
import './AddPortionModal.css';

// Icons
import { IoMdClose } from 'react-icons/io';
import { FaCircleMinus } from 'react-icons/fa6';

// Components
import ProductsTable from '../productsTable/ProductsTable';
import Loader from '../loader/Loader';

// Utilities
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import useDataApi from '../../hooks/useDataApi';
import useDebounce from '../../hooks/useDebounce';
import { ProductsContext } from '../../contexts/ProductsContext';
import { SummaryContext } from '../../contexts/SummaryContext';

export default function AddPortionModal({ title, setIsAddPortionModalOpen, mealId, mealPortions }) {
	// Outside state
	const { products, isPending, setEndpoint } = useContext(ProductsContext);
	const { date } = useContext(SummaryContext);
	const navigate = useNavigate();
	const { error, isPending: isPostRequestPending, postData, patchData } = useDataApi();
	

	// Local state
	const [query, setQuery] = useState('');
	const [currentPortions, setCurrentPortions] = useState(mealPortions.filter(item => item.portion_id));
	const [addedPortions, setAddedPortions] = useState([]);
	const [deletedPortions, setDeletedPortions] = useState([]);

	// Debouncing search query
	const debouncedQuery = useDebounce(query, 500);

	// Fetch products from the server on component mount
	useEffect(() => {
		// fetch data from the server everytime user types into search bar (after debouncing)
		if (debouncedQuery) {
			setEndpoint(`/products/search/${debouncedQuery}`);
		} else {
			setEndpoint('/products');
		}
	}, [debouncedQuery])

	// Get total amount of calories in all the portions
	const portionsTotalCalories = Math.round(
		// calculate calories for each portion and return them in an array
		currentPortions.map((portion) => portion.calories * portion.serving / 100)
		// sum all values in that array into a single value
		.reduce((acc, curr) => acc + curr, 0)
	);
  
	// Add new portions to local meal
	const addPortion = (portion) => {
		setAddedPortions((prevPortions) => [...prevPortions, portion]);
		setCurrentPortions((prevPortions) => [...prevPortions, portion]);
	};

	// Remove portions from local meal
	const removePortion = (portion) => {
		setAddedPortions((prevPortions) => prevPortions.filter(item => item.portion_id !== portion.portion_id || item.temporary_id !== portion.temporary_id));
		setCurrentPortions((prevPortions) => prevPortions.filter(item => item.portion_id !== portion.portion_id || item.temporary_id !== portion.temporary_id));
		setDeletedPortions((prevPortions) => [...prevPortions, portion]);
	};

	// Update the database with local meal information
	const updateDatabase = async () => {

		// end the process if user didn't change any data
		if (addedPortions.length === 0 && deletedPortions.length === 0) {
			setIsAddPortionModalOpen(false);
			return;
		}

		// check if client received mealId from the server during inital 'daily-summary' fetch in <Dashboard /> component
		// if it didn't, the mealId will be set to 0, it means that meal is not created in the database yet, in that case - create new meal and replace 0 with it's id
		// if mealId is different than 0, it means that the meal is already created and it has been fetched - hence don't mutate mealId at all
		if (mealId === 0) {
			const newMeal = {
				type: capitalizeFirstLetter(title),
				date: date
			};

			const res = await postData('/meals', newMeal);
			mealId = res.id;
		}

		// check if among deletedPortions state there are portions that exist in the database
		// portions that exist in the database have 'portion_id' property whereas portions created locally have 'temporary_id' property
		const databasePresentPortions = deletedPortions.filter(portion => portion.portion_id);

		if (databasePresentPortions.length !== 0) {
			// delete those existing portions from the database
			const existingPortionsIdsArray = databasePresentPortions.map(portion => portion.portion_id);
			
			await patchData('/delete-portions', existingPortionsIdsArray);
		}
		
		// check if new portions have been added
		if (addedPortions.length !== 0) {
			// map through addedPortions and add meal ID to each of them
			const newPortionsWithMealId = addedPortions.map(portion => {
				return {
					meal_id: mealId,
					product_id: portion.product_id,
					serving: portion.serving
				}
			});

			// create new portions in the database
			await postData('/portions', newPortionsWithMealId);
		}

		// if there's no errors, refresh the page to refetch 'daily-summary' with newly created data
		if (!error) {
			setIsAddPortionModalOpen(false);
			navigate(0)
		}
	}

	return (
		<div className='add-product-overlay'>
			<div className='product-modal-popup'>
				<IoMdClose
					className='modal-close-icon serving-modal-close-icon'
					onClick={() => setIsAddPortionModalOpen(false)}
				/>
				<h2 className='modal-title'>{capitalizeFirstLetter(title)}</h2>
				<p className='modal-choose-product-text'>
					Choose your product:
				</p>
				<div className='modal-products-container'>
					<div>
						<input
							className='products-table-search'
							type='text'
							placeholder='Search products...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						{isPending ? 
							<Loader />
						: 
							<ProductsTable
								addPortion={addPortion}
								products={products}
							/>
						}
					</div>
					<div className='modal-added-products'>
						<h3 className='modal-added-products-title'>Added products: </h3>
						<ul className='added-products-list'>
							{currentPortions.length > 0 &&
								currentPortions.map((portion, index) => (
									<li key={index} className='added-products-item'>
										<span className='added-product-item-name'>
											{portion.product}
										</span>
										<span className='added-product-item-kcal'>
											{Math.round(portion.serving * portion.calories / 100)}kcal
										</span>
										<FaCircleMinus
											className='remove-product-icon'
											onClick={() => removePortion(portion)}
										/>
									</li>
								))}
						</ul>
						<p className='added-products-total-calories'>
							Calories in total: <br />{' '}
							<span>{portionsTotalCalories} kcal</span>
						</p>
					</div>
				</div>
				<button 
					className='add-products-to-meal-btn'
					onClick={updateDatabase}
				>
					{isPostRequestPending ? 'Loading...' : `Add to ${capitalizeFirstLetter(title)}`}
				</button>
			</div>
		</div>
	);
}
