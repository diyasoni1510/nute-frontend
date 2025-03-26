import React, { useState } from "react";
import Header from "../Header";
import AccountSidebar from "./AccountSidebar";
import "./Acc-style.css"
import Setpassword from "./Setpassword";
import { useSelector } from "react-redux";
import { sendOTP, verifyOTPEmail } from "../../pages/utils/api_functions";
import { NotificationManager } from "react-notifications";
const Myinformation = () => {
  const {token, profile} = useSelector((state)=>state.AuthReducer);
  const [showInputs, setShowInputs] = useState(false);
  const [showemailInputs, setShowemailInputs] = useState(false);
  const [showephoneInputs, setShowphoneInputs] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerSupportEmail, setCustomerSupportEmail] = useState("");
  const [Email, setEmail] = useState();
  const [phone, setPhone] = useState("xxxxxxxx90");
  const [otp, setotp] = useState();
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [emailError, setEmailError] = useState("");

  const handleAddField = () => {
    setShowInputs(true);
  };
    const EditemailField = () => {
      setShowemailInputs(true);
  };
  const EditphoneField = () => {
    setShowphoneInputs(true);
};

  const handleSave = () => {
    // Handle the logic for saving the input fields
    console.log("Saving input fields:", inputFields);
    setShowInputs(false);
  };

  const handleCancel = () => {
    // Handle the logic for canceling and hiding the input fields
    setShowInputs(false);
  
    setInputFields([{ value: "" }]);
  };

  const handleeditCancel = () => {
    // Handle the logic for canceling and hiding the input fields
    setShowemailInputs(false);
  
    setInputFields([{ value: "" }]);
  };

  const handlephoneCancel = () => {
    // Handle the logic for canceling and hiding the input fields
    setShowphoneInputs(false);
  
    setInputFields([{ value: "" }]);
  };
  const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setCustomerSupportEmail(newEmail);

    if (newEmail.trim() === "") {
      setEmailError("Email is required");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const EmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (newEmail.trim() === "") {
      setEmailError("Email is required");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
 
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;
  
  if (!/^\d+$/.test(newPhone)) {
    // If the input is not a number, do not update the state
    return;
  }

  setPhoneNumber(newPhone);

  if (newPhone.trim() === "") {
    setPhoneError("Phone number is required");
  } else if (!validatePhoneNumber(newPhone)) {
    setPhoneError("Invalid phone number format. Enter 10 digits.");
  } else {
    setPhoneError("");
  }
  };

  return (
    <>
      <Header />

      <div className="d-flex">
        <AccountSidebar />

        <div className="container-fluid subdashbordmain">
          <div className=" pagewrapper">
            <h1 className="mt-4 mb-4 fw-bold table-heading">My information</h1>
            <div className="Acc-wrapper">
              <div className="mycaacount-div">
              <div className="jcfdwc">
                  <div
                    id="nameField"
                    direction="column"
                    className=" hSqjqe"
                  >
                    <div className="gSPqhc">
                      Name
                    </div>
                    <div className="cEyA-dc">
                      {profile?.name?profile?.name:profile?.email?.split('@')[0]}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center jcfdwc">
                  <div
                    id="nameField"
                    direction="column"
                    className=" hSqjqe"
                  >
                    <div className="gSPqhc">
                      Email ID
                    </div>
                    {showemailInputs ? (
                      <>
                      <div className="input-ui">
                      <input
                        placeholder="Customer Support email ID"
                        type="text"
                        className={`form-control ${
                          emailError ? "is-invalid" : ""
                        } ${!emailError && validateEmail(Email) ? "is-valid" : ""}`}
                        value={Email}
                        onChange={EmailChange}
                      />
                      </div>
                      {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                      )}
                      {!emailError && validateEmail(Email) && (
                        <div className="valid-feedback">Email is valid!</div>
                      )}
                        
                        <div className="d-flex align-items-center justify-content-end gap-3 mt-2">
                        <div
                            type="button"
                            className="text-success"
                            onClick={handleeditCancel}
                          >
                            Cancel
                          </div>
                          <button
                            type="button"
                            className="btn btn-success me-2"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop2"
                            disabled={!!emailError || !validateEmail(Email)}
                            onClick={()=>{
                              sendOTP(token, Email, 'changeEmail')
                                .then((d)=>{
                                  if (d.status == 200) {
                                  NotificationManager.success(d.message);
                                  }
                                });
                            }}
                            
                          >
                            Verify Changes
                          </button>
                         
                        </div>
                      </>
                    ) : (
                      <div className="cEyA-dc">
                        {profile?.email}
                      </div>
                    )}
                  </div>
                  {!showemailInputs && (
                    <div className="text-success d-flex align-items-center" onClick={EditemailField}>
                      <i className="fa-solid fa-pen" style={{ marginRight: "3px" }}></i>
                      <span>Edit</span>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center jcfdwc">
                  <div
                    id="nameField"
                    direction="column"
                    className=" hSqjqe"
                  >
                    <div className="gSPqhc">
                      Phone Number
                    </div>
                    {showephoneInputs ? (
                      <>
                      <div className="input-ui">
                      <input
                            placeholder="Phone number"
                            type="text"
                            className={`form-control ${
                              phoneError ? "is-invalid" : ""
                            } ${
                              !phoneError && validatePhoneNumber(phoneNumber)
                                ? "is-valid"
                                : ""
                            }`}
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                          />
                        </div>
                        {phoneError && (
                          <div className="invalid-feedback">{phoneError}</div>
                        )}
                        {!phoneError &&
                          validatePhoneNumber(phoneNumber) && (
                            <div className="valid-feedback">
                              Phone number is valid!
                            </div>
                          )}
                        <div className="d-flex align-items-center justify-content-end gap-3 mt-2">
                        <div
                            type="button"
                            className="text-success"
                            onClick={handlephoneCancel}
                          >
                            Cancel
                          </div>
                          <button
                            type="button"
                            className="btn btn-success me-2"
                            
                            disabled={!!emailError || !validateEmail(phone)}
                          >
                            Verify Changes
                          </button>
                         
                        </div>
                      </>
                    ) : (
                      <div className="cEyA-dc">
                         {profile?.mobile_number?profile.mobile_number:"xxxxxx8909"}
                      </div>
                    )}
                  </div>
                  {!showephoneInputs && (
                    <div className="text-success d-flex align-items-center" onClick={EditphoneField}>
                      <i className="fa-solid fa-pen" style={{ marginRight: "3px" }}></i>
                      <span>Edit</span>
                    </div>
                  )}
                    
                    {/* <div className="cEyA-dc">
                    xxxxxx8909
                    </div> */}
                  
                </div>
                <div className="d-flex  justify-content-between align-items-center jcfdwc">
                  
                    <div className="gSPqhc">
                    Account Password
                    </div>
                   <div className="">
                   <Setpassword/>
                   </div>
                  
                </div>
              </div>
              <div className="">
              <div className="d-flex justify-content-between align-items-center jcfdwc2">
                  <div id="nameField" direction="column" className="hSqjqe w-100">
                    <div className="gSPqhc">Customer Support Email ID</div>
                    {showInputs ? (
                      <>
                      <div className="input-ui">
                      <input
                        placeholder="Customer Support email ID"
                        type="text"
                        className={`form-control ${
                          emailError ? "is-invalid" : ""
                        } ${!emailError && validateEmail(customerSupportEmail) ? "is-valid" : ""}`}
                        value={customerSupportEmail}
                        onChange={handleEmailChange}
                      />
                      </div>
                      {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                      )}
                      {!emailError && validateEmail(customerSupportEmail) && (
                        <div className="valid-feedback">Email is valid!</div>
                      )}
                        
                        <div className="d-flex align-items-center justify-content-end gap-3 mt-2">
                        <div
                            type="button"
                            className="text-success"
                            onClick={handleCancel}
                          >
                            Cancel
                          </div>
                          <button
                            type="button"
                            className="btn btn-success me-2"
                            onClick={handleSave}
                            disabled={!!emailError || !validateEmail(customerSupportEmail)}
                          >
                            Save Changes
                          </button>
                         
                        </div>
                      </>
                    ) : (
                      <div className="YWpLX">
                        Your Customer will reach out to you on this Email ID
                      </div>
                    )}
                  </div>
                  {!showInputs && (
                    <div className="text-success d-flex align-items-center" onClick={handleAddField}>
                      <i className="fa-solid fa-plus" style={{ marginRight: "3px" }}></i>
                      <span>Add</span>
                    </div>
                  )}
                </div>
              
              </div>
            </div>
            
          </div>
        </div>
        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered ">
    <div className="modal-content">
      <div className="modal-header" style={{background:"#e6e9ee"}}>
        <h5 className="modal-title" id="staticBackdropLabel">Email OTP</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="">
            <label for="Fiat" className="text-muted">
              OTP
            </label>{" "}
            <input
              type="number"
              className="form-control"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal"
        onClick={(e)=>{
          verifyOTPEmail(token, 0, otp, "changeEmail")
          .then((res)=>{
            if(res.status==200) {
              NotificationManager.success(res.message)
              window.location.reload();
            } else {
              NotificationManager.error(res.message)
            }
          })
        }}
        >Confirm</button>
      </div>
    </div>
  </div>
</div> 
      </div>
    </>
  );
};

export default Myinformation;
