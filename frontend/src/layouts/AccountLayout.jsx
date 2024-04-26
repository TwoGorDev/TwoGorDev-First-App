import { Outlet } from "react-router-dom"

// styles
import './AccountLayout.css'

export default function AccountLayout() {
  return (
    <div className="account-layout-container">
       

        <Outlet />
    </div>
  )
}