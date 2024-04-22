// styles
import './ProductServingModal.css';

// components
import { IoMdClose } from 'react-icons/io';

// utilities
import { useState } from 'react';
import isNumbersOnly from '../../utilities/allowNumbersOnly';

export default function ProductServingModal({ setOpenServingModal, product, addProduct, setTotalProductCalories, setNewPortions }) {
	const [showError, setShowError] = useState(false);
	const [servingData, setServingData] = useState('');

	// Calculate total serving calories 
	const totalProductCaloriesAmount = Math.round((servingData / 100) * product.calories);	

	const handleAddProduct = () => {
		if (servingData !== '') {
			addProduct(product);

			setTotalProductCalories((prevTotal) => [
				...prevTotal,
				totalProductCaloriesAmount
			]);

			setNewPortions(prevPortions => [
				...prevPortions,
				{
					serving: servingData,
					productId: product.id
				}
			])
			setOpenServingModal(false);
		} else {
			setShowError(true);
		}
	};

	return (
		<div className='product-serving-overlay'>
			<div className='product-modal-popup serving-modal-popup'>
				<IoMdClose
					className='modal-close-icon'
					onClick={() => setOpenServingModal(false)}
				/>
				<h2 className='modal-title serving-modal-title'>{product.name}</h2>
				<p className='modal-choose-product-text modal-choose-serving-text'>
					Add product serving:
				</p>
				<div className='serving-modal-input-box'>
					<input
						type='text'
						className='serving-input'
						value={servingData}
						onChange={(e) => isNumbersOnly(e.target.value) && setServingData(e.target.value)}
					/>
					<span className='serving-input-info'>grams of {product.name}</span>
				</div>
				{showError && (
					<p className='serving-input-error'>Incorrect serving quantity!</p>
				)}
				<p className='serving-total-kcal-info'>
					Calories: {totalProductCaloriesAmount} kcal
				</p>
				<button
					className='serving-modal-add-product-btn'
					onClick={() => handleAddProduct(product)}>
					Add product
				</button>
			</div>
		</div>
	);
}
