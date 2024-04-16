import { useState } from 'react';

// styles
import './ProductsTable.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

export default function ProductsTable({ addProduct }) {
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
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 3,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 4,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 5,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 6,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 7,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 8,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 9,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 10,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 11,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 12,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 13,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 14,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 15,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
		{
			id: 16,
			user_id: 1,
			name: 'Sausage',
			calories: 123,
			proteins: 12,
			carbohydrates: 17,
			fats: 8,
		},
	];

	const handleAddProduct = (product) => {
		addProduct(product);
	};

	return (
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
								onClick={() => handleAddProduct(item)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
