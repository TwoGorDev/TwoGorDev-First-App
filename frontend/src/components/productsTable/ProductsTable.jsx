import { useState, useEffect } from 'react';

// styles
import './ProductsTable.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

// components
import ProductServingModal from '../productServingModal/ProductServingModal';
import useDataApi from '../../hooks/useDataApi';

export default function ProductsTable({
	addProduct,
	setTotalProductCalories,
	setNewPortion,
	productsPage,
}) {
	const { isPending, error, data, getData } = useDataApi();
	const [isProductServingModalOpen, setIsProductServingModalOpen] =
		useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	// search state
	const [searchTerm, setSearchTerm] = useState('');

	const products = [
		{
			id: 1,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 2,
			user_id: 1,
			name: 'Eggs',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 3,
			user_id: 1,
			name: 'Bread',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
	];

	const handleIconClick = (item) => {
		setIsProductServingModalOpen(true);
		setSelectedProduct(item);
	};

	// search functionality
	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		getData('/products');
	}, []);

	return (
		<div>
			<input
				className='products-table-search'
				type='text'
				placeholder='Search products...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className='table-container'>
				<table
					className='products-table'
					style={productsPage && { height: '60vh' }}>
					<thead>
						<tr className='products-table-data table-headings'>
							<td className='spacer'></td>
							<td>Name</td>
							<td>Calories</td>
							<td>Carbs</td>
							<td>Proteins</td>
							<td>Fats</td>
							<td className='add-product spacer'></td>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item) => (
								<tr key={item.id} className='products-table-data product'>
									<td className='spacer'></td>
									<td>{item.name}</td>
									<td>{`${item.calories} kcal`}</td>
									<td>{`${item.carbohydrates}g`}</td>
									<td>{`${item.proteins}g`}</td>
									<td>{`${item.fats}g`}</td>
									<td>
										{!productsPage && (
											<FaCirclePlus
												className='add-meal-button'
												onClick={() => handleIconClick(item)}
											/>
										)}

										{isProductServingModalOpen && (
											<ProductServingModal
												setOpenServingModal={setIsProductServingModalOpen}
												product={selectedProduct}
												addProduct={addProduct}
												setTotalProductCalories={setTotalProductCalories}
												setNewPortion={setNewPortion}
											/>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
