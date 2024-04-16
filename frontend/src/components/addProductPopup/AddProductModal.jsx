import { useState } from 'react'

// styles
import './AddProductModal.css';

// icons
import { IoMdClose } from 'react-icons/io';
import { FaCircleMinus } from "react-icons/fa6";

// components
import ProductsTable from '../productsTable/ProductsTable';

export default function AddProductModal({ title, setIsModalOpen }) {
	const [addedProducts, setAddedProducts] = useState([]);
	const uppercaseTitle = title[0].toUpperCase() + title.slice(1);

	const addProduct = (product) => {
		setAddedProducts(prevProducts => [...prevProducts, product]);
	  };

	  console.log(addedProducts);

	return (
		<div className='overlay'>
			<div className='add-product-popup'>
				<IoMdClose
					className='modal-close-icon'
					onClick={() => setIsModalOpen(false)}
				/>
				<h2 className='modal-title'>{uppercaseTitle}</h2>
				<p className='modal-choose-product-text'>
					Choose your product from the list:
				</p>
				<div className='modal-products-container'>
					<ProductsTable addProduct={addProduct} />
					<div className='modal-added-products'>
						<h3 className='modal-added-products-title'>Added products: </h3>
						<ul className='added-products-list'>							
							{addedProducts.length > 0 && addedProducts.map((product, index) => (
								<li key={index} className='added-products-item'>
									{product.name}
									<span className="added-products-item-kcal">{product.calories}kcal</span>
									<FaCircleMinus className='remove-product-icon' />
								</li>
							))}
						</ul>
					</div>
				</div>
				<button className="add-products-to-meal-btn">Add products to {title}</button>
			</div>
		</div>
	);
}
