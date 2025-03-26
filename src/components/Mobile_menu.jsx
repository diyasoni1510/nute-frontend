import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./Subdashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../pages/redux/reducers/authReducer";

const Mobile_menu = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openDropdown2, setOpenDropdown2] = useState(false);
    const [openDropdown3, setOpenDropdown3] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [activeItem2, setActiveItem2] = useState(null);
    const [activeItem3, setActiveItem3] = useState(null);
    const toggleDropdown = () => {
      setOpenDropdown(!openDropdown);
    };
    const toggleDropdown2 = () => {
      setOpenDropdown2(!openDropdown2);
    };
  
    const toggleDropdown3 = () => {
      setOpenDropdown3(!openDropdown3);
    };
    const handleSubItemClick = (subIndex) => {
      setActiveItem(subIndex);
    };
    const handleSubItemClick2 = (subIndex) => {
      setActiveItem2(subIndex);
    };
    const handleSubItemClick3 = (subIndex) => {
      setActiveItem3(subIndex);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      <div
        className="text-light fs-3 "
       
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
        <div className="d-flex align-items-center gap-2 ">
              <div className="">
                <img src="images/fav.png" alt="" style={{ width: "30px" }} />
              </div>
              <div className="heading-logoto">nute payment gateway</div>
            </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        
        </div>
        {/* <hr/> */}
        <div className="offcanvas-body">
         <div className="mob-sidebar">
         <div className="list-group rounded-0 ">
        <NavLink
          to="/summary"
          className="list-group-item list-group-item-action  border-0 align-items-center"
        >
          <i className="fa-solid fa-clipboard-check  sidebaricon"></i>
          <span>Summary</span>
        </NavLink>
        <NavLink
          to="/Crypto-gateway"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-folder-open sidebaricon"></i>
          <span>Add Assets</span>
        </NavLink>
        <NavLink
          to="/wallet"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fas fa-wallet sidebaricon"></i>
          <span>Wallet</span>
        </NavLink>
        <NavLink
          to="/Transcations"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-brands fa-stack-exchange sidebaricon"></i>
          <span>Transactions</span>
        </NavLink>
        <div
          className={classNames(
            "list-group-item list-group-item-action mode2 border-0 align-items-center",
            { active: openDropdown }
          )}
          onClick={toggleDropdown}
        >
          <i className="fa-solid fa-diagram-project sidebaricon"></i>
          <span className="color2">Projects</span>
          <i
            className={classNames("fa fa-chevron-down sidebaricon sidebarchv", {
              rotate: openDropdown,
            })}
          ></i>
        </div>
        {openDropdown && (
          <div className="dropdown-content">
            <NavLink
              to="/Domain-verification"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem === "domainVerification",
                }
              )}
              onClick={() => handleSubItemClick("domainVerification")}
            >
              <i className="fa-solid fa-globe sidebaricon"></i>
              <span>Domain Verification</span>
            </NavLink>
            <NavLink
              to="/key"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem === "accessKey",
                }
              )}
              onClick={() => handleSubItemClick("accessKey")}
            >
              <i className="fa-solid fa-key sidebaricon"></i>
              <span>Access Key</span>
            </NavLink>
            <NavLink
              to="/my-assets"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem === "my-assets",
                }
              )}
              onClick={() => handleSubItemClick("my-assets")}
            >
              <i className="fa-solid fa-key sidebaricon"></i>
              <span>My Assets</span>
            </NavLink>
          </div>
        )}
       <NavLink
          to="/Transfer"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-money-bill-transfer sidebaricon"></i>
          <span>Transfer</span>
        </NavLink>
        <NavLink
          to="/Withdrawal"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-money-bill-transfer sidebaricon"></i>
          <span>Withdrawal</span>
        </NavLink>
        <NavLink
          to="/invoice"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-solid fa-file-invoice sidebaricon"></i>
          <span>invoice</span>
        </NavLink>
        <NavLink
          to="/Convert"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-rotate sidebaricon"></i>
          <span>Convert</span>
        </NavLink>
        <NavLink
          to="/Buy&Sell"
          className="list-group-item list-group-item-action border-0 align-items-center"
        >
          <i className="fa-solid fa-arrow-right-arrow-left sidebaricon"></i>
          <span>Buy/Sell</span>
        </NavLink>
        <div
          className={classNames(
            "list-group-item list-group-item-action mode2 border-0 align-items-center",
            { active: openDropdown2 }
          )}
          onClick={toggleDropdown2}
        >
          <i className="fa-solid fa-diagram-project sidebaricon"></i>
          <span className="color2">Fee</span>
          <i
            className={classNames("fa fa-chevron-down sidebaricon sidebarchv", {
              rotate: openDropdown2,
            })}
          ></i>
        </div>
        {openDropdown2 && (
          <div className="dropdown-content">
            <NavLink
              to="/OnchainFee"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem2 === "Onchainfee",
                }
              )}
              onClick={() => handleSubItemClick2("Onchainfee")}
            >
              <i className="fa-solid fa-globe sidebaricon"></i>
              <span>OnChain fee </span>
            </NavLink>
            <NavLink
              to="/TransactionFee"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem2 === "Transactionfee",
                }
              )}
              onClick={() => handleSubItemClick2("Transactionfee")}
            >
              <i className="fa-solid fa-key sidebaricon"></i>
              <span>Transaction fee</span>
            </NavLink>
           
          </div>
        )}
        {/* third dropdown */}
        <div
          className={classNames(
            "list-group-item list-group-item-action mode2 border-0 align-items-center",
            { active: openDropdown3 }
          )}
          onClick={toggleDropdown3}
        >
          <i className="fa-solid fa fa-user sidebaricon"></i>
          <span className="color2">Account</span>
          <i
            className={classNames("fa fa-chevron-down sidebaricon sidebarchv", {
              rotate: openDropdown3,
            })}
          ></i>
        </div>
        {openDropdown3 && (
          <div className="dropdown-content">
            <NavLink
               to="/my-information"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem3 === "my-information",
                }
              )}
              onClick={() => handleSubItemClick3("my-information")}
            >
             <i className="fa fa-user sidebaricon"></i>
          <span>My information</span>
            </NavLink>
            <NavLink
               to="/2FA-authentication"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem3 === "Authentication",
                }
              )}
              onClick={() => handleSubItemClick3("Authentication")}
            >
              <i className="fa-solid fa-lock sidebaricon"></i>
          <span>2FA  Authentication</span>
            </NavLink>
            <NavLink
                to="/Login-history"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem3 === "login-history",
                }
              )}
              onClick={() => handleSubItemClick3("login-history")}
            >
              <i className="fa-solid fa-clock sidebaricon"></i>
          <span>Login History</span>
            </NavLink>
           
          </div>
        )}
        {/* end dropdown */}
      </div>
      <div className="list-group rounded-0 position-absolute bottom-0 " style={{width:"95%"}}>
        <hr />
       
        <NavLink
          to="/documents"
          className="list-group-item list-group-item-action border-0 align-items-center "
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
        </div>
      </div>
    </>
  );
};

export default Mobile_menu;
