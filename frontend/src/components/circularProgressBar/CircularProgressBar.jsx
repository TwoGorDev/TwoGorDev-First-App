// imports
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgressBar({ children, transformDeg, strokeWidth, value, circleRatio, className }) {
  return (
    <CircularProgressbarWithChildren
						className={className}
                        circleRatio={circleRatio}
						value={value}
						strokeWidth={strokeWidth}
						styles={{
							trail: {
								stroke: '#d6d6d6',
								strokeLinecap: 'round',
                                transform: `rotate(${transformDeg}deg)`,
								transformOrigin: 'center center',
							},
							path: {
								stroke: 'var(--primary-color)',
								strokeLinecap: 'round',
                                transform: `rotate(${transformDeg}deg)`,
								transformOrigin: 'center center',
							},

							text: {
								fill: 'var(--primary-color)',
							},
						}}>
						{children} 
					</CircularProgressbarWithChildren>

  )
}