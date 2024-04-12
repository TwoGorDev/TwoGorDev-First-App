// styles
import './Advice.css';

// icons
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { LuRefreshCw } from 'react-icons/lu';

import { useState, useEffect } from 'react'

export default function () {
    const [advice, setAdvice] = useState('')
	const advices = [
		'Try to consume a variety of foods to provide your body with a diverse range of nutrients.',
		'Eat regularly to maintain energy balance and avoid feeling hungry.',
		'Focus on consuming fresh fruits and vegetables every day.',
		'Choose whole grain products over processed ones.',
		'Limit the intake of processed and highly processed food products, such as ready meals and fast food.',
		'Avoid excessive sugar consumption, including sugary drinks and snacks.',
		'Choose healthy sources of protein, such as poultry, fish, eggs, legumes, and nuts.',
		'Increase intake of healthy fats, such as olive oil, avocado, and nuts.',
		'Limit salt intake and avoid overly salty food products.',
		'Drink plenty of water each day to ensure proper hydration.',
		'Limit alcohol consumption and avoid substance abuse.',
		'Plan meals in advance to avoid impulsive food choices.',
		'Read food labels to make informed decisions about healthier options.',
		'Avoid overeating, only eat until you feel satisfied.',
		'Try to cook at home more often to have control over the ingredients in your meals.',
		"Don't skip breakfast, as it is an important meal for energy and concentration.",
		'Maintain a balance between calories consumed and calories burned through physical activity.',
		'Include healthy snacks in your diet, such as fruits, nuts, and vegetables.',
		'Avoid ready-made sauces and dressings, and instead prepare them yourself to control the ingredients.',
		'Read reviews and opinions to choose healthy restaurants when eating out.',
		'Limit consumption of trans fats, which are harmful to health.',
		"Try to eat slowly to better listen to your body's hunger and fullness signals.",
		'Pay attention to portion sizes to avoid consuming excessive calories.',
		'Be aware of the amount of calories you consume and adjust your diet to your individual needs.',
		'Remember the importance of balance and moderation in everything you eat.',
	];

    const randomNumber = Math.floor(Math.random() * advices.length);

    useEffect(() => {
        setAdvice(advices[randomNumber]);
    }, []);
	

	return (
		<div className='dashboard-advice'>
			<h2 className='health-advice'>
				<MdOutlineTipsAndUpdates className='health-advice-icon' />
				Health advice
			</h2>
			<p className='health-advice-content'>
				{advice}
			</p>
			<button
				className='get-random-advice-btn'
				onClick={() => setAdvice(advices[randomNumber])}>
				<LuRefreshCw />
			</button>
		</div>
	);
}
