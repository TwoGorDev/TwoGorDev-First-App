// styles
import './AddProductModal.css';

// icons
import { IoMdClose } from 'react-icons/io';
import { FaCircleMinus } from 'react-icons/fa6';

// components
import ProductsTable from '../productsTable/ProductsTable';

// utilities
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getFormattedDate from '../../utilities/getFormattedDate';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import useDataApi from '../../hooks/useDataApi';

export default function AddProductModal({ title, setIsAddProductModalOpen, mealId }) {
	const { isPending, error, postData } = useDataApi();
	const [addedProducts, setAddedProducts] = useState([]);
	const [totalProductCalories, setTotalProductCalories] = useState([]);
	const [newPortion, setNewPortion] = useState([])
	const navigate = useNavigate();

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

	const addProductsToMeal = async (e) => {
		const newMeal = {
			type: capitalizeFirstLetter(title),
			date: getFormattedDate(new Date())
		}

		// Sprawdzić czy istnieje już meal_id, jeśli nie to stworzyć nowy meal w bazie danych
		let newMealId = 0;
		
		if (mealId === 0) {
			const res = await postData('/meals', newMeal);

			newMealId = res.id;
		}
		

		await Promise.all(
			newPortion.map(async (item) => {
				return await postData('/portions', {
					mealId: mealId === 0 ? newMealId : mealId,
					productId: item.productId,
					serving: item.serving
				})
			})
		)
		
		navigate(0);

	}

	return (
		<div className='add-product-overlay'>
			<div className='product-modal-popup'>
				<IoMdClose
					className='modal-close-icon serving-modal-close-icon'
					onClick={() => setIsAddProductModalOpen(false)}
				/>
				<h2 className='modal-title'>{capitalizeFirstLetter(title)}</h2>
				<p className='modal-choose-product-text'>
					Choose your product from the list:
				</p>
				<div className='modal-products-container'>
					<ProductsTable
						addProduct={addProduct}
						setTotalProductCalories={setTotalProductCalories}
						setNewPortion={setNewPortion}
					/>
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
				onClick={addProductsToMeal}
				>
					Add products to {title}
				</button>
			</div>
		</div>
	);
}
