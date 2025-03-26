import React, { useState, useEffect } from "react";
import "./Domainverification.css";
import Header from "./Header";
import { Tooltip } from "react-tooltip";
import Menuitem from "../components/Menuitem";
import {
  deleteDomain,
  getDomainData,
  updateDomain,
} from "../pages/utils/api_functions";
import { NotificationManager } from "react-notifications";
import usePageMetadata from "../pages/usePageMetadata";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Domainverification = () => {
  usePageMetadata({
    title: "Verify Your Domain: Nute Payment Gateway Integration",
    description:
      "Ensure the security and authenticity of your domain for seamless payment gateway integration",
  });
  const { token } = useSelector((state) => state.AuthReducer);
  const [loader, isLoader] = useState(true);
  const [is_data, setIsData] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [domain_data, setDomainData] = useState([]);
  const [isloaddata, setIsLoadData] = useState(false);
  const [formData, setFormData] = useState({
    domain: "",
    ownerName: "nute._domainkey",
    verificationCode: "",
    status: 0,
  });
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = (text, setShowTooltip) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltipMessage("Copied");
        setShowTooltip(true);
      })
      .catch((err) => {
        console.error("Copy failed", err);
        setTooltipMessage("Copy failed");
        setShowTooltip(true);
      });
  };

  useEffect(() => {
    // Hide tooltip after 2 seconds
    const timeoutId = setTimeout(() => {
      setShowTooltip1(false);
      setShowTooltip2(false);
    }, 2000);

    return () => {
      // Clear the timeout if the component unmounts
      clearTimeout(timeoutId);
    };
  }, [showTooltip1, showTooltip2]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (formData.domain !== "" && selectedOption !== "") {
      console.log("condition met, updating current step");
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("condition not met, formData.domain is empty");
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // You can perform the final submission logic here
    updateDomain(formData, selectedOption, token).then((res) => {
      if (res.status == 200) {
        NotificationManager.success(res.message);
      } else {
        NotificationManager.error(res.message);
      }
    });
  };

  const deleteDomainId = (item) => {
    deleteDomain(token, item.domain).then((res) => {
      NotificationManager.success(res.message);
      setIsLoadData(!isloaddata);
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    getDomainData(token).then((res) => {
      if (res.status == 200) {
        let dt = res.domains_data;
        setDomainData(dt);
        setIsData(true);
        // if (res.domains_data.status == 1) {
        //   setDomainData(res.domains_data);
        //   setIsData(true);
        //   // const domain = dt.domain;
        //   // const value = dt.value;
        //   // setFormData((prevData) => ({
        //   //   ...prevData,
        //   //   ["domain"]: domain,
        //   //   ["verificationCode"]: value,
        //   // }));
        //   // setSelectedOption(dt.domain_provider);
        // } else if (dt.name && dt.value && dt.domain_provider) {
        //   const domain = dt.domain;
        //   const value = dt.value;
        //   setFormData((prevData) => ({
        //     ...prevData,
        //     ["domain"]: domain,
        //     ["verificationCode"]: value,
        //   }));
        //   setSelectedOption(dt.domain_provider);
        // }
      }
      isLoader(false);
    });
  }, [isloaddata]);

  function generateUniqueString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueString = "";

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueString += characters.charAt(randomIndex);
    }

    return uniqueString;
  }
  const handleAuthenticateClick = (item) => {
    const domain = item.domain;
    const value = item.value;
    const status = item.status;
    setFormData((prevData) => ({
      ...prevData,
      ["domain"]: domain,
      ["verificationCode"]: value,
      ["status"]: status,
    }));
    setSelectedOption(item.domain_provider);
    setCurrentStep(2);
    setIsData(false);
  };
  const Adddomain = () => {
    setCurrentStep(1);
    const value = generateUniqueString();
    setFormData({
      domain: "",
      ownerName: "nute._domainkey",
      verificationCode: value,
      status: 0,
    });
    setSelectedOption("");
    setIsData(false);
  };
  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />
        {loader ? (
          <div className="loader"></div>
        ) : (
          <div className="container-fluid subdashbordmain">
            <div className="pagewrapper">
              <div className="d-flex justify-content-between align-items-center">
                {" "}
                <div className="">
                  {" "}
                  <h1 className="mt-4 mb-3 fw-bold table-heading">Domain </h1>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill  "
                    onClick={Adddomain}
                  >
                    Add Domain
                  </button>
                </div>
              </div>
              <hr />
            </div>
            {domain_data && domain_data
              ? domain_data.map((item) => {
                  return (
                    <div className="pagewrapper">
                      <div className="Authenticate-div mt-4 ">
                        <div className="d-flex  align-items-center gap-3 ">
                          <div
                            className={item.status == 1 ? "globe" : "globe_red"}
                          >
                            <i
                              className={`fa-solid fa-globe ${
                                item.status == 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            ></i>
                          </div>
                          <div className="">
                            <p className="fw-bold text-dark mb-0 ">
                              https://{item.domain}
                            </p>
                            <small className="text-secondary">
                              {item.status == 1
                                ? "Authenticated"
                                : "Not Authenticated"}
                            </small>
                            <div className="d-flex justify-content-between align-items-center gap-5">
                              <Link
                                className="text-dark"
                                onClick={() => {
                                  handleAuthenticateClick(item);
                                }}
                              >
                                Authenticate
                              </Link>
                              <Link
                                className="text-dark"
                                onClick={() => {
                                  deleteDomainId(item);
                                }}
                              >
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  );
                })
              : null}
            {!is_data ? (
              <div className="pagewrapper">
                <div
                  className={`form-section ${currentStep === 1 && "active"}`}
                >
                  <h1 className="mt-4 mb-3 fw-bold table-heading">
                    Add a domain{" "}
                  </h1>
                  <hr className="" />
                  <form className="mt-3">
                    <div className="sib-div">
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Enter your domain <em className="text-danger">*</em>
                        </label>
                        <input
                          type="text"
                          id="domain"
                          name="domain"
                          value={formData.domain}
                          onChange={handleInputChange}
                          placeholder="Domain.com"
                          required
                          className="form-control"
                        />
                        <div
                          id="emailHelp"
                          className="form-text"
                          style={{ fontSize: "14px" }}
                        >
                          Example: mydomain.com <br />
                          Do not add “http”, “https”, “www”, or “\”.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Your domain provider{" "}
                          <em className="text-danger">*</em>
                        </label>
                        <div className="dropdown">
                          <button
                            className="fmRSig2 dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ border: "none", padding: "10px" }}
                            onClick={handleDropdownToggle}
                          >
                            {selectedOption || "Select an option"}
                            {isDropdownOpen ? (
                              <i className="fa-solid fa-chevron-up dropico"></i>
                            ) : (
                              <i className="fa-solid fa-chevron-down dropico"></i>
                            )}
                          </button>
                          <ul
                            className={`dropdown-menu${
                              isDropdownOpen ? " show" : ""
                            }`}
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a
                                className={`dropdown-item${
                                  selectedOption === "Amazon web service (AWS)"
                                    ? " active"
                                    : ""
                                }`}
                                href="#"
                                onClick={() =>
                                  handleOptionChange("Amazon web service (AWS)")
                                }
                              >
                                Amazon web service (AWS)
                              </a>
                            </li>
                            <li>
                              <a
                                className={`dropdown-item${
                                  selectedOption === "GoDaddy" ? " active" : ""
                                }`}
                                href="#"
                                onClick={() => handleOptionChange("GoDaddy")}
                              >
                                GoDaddy
                              </a>
                            </li>
                            <li>
                              <a
                                className={`dropdown-item${
                                  selectedOption === "Amen" ? " active" : ""
                                }`}
                                href="#"
                                onClick={() => handleOptionChange("Amen")}
                              >
                                Amen
                              </a>
                            </li>
                            <li>
                              <a
                                className={`dropdown-item${
                                  selectedOption === "Google Domains"
                                    ? " active"
                                    : ""
                                }`}
                                href="#"
                                onClick={() =>
                                  handleOptionChange("Google Domains")
                                }
                              >
                                Google Domains
                              </a>
                            </li>
                            <li>
                              <a
                                className={`dropdown-item${
                                  selectedOption === "Other" ? " active" : ""
                                }`}
                                href="#"
                                onClick={() => handleOptionChange("Other")}
                              >
                                Other
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div
                          id="emailHelp"
                          className="form-text"
                          style={{ fontSize: "14px" }}
                        >
                          If your domain provider is not listed, choose “Other”.
                        </div>
                      </div>

                      <div className=" d-grid gap-2 col-6">
                        <button
                          type="button"
                          className="btn btn-dark rounded-pill  "
                          onClick={handleNext}
                        >
                          save this domain
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className={`form-section ${currentStep === 2 && "active"}`}
                >
                  <div className="hstack gap-3 mt-4 mb-3">
                    <div className=" fw-bold table-heading fs-4">Authenticate</div>
                    <div className="vr  bg-dark" style={{ width: "4px" }}></div>
                    <div className=" fw-bold table-heading fs-4">
                      {formData.domain}{" "}
                    </div>
                  </div>
                  <hr className="" />

                  <div
                    className="alert alert-success d-flex gap-2 mt-5"
                    role="alert"
                  >
                    <i className="fa-solid fa-circle-info text-success fs-4"></i>
                    <div className="text-dark ">
                      Now, go to your <b>{selectedOption}</b> account and add
                      your DNS record(s). Read our detailed instructions on how
                      to add your DNS record. <br />
                      Contact our support if needed. We’re here to help.
                    </div>
                  </div>
                  <div className="mt-4 " style={{ width: "70%" }}>
                    <p className=" text-dark fw-bold mb-1 fs-6">
                      DNS records for domain authentication
                    </p>
                    <hr className="m-0" />

                    <div className="mt-4 mb-4">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="xmark-icon bg-success">
                          <i className="fa-solid fa-check  i-xmark"></i>
                        </div>
                        <div>
                          <p className="m-0 text-dark  dns-heading ">
                            DNS record
                          </p>
                        </div>
                      </div>

                      <div className="dns-data">
                        <div className="">
                          <label>Type</label>
                        </div>
                        <div className="">
                          <span>TXT</span>
                        </div>
                        <div className="">
                          <label>Record name</label>
                        </div>
                        <div className="" style={{ width: "500px" }}>
                          <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ background: "#f9fafc" }}
                          >
                            <div className="">{formData?.ownerName}</div>
                            <a
                              className="text-success"
                              onClick={() =>
                                copyToClipboard(
                                  formData?.ownerName,
                                  setShowTooltip1
                                )
                              }
                            >
                              copy
                            </a>
                          </div>
                        </div>
                        <div className="">
                          <label>Value</label>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center text-dark justify-content-between">
                            <div className="" style={{ width: "500px" }}>
                              <label>
                                <span
                                  className="text-dark text-break"
                                  style={{ fontSize: "14px" }}
                                >
                                  {formData.verificationCode}
                                </span>
                                <a
                                  className="m-4 text-success"
                                  role="button"
                                  tabIndex="0"
                                  name="copy_btn"
                                  onClick={() =>
                                    copyToClipboard(
                                      formData.verificationCode,
                                      setShowTooltip2
                                    )
                                  }
                                >
                                  Copy
                                </a>
                              </label>
                            </div>
                            <div className="">
                              <span
                                style={{
                                  marginRight: " 0.25rem",
                                  display: "flex;",
                                }}
                              >
                                <i
                                  class={`fa-solid ${
                                    formData.status == 1
                                      ? "fa-check text-success"
                                      : "fa-xmark text-danger"
                                  } fw-bold`}
                                ></i>
                              </span>
                              <span>
                                {formData.status == 1
                                  ? "Value matched."
                                  : "Value mismatched."}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex gap-2 col-6">
                      <button
                        type="button"
                        className="btn btn-dark rounded-pill  "
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        check Configration
                      </button>
                      <button
                        type="button"
                        className="btn btn-light text-dark fw-bold shadow-sm rounded-pill  "
                        onClick={() => {
                          setIsData(true);
                          setIsLoadData(!isloaddata);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Domainverification;
