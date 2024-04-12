//styles
import './Dashboard.css';

//components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';

export default function Dashboard() {
	return (
		<div className='wrapper center'>
			<div className='dashboard-tables'>
				<Calories />
				<Nutrition />
			</div>
			<Advice />
		</div>
	);
}
