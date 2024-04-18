import { useState, useContext } from 'react';

// styles
import './AddProductModal.css';

// icons
import { IoMdClose } from 'react-icons/io';
import { FaCircleMinus } from 'react-icons/fa6';

// components
import ProductsTable from '../productsTable/ProductsTable';

// utilities
import getFormattedDate from '../../utilities/getFormattedDate';

export default function AddProductModal({ title, setIsAddProductModalOpen }) {
	const [addedProducts, setAddedProducts] = useState([]);
	const [totalProductCalories, setTotalProductCalories] = useState([]);
	const uppercaseTitle = title[0].toUpperCase() + title.slice(1);
	const [newPortion, setNewPortion] = useState([])
	console.log(newPortion);
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

	const addProductsToMeal = () => {
		const newMeal = {
			type: title,
			date: getFormattedDate(new Date())
		}


			// setIsAddProductModalOpen(false)
	}

	return (
		<div className='add-product-overlay'>
			<div className='product-modal-popup'>
				<IoMdClose
					className='modal-close-icon serving-modal-close-icon'
					onClick={() => setIsAddProductModalOpen(false)}
				/>
				<h2 className='modal-title'>{uppercaseTitle}</h2>
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
