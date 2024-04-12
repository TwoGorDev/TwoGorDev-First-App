//styles
import './Dashboard.css';

//components
import Calories from '../../components/calories/Calories'

export default function Dashboard() {
	return (
		<section className='dashboard wrapper'>
			<Calories />
		</section>
	);
}
