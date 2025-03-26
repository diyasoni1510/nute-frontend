import React, { useEffect, useState } from "react";
import AccountSidebar from "./AccountSidebar";
import Header from "../Header";
import { Link } from "react-router-dom";
import "./Acc-style.css";
import { useSelector } from "react-redux";
import { loginhistory } from "../../pages/utils/api_functions";
const LoginHIstory = () => {
  const {token} = useSelector((state)=>state.AuthReducer);
  const [history, setHistory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Email ID');
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
 

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(()=>{
    loginhistory(token)
    .then((res)=>{
      if(res.status==200) {
        setHistory(res.login_info)
      }
    })
  }, []);
  return (
    <div>
      <Header />
      <div className="d-flex">
        <AccountSidebar />
        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <h1 className="mt-4 mb-4 fw-bold table-heading">Login History</h1>
            <p className="gSPqhc">
              View login history of users who have accessed your Cashfree
              Account. Visit{" "}
              <Link className="text-success text-decoration-none">
                Access Management{" "}
              </Link>
              to update permissions
            </p>
            <div className="d-flex gap-4">
              <div className="dateslt">
                <div className="dropdown">
                  <button
                    className="fmRSig dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: "none", padding: "10px" }}
                    onClick={handleDropdownToggle}
                  >
                    Today{" "}
                    {isDropdownOpen ? (
                      <i className="fa-solid fa-chevron-up dropico"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-down dropico"></i>
                    )}
                  </button>
                  <ul
                    className={`dropdown-menu ${isDropdownOpen ? " show" : ""}`}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item active" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Last Month
                      </a>
                    </li>
                    <li>
                      <a href="" className="dropdown-item">
                        Custom Date range
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="">
                <div className="dropdown">
                  <button
                    className="fmRSig dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: "none", padding: "10px" }}
                    onClick={handleDropdownToggle2}
                  >
                    Search & Filter{" "}
                    {isDropdownOpen2 ? (
                      <i className="fa-solid fa-chevron-up dropico"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-down dropico"></i>
                    )}
                  </button>
                  <div
                    className={`dropdown-menu dropdwunmnu ${
                      isDropdownOpen2 ? " show" : ""
                    }`}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <div className="container p-4">
                      <div className="d-flex justify-content-end align-items-center gap-3 mb-3 mt-2">
                        <Link className="text-decoration-none text-success">Cancel</Link>
                        <button className="btn btn-success btn-sm">Apply</button>
                      </div>
                      <label htmlFor="">Search</label>
                      <div className="input-group mb-3">
                        
                          <select
                            className="form-select  text-dark"
                            aria-label="Default select example"
                            style={{
                              border: "none",
                              backgroundColor: "#e6e9ee",
                              padding:".375rem .75rem",
                              maxWidth:"40%",
                              height:"47px"
                            }}
                            value={selectedOption}
                            onChange={handleSelectChange}
                          >
                            <option selected>Email ID</option>
                            <option value="IP Address">IP Address</option>
                            <option value="Username">Username</option>
                          </select>
                      
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Enter ${selectedOption}`}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <label className="px-2 block pt-2 gSPqhc">Filters</label>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub-tab table-responsive mt-4">
              <table className="table">
                <thead className="table-head">
                  <tr>
                    <th scope="col">Last Login</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Username</th>
                    <th scope="col">IP Address</th>
                    <th>Device Type </th>
                    <th>Browser</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>

                  {history?.length>0?history.map((item)=>{
                    return(
                      <tr>
                      <td className="e2grw2-5">{new Date(item.timestamp).toLocaleString()}</td>
                      <td className="e2grw2-5">OWNER</td>
                      <td className="e2grw2-5">Business Name</td>
                      <td className="e2grw2-5">{item?.ip_address}</td>
                      <td className="e2grw2-5">
                        <i className="fa-solid fa-globe"></i>&nbsp;{item?.sys_info}
                      </td>
                      <td className="e2grw2-5">
                        <img src="images/chrome.svg" alt="" />
                        &nbsp;{item?.browser_info?.replace(/,,,/g, ' ')?.split('  ')[1]}
                      </td>
                      <td className="e2grw2-5">{item?.city?item.city:"NA"}</td>
                    </tr>
                    )
                  })
                  
                  :
                  
                  <tr>
                            <td className="text-center" colSpan={7}>
                           <div >
                        <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                        <p className="text-center text-secondary fw-bold">
                          No Record Found...
                        </p>
                        
                      </div>
                      </td>
                          </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHIstory;
