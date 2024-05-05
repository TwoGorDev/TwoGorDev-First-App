// Components, Icons & Images
import ProgressBar from '@ramonak/react-progress-bar';

export default function SimpleProgressBar({ value, max }) {
	return (
		<ProgressBar
			className='macro-progress-bar'
			completed={value}
			maxCompleted={max}
			bgColor='var(--primary-color)'
			height='8px'
			baseBgColor='#d6d6d6'
			isLabelVisible={false}
		/>
	);
}
