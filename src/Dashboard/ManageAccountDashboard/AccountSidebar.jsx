import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../components/Subdashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch,  } from "react-redux";
import { authLogout } from "../../pages/redux/reducers/authReducer";
const AccountSidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
  return (
    <div><>
     <div id="sidebar">
      <div className="list-group rounded-0 mt-4">
        
        <NavLink
          to="/my-information"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa fa-user sidebaricon"></i>
          <span>My information</span>
        </NavLink>
        <NavLink
          to="/2FA-authentication"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-lock sidebaricon"></i>
          <span>2FA  Authentication</span>
        </NavLink>
        <NavLink
          to="/Login-history"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-clock sidebaricon"></i>
          <span>Login History</span>
        </NavLink>
      </div>
      <div className="list-group rounded-0 position-absolute bottom-0 w-100">
        <hr />
        <NavLink
          to="/documents"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-regular fa-folder-open sidebaricon"></i>
          <span>Developer Doc</span>
        </NavLink>
        <NavLink
         onClick={() => {
          dispatch(authLogout());
          navigate("../login", { replace: true });
        }}
          to="/"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa fa-sign-out-alt sidebaricon"></i>
          <span>LogOut</span>
        </NavLink>
      </div>
    </div>

    </></div>
  )
}

export default AccountSidebar