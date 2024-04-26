// styles
import './ProductsTable.css';

// components
import ProductServingModal from '../productServingModal/ProductServingModal';
import { FaCirclePlus } from 'react-icons/fa6';

// utilities
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductsTable({
	addProduct,
	setTotalProductCalories,
	setNewPortions,
	products,
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
				// Wyświetlić wiadomość w stylu 'No products were found based on this criteria'
				<h2 className='product-not-found'>
					Couldn't find the product you're looking for...
				</h2>
			)}
			{isProductServingModalOpen && (
				<ProductServingModal
					setOpenServingModal={setIsProductServingModalOpen}
					product={selectedProduct}
					addProduct={addProduct}
					setTotalProductCalories={setTotalProductCalories}
					setNewPortions={setNewPortions}
				/>
			)}
		</div>
	);
}
