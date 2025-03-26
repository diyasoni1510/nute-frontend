import React, { useState } from "react";
import "./Kyc.css";
import VerticalSidebar from "./VerticalSidebar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import FileUploader from "./FileUploader";
import Mobkyc from "./Mobkyc";
import { accountDetails, panBVerify, panVerify, sendAADHAROTPMobile, verifyAADHAROTPMobile } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
const Kyc = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const [formData, setFormData] = useState({
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
    step9: "",
  });

  const [currentStep, setCurrentStep] = useState(6);
  const [phone, setPhone] = useState("");
  const [pan_no, setPan_no] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [aadhar_otp, setIsAdharOtp] = useState(false);
  const [client_id, setClientId] = useState('');
  const [account_number, setAccountNumber]= useState('');
  const [ifsc_code, setIfscCode]= useState('');
  const [otp, setotp] = useState('');
  const [panName, setPanName] = useState('');
  const [business_type, setBusinessType] = useState('business');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updatePanKyc = () =>{
 panVerify(pan_no, panName, business_type, token)
    .then((res)=>{
      if(res.status == 200) {
        setPan_no('');
        setPanName('');
        setBusinessType('');
        nextStep()
      }
    })
  }

  const updateBPanKyc = () =>{
    let ttt = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    panBVerify(pan_no, ttt, token)
       .then((res)=>{
         if(res.status == 200) {
           setPan_no('');
           setPanName('');
           setBusinessType('');
           nextStep()
         }
       })
     }
