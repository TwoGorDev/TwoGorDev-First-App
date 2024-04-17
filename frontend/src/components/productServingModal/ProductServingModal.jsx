import { useState } from 'react';

// styles
import './ProductServingModal.css';
import { IoMdClose } from 'react-icons/io';
export default function ProductServingModal({
	setOpenServingModal,
	product,
	addProduct,
	setTotalProductCalories
}) {
	const [serving, setServing] = useState('0');
	const totalProductCaloriesAmount = Math.round((serving / 100) * product.calories);

	function handleChange(e) {
		setServing(e.target.value);
	}

	console.log(product);

	const handleAddProduct = () => {
		addProduct(product)
		setTotalProductCalories(totalProductCaloriesAmount)
		setOpenServingModal(false)
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
						value={serving}
						onChange={handleChange}
					/>
					<span className='serving-input-info'>grams of {product.name}</span>
				</div>
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
