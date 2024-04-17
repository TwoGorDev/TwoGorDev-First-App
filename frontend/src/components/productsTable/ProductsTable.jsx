import { useEffect, useState } from 'react';

// styles
import './ProductsTable.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

// components
import ProductServingModal from '../productServingModal/ProductServingModal';

export default function ProductsTable({ addProduct, setTotalProductCalories }) {
	const [isProductServingModalOpen, setIsProductServingModalOpen] =
		useState(false);
		const [selectedProduct, setSelectedProduct] = useState(null);

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
		setIsProductServingModalOpen(true)
		setSelectedProduct(item)
	}


	return (
		<>
			<table className='products-table'>
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
					{products.map((item) => (
						<tr key={item.id} className='products-table-data product'>
							<td className='spacer'></td>
							<td>{item.name}</td>
							<td>{`${item.calories} kcal`}</td>
							<td>{`${item.carbohydrates}g`}</td>
							<td>{`${item.proteins}g`}</td>
							<td>{`${item.fats}g`}</td>
							<td>
								<FaCirclePlus
									className='add-meal-button'
									onClick={() => handleIconClick(item)}
								/>
								{isProductServingModalOpen && (
									<ProductServingModal
										setOpenServingModal={setIsProductServingModalOpen}
										setTotalProductCalories={setTotalProductCalories}
										product={selectedProduct}
										addProduct={addProduct}
									/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
