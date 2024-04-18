import { useState } from 'react';

// styles
import './ProductServingModal.css';

// icons
import { IoMdClose } from 'react-icons/io';

export default function ProductServingModal({
	setOpenServingModal,
	product,
	addProduct,
	setTotalProductCalories,
	setNewPortion
}) {
	const [showError, setShowError] = useState(false);
	const [servingData, setServingData] = useState('');

	const totalProductCaloriesAmount = Math.round((servingData / 100) * product.calories);	

	function handleChange(e) {
		if (/^[0-9\b]+$/.test(e.target.value) || e.target.value === '') {
			setServingData(e.target.value);
		}
	}

	const handleAddProduct = () => {
		if (servingData !== '') {
			addProduct(product);

			setTotalProductCalories((prevTotal) => [
				...prevTotal,
				totalProductCaloriesAmount
			]);

			setNewPortion(prevPortion => [
				...prevPortion,
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
						onChange={handleChange}
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
