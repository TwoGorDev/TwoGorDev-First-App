// Styles 
import './InfoPopup.css'

export default function InfoPopup({children}) {
  return (
    <div className="popup-container">
      <p className="popup-content">
        {children}
      </p>
    </div>
  );
}