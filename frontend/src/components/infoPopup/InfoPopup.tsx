// Styles 
import './InfoPopup.css'

export default function InfoPopup({children} : {children: React.ReactNode}) {
  return (
    <div className="popup-container">
      <p className="popup-content">
        {children}
      </p>
    </div>
  );
}