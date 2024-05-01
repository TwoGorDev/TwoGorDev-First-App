// Styles
import './ThemePicker.css'

// Table of themes properties, used for theme choice buttons
const themeColors = [
  {
    themeClass: 'default',
    primaryColor: '#0e6aa8fa',
    primaryColorDark: '#0d588afa',
    secondaryColor: '#a6e1fa10',
  },
  {
    themeClass: 'orange',
    primaryColor: '#e99434fa',
    primaryColorDark: '#ca7f29fa',
    secondaryColor: '#e9943410',
  },
  {
    themeClass: 'lavender',
    primaryColor: '#a599ddfa',
    primaryColorDark: '#8b7ec5fa',
    secondaryColor: '#a599dd10',
  },
  {
    themeClass: 'plum',
    primaryColor: '#bb738ffa',
    primaryColorDark: '#9c5973fa',
    secondaryColor: '#bb738f10',
  },
  {
    themeClass: 'green',
    primaryColor: '#5faa5ffa',
    primaryColorDark: '#4d964dfa',
    secondaryColor: '#5faa5f10',
  },
  {
    themeClass: 'sky',
    primaryColor: '#68b2d4fa',
    primaryColorDark: '#5199bbfa',
    secondaryColor: '#68b2d410',
  },
  {
    themeClass: 'brick',
    primaryColor: '#a85d5dfa',
    primaryColorDark: '#964d4dfa',
    secondaryColor: '#a85d5d10',
  },
  {
    themeClass: 'olive',
    primaryColor: '#8a8b4bfa',
    primaryColorDark: '#77793dfa',
    secondaryColor: '#8a8b4b10',
  },
  {
    themeClass: 'gray',
    primaryColor: '#4e4b4bfa',
    primaryColorDark: '#3a3737fa',
    secondaryColor: '#4e4b4b10',
  },
  {
    themeClass: 'baby-pink',
    primaryColor: '#d69d9dfa',
    primaryColorDark: '#c58989fa',
    secondaryColor: '#d69d9d10',
  },
];

export default function ThemePicker() {

  function handleTheme(primaryColor, primaryColorDark, secondaryColor) {
		document.documentElement.style.setProperty('--primary-color', primaryColor);
		document.documentElement.style.setProperty('--primary-color-dark', primaryColorDark);
		document.documentElement.style.setProperty('--secondary-color', secondaryColor);
	}

  return (
    <>
      <h3 className='acc-settings-subtitle'>Choose Theme</h3>
			<div className='acc-settings-theme-container'>
				{themeColors.map((theme, index) => (
					<button
						key={index}
						onClick={() =>
							handleTheme(
								theme.primaryColor,
								theme.primaryColorDark,
								theme.secondaryColor
							)
						}
						className={`choose-theme-btn ${theme.themeClass}`}></button>
				))}
			</div>
    </>
  )
}