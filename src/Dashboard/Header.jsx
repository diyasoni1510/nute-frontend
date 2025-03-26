import React from "react";
import HeaderModal from "./HeaderModal";
import { Link } from "react-router-dom";
import { logout } from "../pages/utils/api_functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../pages/redux/reducers/authReducer";
import Mobile_menu from "../components/Mobile_menu";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {profile} = useSelector((state)=>state.AuthReducer)


  
  return (
    <>
 

      <div className="  header fixed-top">
        <div className="container-fluid">
          <div className="d-flex justify-content-between headerto align-items-center">
            <div className="d-flex align-items-center gap-3">
              {" "}
              <Link to="/" className="navbar-brand">
                <img src="images/Nute- logo.png" alt="" className="logo" />
                <img src="images/fav.png" alt="" className="logo-icon" />
              </Link>
              <HeaderModal />
            </div>
<div className="mobile_menu">
<Mobile_menu/>
</div>
            <div className="  headericon">
              <button className="btn  me-md-2  headerbtntxt" type="button">
                Developers
              </button>
              <button className="btn  headerbtntxt" type="button">
                Switch To Test
              </button>
              <div className="icon-mob">
                <i className="fa-solid fa-gear text-light fs-5"></i>
                <i className="fa-solid fa-bell text-light fs-5"></i>
              </div>
              <div className="btn-group">
                <i
                  className="usernam dropdown-toggle"
                  type="button"
                  id="dropdownMenuClickableInside"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  
                >
                  {" "}
                  {profile ? profile.email?.charAt(0).toUpperCase() : ''}
                </i>
               
                <ul
                  className="dropdown-menu headerusericon"
                  aria-labelledby="dropdownMenuClickableInside"
                >
                  <li>
                    <div className="dropdown-item">
                      <p className="fs-6" style={{ color: "#8d8b8b" }}>
                        Account
                      </p>
                      <div className="d-flex justify-content-start gap-4 align-center">
                        <div className="username-icon">
                        {profile ? profile.email?.charAt(0).toUpperCase() : ''}
                        </div>
                        <div className="">
                          <p className="fw-bold m-0">{profile?.name?profile?.name:profile?.email?.split('@')[0]}</p>
                          <p
                            className="mb-0"
                            style={{ color: "#8d8b8b", fontSize: "14px" }}
                          >
                            {profile?profile.email:'User@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to="/my-information" className="text-decoration-none">
                    <div className="dropdown-item d-grid gap-2">
                   
                      <button className="btn btn-outline-success w-100" type="button">
                        Manage your account
                      </button>
                     
                    </div>
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex gap-3"
                      href="#"
                      style={{ color: "#5f6064" }}
                    >
                      <div className="">
                        {" "}
                        <i className="fa-solid fa-file"></i>
                      </div>{" "}
                      <div className="">Invoice</div>
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(authLogout());
                      navigate("../login", { replace: true });
                    }}
                  >
                    <a
                      className="dropdown-item d-flex gap-3"
                      style={{ color: "#5f6064" }}
                    >
                      <div className="">
                        {" "}
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </div>{" "}
                      <div className="">LogOut</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