const updateAccountDetails = () =>{
accountDetails(account_number, ifsc_code, token)
    .then((res)=>{
      if(res.status == 200) {
        nextStep()
      }
    })
  }
     

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const calculateProgress = () => {
    const totalSteps = 9;
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };
  const handlePhoneChange = (value, country, e, formattedValue) => {
    setPhone(value);
  };
  const isMobile = window.innerWidth >= 900;

  if (isMobile) {
  return (
    <>
    
      <div className="" style={{ height: "100%" }}>
        <div className="wizard-container">
          <VerticalSidebar totalSteps={9} currentStep={currentStep} />

          <div className="form_section">
            <div className="mb-5 p-0">
              {currentStep === 2 ||
              currentStep === 3 ||
              currentStep === 4 ||
              currentStep === 5 ||
              currentStep === 6 ||
              currentStep === 7 ||
              currentStep === 8 ||
              currentStep === 9 ? (
                <>
                  <a
                    className="text-decoration-none text-success "
                    onClick={prevStep}
                    style={{cursor:"pointer"}}
                  >
                    <i className="fa-solid fa-angle-left" />
                    Back
                  </a>
                  {/* <button type="button" onClick={prevStep}>
                    Back
                  </button> */}
                </>
              ) : (
                ""
              )}
            </div>
              <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
                <div className="">
                  <div className="step1_heading">
                    <div className="step-heading">Contact Information</div>
                    <div className="step-content">
                      We will be contacting you on the below details for any
                      account related updates
                    </div>

                    <div className="mt-4">
                      <div className="">
                        <label className="form-label formtxt">
                          Registered Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div className="mt-4">
              
                        <label className="form-label formtxt">Mobile Number</label>
                        <PhoneInput
                          country={"in"} // set default country to India
                          value={phone}
                          onChange={handlePhoneChange}
                          
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
                <Link className="text-decoration-none text-success" to="/dashboard">
                  Cancel
                </Link>

                {currentStep >= 9 ? (
                  <>
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={nextStep}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
              </div>

              <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
                <div className="">
                  <div className="step1_heading">
                    <div className="step-heading">Business PAN</div>
                    <div className="step-content">
                      We need PAN Details for KYC verification of Directors
                      ,Partners and Trustees. if you are the sale owner please
                      provide the business owner's details.
                    </div>

                    <div className="mt-4">
                      <div className="">
                        <label className="form-label formtxt">Business PAN</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="business pan"
                          onChange={(e)=>{
                            setPan_no(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="form-label formtxt">
                          Name as per PAN
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name as per pan"
                          onChange={(e)=>{
                            setPanName(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
                <Link className="text-decoration-none text-success" to="/dashboard">
                  Cancel
                </Link>

                {currentStep >= 9 ? (
                  <>
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={()=>{
                        setBusinessType("business")
                        updatePanKyc()}}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
              </div>

              <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
                <div className="">
                  <div className="step1_heading">
                    <div className="step-heading">Business Owner PAN</div>
                    <div className="step-content">
                      We need PAN details for KYC verification of Directors,
                      Partners, and Trustees. If you are the sole owner, please
                      provide the business owner's details.
                    </div>

                    <div className="mt-4">
                      <div className="">
                        <label className="form-label formtxt">
                          Business Owner PAN
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="business pan"
                          onChange={(e)=>{
                            setPan_no(e.target.value)
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="form-label formtxt">
                          Name as per PAN
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name as per pan"
                          onChange={(e)=>{
                            setPanName(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
                <Link className="text-decoration-none text-success" to="/dashboard">
                  Cancel
                </Link>

                {currentStep >= 9 ? (
                  <>
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={()=>{
                        setBusinessType("own")
                        updatePanKyc()}}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
              </div>

              <div className={`form-step ${currentStep === 4 ? "active" : ""}`}>
                <div className="">
                  <div className="step1_heading">
                    <div className="step-heading ">Business Details</div>
                    <div className="step-content">
                      We need this information to serve you better with the
                      payment products suited for your business.
                    </div>

                    <div className="mt-4">
                      <div className="">
                        <label className="form-label formtxt">
                          Business Owner PAN
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="business pan"
                          onChange={(e)=>{
                            setPan_no(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="" for="">
                        Select Business Type
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label className="form-check-label text-col-siz" for="inlineRadio1">
                          Private Limited
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label className="form-check-label text-col-siz" for="inlineRadio2">
                          Private Limited
                        </label>
                      </div>
                      <div className="alert alert-success text-start p-2" role="alert">
                      <i className="fa-solid fa-circle-info"></i>{" "}
                      <span className="fw-bold mr-5">Note:</span>
                      <span className="">
                      If your business type is not listed, verify the
                          business PAN specified in the previous step.
                      </span>
                    
                    </div>
                   
                    </div>
                  
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
                <Link className="text-decoration-none text-success" to="/dashboard">
                  Cancel
                </Link>

                {currentStep >= 9 ? (
                  <>
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={()=>{
                        setBusinessType("business")
                        updateBPanKyc()}}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
              </div>
              <div className={`form-step ${currentStep === 5 ? "active" : ""}`}>
                <div className="">
                  <div className="step1_heading">
                    <div className="step-heading">
                      Business Registration Details
                    </div>
                    <div className="step-content">
                      We require this information to verify your business.
                    </div>

                    <div className="mt-3">
                      
                        <label className="form-label formtxt">CIN</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="CIN"
                        />
                      
                    </div>

                    <div className="mt-3">
                      <label className="formtxt" for="">
                        GST IN
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label className="form-check-label text-col-siz" for="inlineRadio1">
                          I have GST
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label className="form-check-label text-col-siz" for="inlineRadio2">
                          I don't have GST
                        </label>
                      </div>
                      <div classNameName="d-flex align-items-center gap-2">
                        <label
                          className="form-check-label formtxt"
                          for="flexCheckChecked"
                        >
                          Business Address
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          />
                          <label
                            className="form-check-label text-col-siz"
                            for="flexCheckChecked"
                          >
                           checkbox
                          </label>
                        </div>
                      </div>
                      <label className="form-label formtxt mt-3">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Eter your city"
                      />
                      <label className="form-label formtxt mt-3">Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="enter your pin code"
                      />
                      <label className="form-label formtxt mt-3">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="state"
                      />
                      <label className="form-label formtxt mt-3">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter your country code "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`form-step ${currentStep === 6 ? "active" : ""}`}>
                <div className="step1_heading">
                  <div className="step-heading">Bank Account Details</div>
                  <div className="step-content">
                    We need your bank account details to process settlements and
                    to recharge your payout wallet.
                  </div>

                  <div className="mt-4">
                    <label className="form-label formtxt">Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Account Number"
                      onChange={(e)=>{
                        setAccountNumber(e.target.value)
                      }}
                    />
                  </div>

                  <div className="mt-3">
                   
                      <div className="alert alert-success text-start p-2" role="alert">
                      <i className="fa-solid fa-circle-info"></i>{" "}
                      <span className="fw-bold mr-5">Note:</span>
                      <span className="">
                      To verify the account details, we will deposit a small <br />
                        amount to your account.
                      </span>
                    
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    <label className="form-label formtxt">IIFC</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your IIFSC "
                      onChange={(e)=>{
                        setIfscCode(e.target.value)
                      }}
                    />

                    
                  </div>
                 
                    <FileUploader />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
                <Link className="text-decoration-none text-success" to="/dashboard">
                  Cancel
                </Link>

                {currentStep >= 9 ? (
                  <>
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={()=>{
                        updateAccountDetails()
                      }}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
              </div>
              <div className={`form-step ${currentStep === 7 ? "active" : ""}`}>
                <div className="step1_heading">
                  <div className="step-heading">Website Details</div>
                  <div className="step-content">
                    We need to verify your website/app to provide you the live
                    API keys.
                  </div>

                  <div className="mt-3">
                    <label className="form-label formtxt">Website Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Website Link"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label formtxt">App Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="App Link"
                    />
                  </div>
                  <div
                    className="accordion accordion-flush mt-4"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button collapsed accbtn"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <div className="">
                            <p className="fw-bold text-dark m-0">
                              Policy links we will verify in your Website
                            </p>
                            <p className="step-content">
                              These policies are mandated by RBI to accept
                              online payments
                            </p>
                          </div>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="">
                            <ul className="accul">
                              <li>Contact Us Page</li>
                              <li>Privacy Policy</li>
                              <li>Shipping & Delivery</li>
                              <li>Terms & Condition</li>
                              <li>Refund & Cancellation </li>
                              <li>Checkout Page</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="form-label formtxt">Contact Us</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=" "
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label formtxt">Terms & Condition</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=" "
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label formtxt">Privacy Policy</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=" "
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label formtxt">
                      Refund and cancellation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=" "
                    />
                  </div>
                </div>
              </div>
              <div className={`form-step ${currentStep === 8 ? "active" : ""}`}>
                <div className="step1_heading">
                  <div className="step-heading">Business Owner Details</div>
                  <div className="step-content">
                    We need the ID proof of the business owner for verification
                    purposes.
                  </div>

                  <div className="mt-4">
                    <label className="form-label step-content fw-bold">
                      Confirm your Politically Exposed Person status
                    </label>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDisabled"
                        id="flexRadioDisabled"
                      />
                      <label
                        className="form-check-label text-col-siz"
                        for="flexRadioDisabled"
                      >
                        I’m not a Politically Exposed Person
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDisabled"
                        id="flexRadioCheckedDisabled"
                        checked
                      />
                      <label
                        className="form-check-label text-col-siz"
                        for="flexRadioCheckedDisabled "
                      >
                        I’m a Politically Exposed Person
                      </label>

                     
                    </div>
                    <label className="form-label step-content mt-2 fw-bold">
                        Choose an option to proceed with verification
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                        />
                        <div className="d-flex gap-4">
                          <label
                            className="form-check-label m-0 text-col-siz"
                            for="flexRadioDisabled"
                          >
                            Aadhaar Number
                          </label>
                          <div className="">
                            <p className="text-warning">Faster verification</p>
                          </div>
                        </div>
                        <div className="mt-4">
                      <div className="mt-4">
                        <label className="form-label formtxt">AADHAR</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="business adhar"
                          onChange={(e)=>{
                            setAadhar(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mt-4">
                      <button
                      className="btn btn-success text-light"
                      type="button"
                      onClick={()=>{
                        sendAADHAROTPMobile(aadhar, token)
                        .then((res)=>{
                          if(res.status == 200) {
                            setClientId(res.client_id)
                            setIsAdharOtp(true);
                          }
                        })
                      }}
                    >
                      Continue
                    </button>
                      </div>
                      {aadhar_otp?
                      <>
                      <div className="mt-4">
                        <label className="form-label formtxt">
                          OTP
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="otp"
                          onChange={(e)=>{
                            setotp(e.target.value)
                          }}
                        />
                      </div>
                         <div className="mt-4">
                         <button
                         className="btn btn-success text-light"
                         type="button"
                         onClick={()=>{
                          verifyAADHAROTPMobile(client_id, otp, token)
                           .then((res)=>{
                             if(res.status == 200) {
                               nextStep()
                             }
                           })
                         }}
                       >
                         submit
                       </button>
                         </div></>:null}
                    </div>
                      </div>
                  </div>

                  <div className="mt-3">
                    <div className="alert alert-success text-start p-2" role="alert">
                      <i className="fa-solid fa-circle-info"></i>{" "}
                      <span className="fw-bold mr-5">Note:</span>
                      <span className="">
                        OTP will be sent to the mobile number linked to this
                        aadhaar.
                      </span>
                    </div>
                  </div>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label step-content"
                      for="flexCheckDefault"
                    >
                      By verifying my Aadhaar, I confirm that I am the
                      beneficial owner of the (Company Name) company/public
                      limited company/ trust/ society/association of persons
                      (Entity"). I agree and acknowledge that l am entering into
                      a partnership with Cashfree Payments Private Ltd. to avail
                      services on behalf of (Company Name).
                    </label>
                  </div>
                  <div className="mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                      />
                      <div className="d-flex gap-4">
                        <label
                          className="form-check-label m-0 text-col-siz"
                          for="flexRadioDisabled"
                        >
                          Aadhaar Number
                        </label>
                        <div className="">
                          <p className="text-warning">
                            Document verification may take longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="form-label step-content mt-3">
                    Select ID Proof and Upload
                  </label>
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Aadhar card</option>
                    <option value="1">Voter ID</option>
                    <option value="2">Pan Card</option>
                    <option value="3">Passport</option>
                  </select>
                </div>
              </div>

              <div className={`form-step ${currentStep === 9 ? "active" : ""}`}>
                <div className="step1_heading">
                  <div className="step-heading">Declaration of Beneficial Ownership</div>
                  <div className="step-content">
                  We would need the declaration of beneficial ownership by your business directors/trustees/partners.
                  </div>

                  <div className="mt-4">
                    <label className="form-label step-content fw-bold">
                    Choose an option to proceed
                    </label>
                    <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                        />
                        <div className="d-flex ">
                          <label
                            className="form-check-label m-0 text-col-siz fw-bold"
                            for="flexRadioDisabled"
                          >
                           Upload ID Proof Soft Copy
                           <p className="m-0 text-col-siz fw-normal"> Download the template and upload the signed agreement.</p>
                          </label>
                        
                          <div className="">
                            <p className="text-warning">5 Attempts left</p>
                          </div>
                        </div>
                      </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDisabled"
                        id="flexRadioCheckedDisabled"
                        checked
                      />
                      <label
                        className="form-check-label text-col-siz fw-bold"
                        for="flexRadioCheckedDisabled "
                      >
                       Manually sign and Upload
                       <p className="m-0 text-col-siz fw-normal"> Download the template and upload the signed agreement.</p>
                      </label>
                     
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="alert alert-success text-start p-2" role="alert">
                      <i className="fa-solid fa-circle-info"></i>{" "}
                      <span className="fw-bold mr-5">Note:</span>
                      <span className="">
                      Only the business/director/trustee <em className="fw-bold fst-normal">(Company Name)</em> should sign the document.
                      </span>
                    </div>
                  </div>
                  <div className=" mt-3">
                    <label for="exampleFormControlInput1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </>
  );
                }else{
                  return <Mobkyc/>
                }
};

export default Kyc;
