import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./Subdashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../pages/redux/reducers/authReducer";

const Menuitem = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItem2, setActiveItem2] = useState(null);
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const toggleDropdown2 = () => {
    setOpenDropdown2(!openDropdown2);
  };

  const handleSubItemClick = (subIndex) => {
    setActiveItem(subIndex);
  };
  const handleSubItemClick2 = (subIndex) => {
    setActiveItem2(subIndex);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div id="sidebar">
      <div className="list-group rounded-0 mt-4">
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
              to="/ip-whitelisting"
              className={classNames(
                "list-group-item list-group-item-action border-0 align-items-center",
                {
                  active: activeItem === "ip-whitelisting",
                }
              )}
              onClick={() => handleSubItemClick("ip-whitelisting")}
            >
              <i className="fa-solid fa-key sidebaricon"></i>
              <span>IP Whitelisting</span>
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
  );
};

export default Menuitem;
