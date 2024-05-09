// Styles
import './ProductServingModal.css';

// Components, Icons & Images
import { IoMdClose } from 'react-icons/io';

// Utilities & Hooks
import { SetStateAction, useState } from 'react';
import isNumbersOnly from '../../utilities/allowNumbersOnly';

// Types
import { Product, Portion } from '../../types/types';
type ProductServingModalProps = {
	setOpenServingModal: React.Dispatch<SetStateAction<boolean>>
	product: Product
	addPortion: (portion : Portion) => void
}

export default function ProductServingModal({ setOpenServingModal, product, addPortion } : ProductServingModalProps) {
	// Local logic/state
	const [showError, setShowError] = useState(false);
	const [servingData, setServingData] = useState(0);

	// Add portion to 'addedPortions' array in <AddProductModal />
	const handleAddProduct = () => {
		if (servingData !== 0) {
			addPortion({
				product: product.name,
				product_id: product.id,
				carbohydrates: product.carbohydrates,
				calories: product.calories,
				proteins: product.proteins,
				fats: product.fats,
				serving: servingData,
				temporary_id: Math.random()
			});
			setOpenServingModal(false);
		} else {
			setShowError(true);
		}
	};

	// Calculate total serving calories 
	const totalProductCaloriesAmount = Math.round((servingData / 100) * product.calories);	

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
						onChange={(e) => isNumbersOnly(e.target.value) && setServingData(Number(e.target.value))}
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
					onClick={() => handleAddProduct()}>
					Add product
				</button>
			</div>
		</div>
	);
}
