//styles
import './Dashboard.css';

//components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';

export default function Dashboard() {
	return (
		<section className='dashboard wrapper'>
			<Calories />
			<Nutrition />
		</section>
	);
}
