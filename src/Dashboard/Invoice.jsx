import React, { useEffect, useState } from "react";
import Menuitem from "../components/Menuitem";
import Header from "./Header";
import { Link } from "react-router-dom";
import { createInvoice, getAssetsUser, userAddress } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

const Invoice = () => {
  const {token} = useSelector((state)=>state.AuthReducer);
  const [invoice_data, setInvoiceData] = useState();
  const [isdataload, setIsDataLoad] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Email ID");
  const [selectedValue, setSelectedValue] = useState("Today");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false);
  const [selectedMessageType, setSelectedMessageType] = useState("Info");
  const [user_assest, setUserAssest] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [amount, setAmount] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [link_id, setLinkId] = useState();
  const [redirect_url, setUrl] = useState();
  const [term_condition, setTerm] = useState();
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleDropdownmodal = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  const handleCountryCodeChange = (countryCode) => {
    setSelectedCountryCode(countryCode);
    setIsDropdownOpen(false);
  };
  const handleMobileDropdownToggle = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };
  const handleMessageDropdownToggle = () => {
    setIsMessageDropdownOpen(!isMessageDropdownOpen);
  };

  const handleMessageTypeChange = (messageType) => {
    setSelectedMessageType(messageType);
    setIsMessageDropdownOpen(false);
  };

  useEffect(()=>{
    getAssetsUser(token)
    .then((res)=>{
      if(res.status==200) {
        setUserAssest(res.asset_data)
      }
    })
  }, [])
  let asset_data = user_assest && user_assest.map((item)=>{
    return (
      <option value={item.symbol}>{item.symbol}</option>
    )
  })
  useEffect(()=>{
    createInvoice(token)
    .then((res)=>{
      if(res.status ==200) {
        setInvoiceData(res.invoice);
        userAddress(token);
      }
    })
  }, [isdataload])

  const updateInvoice = () =>{
    let data = {
      description,
      type,
      amount,
      time:selectedValue,
      phone_number,
      email,
      name,
      link_id,
      redirect_url,
      custom_thank_message:selectedMessageType,
      term_condition,
      action:"set" 
    }
    createInvoice(token, data)
    .then((res)=>{
      if(res.status==200) {
        NotificationManager.success(res.message)
        setIsDataLoad(!isdataload);
      } else {
        NotificationManager.error(res.message)
      }
    })
  }

  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />
        <div className="container-fluid subdashbordmain ">
          <div className="pagewrapper">
            <div className="">
              <h1 className="mt-4 mb-3 fw-bold table-heading">Invoice</h1>
              <p className="gSPqhc">
                Efficiently Manage Finances and Track Payments with our
                Streamlined and Professional Invoice Management System
              </p>
            </div>
            <div className="mt-4">
              <div className="drop-div">
                <div className="d-flex gap-3">
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
                        className={`dropdown-menu ${
                          isDropdownOpen ? " show" : ""
                        }`}
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
                            <Link className="text-decoration-none text-success">
                              Cancel
                            </Link>
                            <button className="btn btn-success btn-sm">
                              Apply
                            </button>
                          </div>
                          <label htmlFor="">Search</label>
                          <div className="input-group mb-3">
                            <select
                              className="form-select  text-dark"
                              aria-label="Default select example"
                              style={{
                                border: "none",
                                backgroundColor: "#e6e9ee",
                                padding: ".375rem .75rem",
                                maxWidth: "40%",
                                height: "47px",
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

                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#payment"
                >
                  Create Payment
                </button>
              </div>
              <div className="sub-tab table-responsive">
                <table
                  id="example"
                  className="table table-hover"
                  style={{ width: "100%" }}
                >
                  <thead className="table-head">
                    <tr>
                      <th scope="col">Created At</th>
                      <th scope="col">Invoice Id</th>
                      <th scope="col">Amount</th>
                      <th>Email ID</th>
                      <th>Phone No.</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   

                    {invoice_data && invoice_data ? invoice_data.map((item)=>{
                      return (
                          // <td className="e2grw2-5"></td>
                          
                          <tr className="">
                            <td className="e2grw2-5">{new Date(item.createdAt).toLocaleString()}</td>
                            {/* <td className="e2grw2-5"><a href={`https://merchant.nute.io/Invoice-id?id=${item.order_id}`} target="_blank">{item.order_id}</a></td> */}
                            <td className="e2grw2-5"><a href={`http://localhost:3000/Invoice-id?id=${item.order_id}`} target="_blank">{item.order_id}</a></td>
                            <td className="e2grw2-5">{item.doller_amount}{item.type=="doller"?" $":" ₹"}</td>
                            <td className="e2grw2-5">{item.email?item.email:'NA'}</td>
                            <td className="e2grw2-5">{item.phone_number?item.phone_number:'NA'}</td>
                            <td className="e2grw2-5">{item.status==1?"Success":"Pending"}</td>
                          </tr>
                      )
                    }):
                    <tr>
                      <td className="text-center" colSpan={8}>
                        <div className="p-5 mt-5 mb-5">
                          {/* <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i> */}
                          <img
                            src="images/empytbox.svg"
                            alt=""
                            className="m-2"
                          />
                          <p className="text-center text-secondary fw-bold mb-1">
                            No payment links created yet
                          </p>
                          <small className="text-secondary">
                            Create and send payment links instantly to your
                            customers and collect payments.
                          </small>
                          <div className="m-3">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              data-bs-target="#payment"
                            >
                              Create Payment
                            </button>
                          </div>
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

      {/* payemt modal */}
      <div
        className="modal fade"
        id="payment"
        tabIndex="-1"
        aria-labelledby="paymentLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable payment-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentLabel">
                Create Payment Link
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-heading">Link Details</div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      checked
                    />
                    <label className="form-check-label " for="flexCheckDefault">
                      Create  Link <i className="fa-solid fa-circle-info"></i>
                    </label>
                  </div>
                </div>
                <div className="mt-2 ">
                  <label for="" className="form-label">
                    Payment For
                  </label>
                  <div className="form-floating mb-3">
                    <textarea
                      className="  textarea h-auto w-100 rounded"
                      placeholder="Description"
                      onChange={(e)=>{
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                    <small style={{ color: "#847f8d" }}>
                      Maximum 500 characters allowed
                    </small>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="input-group ">
                    <span
                      className="input-group-text p-0"
                      id="basic-addon1"
                      style={{ height: "47px" }}
                    >
                      <select
                        className="form-select border-0"
                        id="customSelect"
                        onChange={(e)=>{
                          setType(e.target.value);
                        }}
                      >
                        <option selected disabled>Please Select</option>
                        <option value="doller">$ (DOLLER)</option>
                        <option value="inr">₹ (INR)</option>
                        
                      </select>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Amount"
                      onChange={(e)=>{
                        setAmount(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckCheckedDisabled"
                        disabled
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckCheckedDisabled"
                      >
                        Allows Partial Payment
                      </label>
                    </div>
                  </div>
                  <div className="mt-2 mb-4">
                    <div className="dropdown">
                      <button
                        className="fmRSig dropdown-toggle w-100 d-flex align-items-center justify-content-between"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ border: "1px solid #dee2e6", padding: "10px" }}
                        onClick={() => setIsDropdownOpen3(!isDropdownOpen3)}
                      >
                        {selectedValue}{" "}
                        {isDropdownOpen3 ? (
                          <i className="fa-solid fa-chevron-up dropico"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-down dropico"></i>
                        )}
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          isDropdownOpen3 ? " show" : ""
                        }`}
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "12 hours" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("12 hours")}
                          >
                            12 hours
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "1 day" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("1 day")}
                          >
                            1 day
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "2 day" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("2 day")}
                          >
                            2 day
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "14 day" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("14 day")}
                          >
                            14 day
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "30 days" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("30 days")}
                          >
                            30 days
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item${
                              selectedValue === "Last Month" ? " active" : ""
                            }`}
                            href="#"
                            onClick={() => handleDropdownmodal("Last Month")}
                          >
                            Last Month
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() =>
                              handleDropdownmodal("Custom Date range")
                            }
                          >
                            Custom Date range
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <div className="form-heading">Customer Details</div>
                    <small className="text-secondary">
                      Payment link will be sent to the phone number and email ID
                    </small>
                    <div className="mt-3">
                      <label htmlFor="">Phone Number <span className="">Optional</span>
                      </label>
                      <div className="input-group ">
                        <span
                          className="input-group-text p-0"
                          id="basic-addon1"
                          style={{ height: "47px" }}
                        >
                          <div className="dropdown">
                            <button
                              className=" dropdown-toggle w-100 text-dark"
                              type="button"
                              id="dropdownMobileCode"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{
                                border: "1px solid #e6e9ee",
                                padding: "10px",
                                textAlign: "start",
                                background: "#e6e9ee",
                              }}
                              onClick={handleMobileDropdownToggle}
                            >
                              {selectedCountryCode}{" "}
                              {isMobileDropdownOpen ? (
                                <i className="fa-solid fa-chevron-up dropico"></i>
                              ) : (
                                <i className="fa-solid fa-chevron-down dropico"></i>
                              )}
                            </button>
                            <ul
                              className={`dropdown-menu ${
                                isMobileDropdownOpen ? " show" : ""
                              }`}
                              aria-labelledby="dropdownMobileCode"
                            >
                              <li>
                                <a
                                  className={`dropdown-item${
                                    selectedCountryCode === "+1"
                                      ? " active"
                                      : ""
                                  }`}
                                  href="#"
                                  onClick={() => handleCountryCodeChange("+1")}
                                >
                                  United States (+1)
                                </a>
                              </li>
                              <li>
                                <a
                                  className={`dropdown-item${
                                    selectedCountryCode === "+44"
                                      ? " active"
                                      : ""
                                  }`}
                                  href="#"
                                  onClick={() => handleCountryCodeChange("+44")}
                                >
                                  United Kingdom (+44)
                                </a>
                              </li>
                              {/* Add more country code options as needed */}
                            </ul>
                          </div>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone NUmber"
                          aria-describedby="basic-addon1"
                          onChange={(e)=>{
                            setPhoneNumber(e.target.value)
                          }}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          disabled
                        />
                        <label className="form-check-label" for="flexCheckDefault">
                          send Sms
                        </label>
                      </div>
                      <div className="mb-2 mt-2">
                        <label className="form-label">
                          Email ID 
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          aria-describedby="passwordHelpBlock"
                          placeholder="Email Address"
                          onChange={(e)=>{
                            setEmail(e.target.value);
                          }}
                        />
                        <div className="form-text">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              disabled
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              send Email
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 mt-2">
                        <label className="form-label">
                          Name <span className="">Optional</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="passwordHelpBlock"
                          placeholder="Name"
                          onChange={(e)=>{
                            setName(e.target.name)
                          }}
                        />
                      </div>
                      <hr />
                      <div className="form-heading mt-3">Invoice Settings</div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckCheckedDisabled"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckCheckedDisabled"
                        >
                          Enable Invoice After Successful Payment
                        </label>
                      </div>
                      <hr />
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="flush-headingOne">
                            <button
                              className="accordion-button collapsed p-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              <div className="">
                                <div className="form-heading text-dark">
                                  More Option
                                </div>
                                <div className="">
                                  <small className="text-secondary">
                                    Link ID, add notes, custom thanks message
                                    and enable/disable auto <br /> reminder
                                  </small>
                                </div>
                              </div>
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body p-0">
                              <div className="">
                                <div className="mt-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDisabled"
                                      disabled
                                    />
                                    <label
                                      className="form-check-label"
                                      for="flexCheckDisabled"
                                    >
                                      Send Auto Reminders
                                    </label>
                                  </div>
                                  <div className="">
                                    <small className="text-secondary">
                                      Contact your Account Manager to activate
                                      auto reminders
                                    </small>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <label className="form-label">
                                    Link ID <span className="">Optional</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Link ID"
                                    onChange={(e)=>{
                                      setLinkId(e.target.value)
                                    }}
                                  />
                                  <div id="passwordHelpBlock" className="form-text">
                                    Maximum 50 characters allowed
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <label className="form-label">
                                    Redirect URL{" "}
                                    <span className="">Optional</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="URL"
                                    onChange={(e)=>{
                                      setUrl(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="dropdown mt-3">
                                  <label htmlFor="">
                                    Custom Thanks Message
                                  </label>
                                  <button
                                    className="fmRSig dropdown-toggle w-100"
                                    type="button"
                                    id="dropdownMessageType"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                      border: "1px solid #dee2e6",
                                      padding: "10px",
                                      textAlign: "start",
                                      fontSize: "13px",
                                    }}
                                    onClick={handleMessageDropdownToggle}
                                  >
                                    {selectedMessageType}{" "}
                                    {isMessageDropdownOpen ? (
                                      <i className="fa-solid fa-chevron-up dropico"></i>
                                    ) : (
                                      <i className="fa-solid fa-chevron-down dropico"></i>
                                    )}
                                  </button>
                                  <ul
                                    className={`dropdown-menu ${
                                      isMessageDropdownOpen ? " show" : ""
                                    }`}
                                    aria-labelledby="dropdownMessageType"
                                    style={{ fontSize: "15px" }}
                                  >
                                    <li>
                                      <a
                                        className={`dropdown-item${
                                          selectedMessageType === "Info"
                                            ? " active"
                                            : ""
                                        }`}
                                        href="#"
                                        onClick={() =>
                                          handleMessageTypeChange(" No message")
                                        }
                                      >
                                        No message
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className={`dropdown-item${
                                          selectedMessageType === "order"
                                            ? " active"
                                            : ""
                                        }`}
                                        href="#"
                                        onClick={() =>
                                          handleMessageTypeChange(
                                            "Thank You for your Order!"
                                          )
                                        }
                                      >
                                        Thank You for your Order!
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className={`dropdown-item${
                                          selectedMessageType === "detail"
                                            ? " active"
                                            : ""
                                        }`}
                                        href="#"
                                        onClick={() =>
                                          handleMessageTypeChange(
                                            "Thank You for your Order! Please check E-Mail for further details!"
                                          )
                                        }
                                      >
                                        Thank You for your Order! Please check
                                        E-Mail for further details!
                                      </a>
                                    </li>
                                    {/* Add more message type options as needed */}
                                  </ul>
                                </div>
                                <div className="mt-3">
                                  <label className="form-label">
                                    Terms and Condition
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    onChange={(e)=>{
                                      setTerm(e.target.value)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="text-success" data-bs-dismiss="modal">
                Cancel
              </div>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal"
              onClick={()=>{
                updateInvoice()
              }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
