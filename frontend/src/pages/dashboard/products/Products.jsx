// styles
import './Products.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

export default function Products() {
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
	];

	return (
		// <div className="products">
		//   <div className="product">
		//     <span className="product-name"></span>
		//     <span className="product-calories"></span>
		//     <span className="product-macros"></span>
		//     <span className="product-macros"></span>
		//     <span className="product-macros"></span>
		//     <button className="add-product"></button>

		//   </div>
		// </div>

		<div className='products'>
			<table className='products-table'>
				<thead>
					<tr className='products-table-data table-headings'>
						<td className='spacer'></td>
						<td>Name</td>
						<td>Calories</td>
						<td>Proteins</td>
						<td>Carbs</td>
						<td>Fats</td>
						<td className='add-product spacer'></td>
						<td className='spacer'></td>
						{/* <td>Add product</td> */}
					</tr>
				</thead>
				<tbody>
					{products.map((item) => (
						<tr key={item.id} className='products-table-data product'>
							<td className='spacer'></td>
							<td>{item.name}</td>
							<td>{`${item.calories} kcal`}</td>
							<td>{`${item.proteins}g`}</td>
							<td>{`${item.carbohydrates}g`}</td>
							<td>{`${item.fats}g`}</td>
							<td>
								<FaCirclePlus className='add-meal-button' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
