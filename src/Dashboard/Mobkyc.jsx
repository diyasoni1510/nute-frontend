import React, { useState } from "react";
import "./Form.css";
import Header from "./Header";
import PhoneInput from "react-phone-input-2";
import FileUploader from "./FileUploader";
import { Link } from "react-router-dom";
const Mobkyc = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const stepNames = [
    "Contact Information",
    "Business PAN",
    "Business Owner PAN",
    "Business Details",
    "Business Registration Details",
    "Bank Account Details",
    "Website Details",
    "Business Owner Details",
    "Details of Beneficial Ownership",
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      console.log("next Step Clicked");
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    console.log("Prev Step Clicked");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBullets = () => {
    const bullets = [];
    for (let i = 1; i <= totalSteps; i++) {
      bullets.push(
        <React.Fragment key={i}>
          <div
            className={`bullet ${currentStep === i ? "active-bullet" : ""}`}
          ></div>
          {i !== totalSteps && <div className="bullet-line"></div>}
        </React.Fragment>
      );
    }
    return bullets;
  };

  const renderFormContent = () => {
    // Conditionally render the form content based on the current step
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We will be contacting you on the below details for any account
              related updates
            </p>

            <div className="mt-4">
              <div className="">
                <label className="form-label formtxt">Registered Email</label>
                <input
                  type="email"
                  className="form-control inputform-custom"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mt-4">
                <label className="form-label formtxt">Mobile Number</label>
               <div className="mob-phn-inp">
               <PhoneInput
                  country={"in"} // set default country to India
                  value=""
                />
               </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label
                    className="form-check-label heading-p mb-0 pt-1 "
                    for="flexCheckDefault"
                  >
                    Recive account updates via whatsapp
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need PAN Details for KYC verification of Directors ,Partners
              and Trustees. if you are the sale owner please provide the
              business owner's details.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">Business PAN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="Business PAN"
              />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">Name as per PAN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="Name as per PAN"
              />
            </div>
          </div>
          </>
        );
      case 3:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need PAN details for KYC verification of Directors, Partners,
              and Trustees. If you are the sole owner, please provide the
              business owner's details.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">Business Owner PAN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="Business Owner PAN"
              />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">Name as per PAN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="Name as per PAN"
              />
            </div>
          </div>
          </>
        );
      case 4:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need this information to serve you better with the payment
              products suited for your business.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">Business Owner PAN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="Business Owner PAN"
              />
            </div>
            <div className="mt-4">
              <label className="formtxt" for="">
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
                <label
                  className="form-check-label text-col-siz"
                  for="inlineRadio1"
                >
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
            </div>
            <div className="mt-2">
              <div
                className="alert alert-success text-start p-2 lh-1 "
                role="alert"
              >
                <i className="fa-solid fa-circle-info"></i>{" "}
                <span className="fw-bold mr-5" style={{ fontSize: "15px" }}>
                  Note:
                </span>
                <span className="" style={{ fontSize: "12px" }}>
                  If your business type is not listed, verify the business PAN
                  specified in the previous step.
                </span>
              </div>
            </div>
          </div>
          </>
        );
      case 5:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We require this information to verify your business.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">CIN</label>
              <input
                type="text"
                className="form-control inputform-custom"
                id="exampleFormControlInput1"
                placeholder="CIN"
              />
            </div>
            <div className="mt-4">
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
                <label
                  className="form-check-label text-col-siz"
                  for="inlineRadio1"
                >
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
                  I dont have GST
                </label>
              </div>
            </div>

            <div classNameName="mt-2">
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
            <div className="mt-4">
              <label className="form-label formtxt">City</label>
              <input
                type="text"
                className="form-control inputform-custom"
                id="exampleFormControlInput1"
                placeholder="city"
              />
              <div className="mt-4">
                <label className="form-label formtxt">Pincode</label>
                <input
                  type="text"
                  className="form-control inputform-custom"
                  id="exampleFormControlInput1"
                  placeholder="enter your pincode"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">State</label>
              <input
                type="text"
                className="form-control inputform-custom"
                id="exampleFormControlInput1"
                placeholder="enter your state"
              />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">Country</label>
              <input
                type="text"
                className="form-control inputform-custom"
                id="exampleFormControlInput1"
                placeholder="enter your country code"
              />
            </div>
          </div>
          </>
        );
      case 6:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need your bank account details to process settlements and to
              recharge your payout wallet.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">Account Number</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="enter your account number"
              />
            </div>

            <div className="mt-2">
              <div
                className="alert alert-success text-start p-2 lh-1 "
                role="alert"
              >
                <i className="fa-solid fa-circle-info"></i>{" "}
                <span className="fw-bold mr-5" style={{ fontSize: "15px" }}>
                  Note:
                </span>
                <span className="" style={{ fontSize: "12px" }}>
                  To verify the account details, we will deposit a small amount
                  to your account.
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">IIFSC Code</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="enter your iifsc code"
              />
            </div>
            <FileUploader />
          </div>
        </>
        );
      case 7:
        return (
          <>
          <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need to verify your website/app to provide you the live API
              keys.
            </p>

            <div className="mt-4">
              <label className="form-label formtxt">Website Link</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="enter Website Link "
              />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">App Link</label>
              <input
                type="text"
                className="form-control inputform-custom"
                placeholder="enter App Link"
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
                        These policies are mandated by RBI to accept online
                        payments
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
            <div className="mt-4">
              <label className="form-label formtxt">Contact Us</label>
              <input type="text" className="form-control inputform-custom" />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">Terms & Condition</label>
              <input type="text" className="form-control inputform-custom" />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">Privacy Policy</label>
              <input type="text" className="form-control inputform-custom" />
            </div>
            <div className="mt-4">
              <label className="form-label formtxt">
                Refund and cancellation
              </label>
              <input type="text" className="form-control inputform-custom" />
            </div>
          </div>
          </>
        );

      case 8:
        return (
          <> <a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
         
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We need the ID proof of the business owner for verification
              purposes.
            </p>

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
            </div>

            <div className="mt-4">
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
              </div>
            </div>
            <div className="mt-2">
              <div
                className="alert alert-success text-start p-2 lh-1 "
                role="alert"
              >
                <i className="fa-solid fa-circle-info"></i>{" "}
                <span className="fw-bold mr-5" style={{ fontSize: "15px" }}>
                  Note:
                </span>
                <span className="" style={{ fontSize: "12px" }}>
                  OTP will be sent to the mobile number linked to this aadhaar
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="form-check ">
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
                  By verifying my Aadhaar, I confirm that I am the beneficial
                  owner of the (Company Name) company/public limited company/
                  trust/ society/association of persons (Entity"). I agree and
                  acknowledge that l am entering into a partnership with
                  Cashfree Payments Private Ltd. to avail services on behalf of
                  (Company Name).
                </label>
              </div>
            </div>
            <div className="mt-4">
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
            <div className="mt-4">
              <label className="form-label step-content mt-3">
                Select ID Proof and Upload
              </label>
              <select className="form-select " aria-label="Default select example">
                <option selected>Aadhar card</option>
                <option value="1">Voter ID</option>
                <option value="2">Pan Card</option>
                <option value="3">Passport</option>
              </select>
            </div>
          </div>
          </>
        );
      case 9:
        return (
<>
<a className="text-decoration-none text-success" onClick={prevStep}  style={{cursor:"pointer"}}>
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
          <div className="bg-form p-2 rounded">
            <p className="heading-p">
              We would need the declaration of beneficial ownership by your
              business directors/trustees/partners.
            </p>

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
                <div className=" ">
                  <label
                    className="form-check-label m-0 text-col-siz fw-bold"
                    for="flexRadioDisabled"
                  >
                    Upload ID Proof Soft Copy
                    <p className="m-0 text-col-siz fw-normal">
                      {" "}
                      Download the template and upload the signed agreement.
                    </p>
                  </label>

                  <p className="text-warning" style={{ maxWidth: "90px" }}>
                    5 Attempts left
                  </p>
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
                  <p className="m-0 text-col-siz fw-normal">
                    {" "}
                    Download the template and upload the signed agreement.
                  </p>
                </label>
              </div>
            </div>

            <div className="mt-2">
              <div
                className="alert alert-success text-start p-2 lh-1 "
                role="alert"
              >
                <i className="fa-solid fa-circle-info"></i>{" "}
                <span className="fw-bold mr-5" style={{ fontSize: "15px" }}>
                  Note:
                </span>
                <span className="" style={{ fontSize: "12px" }}>
                  Only the business/director/trustee (Company Name) should sign
                  the document
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label formtxt"> Email address</label>
              <input
                type="email"
                className="form-control inputform-custom"
                placeholder="name@example.com"
              />
            </div>
          </div>
          </>
        );

      // Add cases for other steps and define form content
      default:
        return null;
    }
  };

  return (
    <>
      <Header setLogin={props.setLogin}/>
     
      <div className="form-wrapper-horizontal ">
        <div className="form-container-horizontal container-fluid">
          <div className="progress-bar-horizontal">{renderBullets()}</div>
          <div className="d-flex justify-content-between">
            <div className="arrow-icon" onClick={prevStep}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className="arrow-icon" onClick={nextStep}>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div className="form-content-horizontal">
            {/* Render the current step name dynamically */}
            <div className="step-name">{stepNames[currentStep - 1]}</div>
          </div>
        </div>
      </div>
      <div className="container-fluid"> {renderFormContent()}</div>
      <div className="d-flex  gap-2 d-md-flex justify-content-end  gap-3  align-items-center kycfooter ">
        <Link className="text-decoration-none text-success" to="/dashboard">
          Cancel
        </Link>

        {currentStep >= 9 ? (
          <>
            <button className="btn btn-success text-light" type="button ">
              submit
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
    </>
  );
};

export default Mobkyc;
