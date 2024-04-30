// styles
import './ProductsTable.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

// components
import ProductServingModal from '../productServingModal/ProductServingModal';
import AddNewProductModal from '../addNewProductModal/AddNewProductModal';

// utilities
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductsTable({
	addPortion,
	products,
	isModalOpen,
	setIsModalOpen,
	isCreateProductModalOpen,
	setIsCreateProductModalOpen
}) {
	const [isProductServingModalOpen, setIsProductServingModalOpen] =
		useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	// Check if this component is used on 'products' page
	const { pathname } = useLocation();
	const isProductsPage = pathname === '/dashboard/products';

	// Open product serving modal and pass selected product to it
	const handleIconClick = (item) => {
		setIsProductServingModalOpen(true);
		setSelectedProduct(item);
	};

	return (
		<div className='table-container'>
			{products.length > 0 ? (
				<table
					className='products-table'
					style={isProductsPage ? { height: '60vh' } : {}}>
					<thead>
						<tr className='products-table-data table-headings'>
							<td className='spacer'></td>
							<td>Product</td>
							<td>Calories</td>
							<td>Carbs</td>
							<td>Proteins</td>
							<td>Fats</td>
							<td className='add-product spacer'></td>
						</tr>
					</thead>
					<tbody>
						{products &&
							products.map((item) => (
								<tr key={item.id} className='products-table-data product'>
									<td className='spacer'></td>
									<td>{item.name}</td>
									<td>{`${item.calories}`}</td>
									<td>{`${item.carbohydrates}g`}</td>
									<td>{`${item.proteins}g`}</td>
									<td>{`${item.fats}g`}</td>
									{/* Do not display the add button on 'products' page*/}
									<td>
										{!isProductsPage && (
											<FaCirclePlus
												className='add-meal-button'
												onClick={() => handleIconClick(item)}
											/>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			) : (
				// If no products are found, display a message
				<div className='product-not-found'>
					<h2 className='product-not-found-info'>
						Can't find the desired product?
					</h2>
					<p className='add-product-to-table'>Add your own!</p>
					<button
						className='add-product-to-table-btn'
						onClick={() => setIsModalOpen(true)}>
						Create new product
					</button>
					{isModalOpen && (
						<AddNewProductModal setIsModalOpen={setIsModalOpen} />
					)}
				</div>
			)}
			{isProductServingModalOpen && (
				<ProductServingModal
					setOpenServingModal={setIsProductServingModalOpen}
					product={selectedProduct}
					addPortion={addPortion}
				/>
			)}
		</div>
	);
}
