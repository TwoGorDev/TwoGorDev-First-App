import { useState } from 'react';

// styles
import './AddNewProductModal.css';

// icons
import { IoMdClose } from 'react-icons/io';

// utilities
import isNumbersOnly from '../../utilities/allowNumbersOnly';

export default function AddNewProductModal({ setIsModalOpen }) {
	const [newProductData, setNewProductData] = useState({
		name: '',
		calories: '',
		carbohydrates: '',
		proteins: '',
		fats: '',
	});
	const [error, setError] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		if (name !== 'name') {
			if (isNumbersOnly(value)) {
				setNewProductData((prevData) => ({ ...prevData, [name]: value }));
			}
		} else {
			setNewProductData((prevData) => ({ ...prevData, [name]: value }));
		}
	}

	const createNewProduct = (e) => {
		e.preventDefault()

		if (Object.values(newProductData).some(el => el === '')){
			setError(true);
			return;
		} 
		// else {
		// 
		// }
	};

	return (
		<div className='add-product-overlay'>
			<div className='add-new-product-container'>
				<IoMdClose
					className='modal-close-icon serving-modal-close-icon'
					onClick={() => setIsModalOpen(false)}
				/>
				<h2 className='add-new-product-heading'>Add your product</h2>
				<p className='add-new-product-info'>
					<b>Note:</b> all values should be provided for a{' '}
					<span>100g portion</span>
				</p>
				<form className='add-new-product-form'>
					<label className='new-product-info-label'>
						Product:
						<input
							onChange={handleChange}
							value={newProductData.name}
							name='name'
							placeholder='Product name (e.g. banana)'
							type='text'
						/>
					</label>
					<label className='new-product-info-label'>
						Calories:
						<input
							onChange={handleChange}
							value={newProductData.calories}
							name='calories'
							placeholder='Calories (kcal)'
							type='text'
						/>
					</label>
					<h3 className='add-new-product-form-macro-heading'>
						Macronutrients:
					</h3>
					<div className='add-new-product-form-macro'>
						<label>
							Carbohydrates:
							<input
								onChange={handleChange}
								value={newProductData.carbohydrates}
								name='carbohydrates'
								placeholder='Carbohydrates (g)'
								type='text'
							/>
						</label>
						<label>
							Proteins:
							<input
								onChange={handleChange}
								value={newProductData.proteins}
								name='proteins'
								placeholder='Proteins (g)'
								type='text'
							/>
						</label>
						<label>
							Fats:
							<input
								onChange={handleChange}
								value={newProductData.fats}
								name='fats'
								placeholder='Fats (g)'
								type='text'
							/>
						</label>
					</div>
					{error && <p className="add-new-product-error">All fields must be completed</p>}

					<button onClick={(e) => createNewProduct(e)} className='add-new-product-btn'>
						Add product to the list
					</button>
				</form>
			</div>
		</div>
	);
}
