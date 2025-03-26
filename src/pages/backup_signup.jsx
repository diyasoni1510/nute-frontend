import React, { useState, useRef, useEffect } from "react";
import Sidebanner from "./Sidebanner";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import {sendEmailOtp, socialLogin, verifyOTP } from "./utils/api_functions";
import { useGoogleLogin } from "@react-oauth/google";
import { NotificationManager } from "react-notifications";
const Signup = () => {
  const bannerheading = "Why Choose Nute Payment";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate()
  let login = localStorage.getItem("islogin");

  useEffect(() => {
    if (login) {
      navigate("../", { replace: true });
    }
  }, [login]);

  const validateLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one number, one uppercase letter, and be at least 6 characters"
      );
      return;
    }
    sendEmailOTP();
  };

  const sendEmailOTP = () =>{
    if(email && password) {
      sendEmailOtp(email, password)
      .then((res)=>{
        if(res.status == 200) {
          setIsOTPSent(true);
          setErrorMessage("varification code sent successful, Please check Your Email")
        } else {
          setErrorMessage(res.message)
        }
      })
    } else {
      setErrorMessage("Fill all Data")
    }
    
    
  }

  const handleInputChange = (event, index) => {
    const inputValue = event.target.value;
    
   
    if (!isNaN(inputValue) && inputValue.length <= 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = inputValue;
        return newOtp;
      });
      // Focus on the next input if a digit is entered
      if (inputValue !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }

    // Perform your verification logic here if needed
    if (index + 1 === 6) {
      const fullOtp = otp.join('');
      let nOtp = fullOtp+inputValue;
      verifyUserOtp(nOtp);
    }
  };

  const handleInputKeyDown = (event, index) => {
    // Handle backspace to focus on the previous input
    if (event.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const otp_send = () =>{ 
    if(phone) {
      console.log("phone", phone);
    }

  }
  const verifyUserOtp = (otp) =>{
    verifyOTP(email, phone, otp)
    .then((res)=>{
      if(res.status==200) {
        localStorage.setItem("nute-token", res.token);
        localStorage.setItem("islogin", true);
        navigate("../", { replace: true });
      }
    })
  }
  const handlePhoneChange = (value, country, e, formattedValue) => {
    setPhone(formattedValue);
  };
  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add("my-page-background");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("my-page-background");
    };
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      socialLogin(codeResponse.access_token).then((res) => {
        if (res.status) {
          NotificationManager.success(res.message);
          localStorage.setItem("nute-token", res.token);
          localStorage.setItem("islogin", true);
          navigate("../", { replace: true });
        } else {
          NotificationManager.success(res.message);
        }
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
     

      <div className="container">
      <div className="loginform">
        <div className="loginheading d-flex  gap-3 align-items-baseline">
          <div>
            <p>Facing Any Issue ?</p>
          </div>
          <div>
            <button type="button" className="btn btn-outline-success">
              Contact Us
            </button>
          </div>
        </div>
        <div style={{ margin: "100px auto" }}>
          <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active loginform_button "
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Email
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link loginform_button"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Mobile
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="">
              {isOTPSent?
              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="lg_form">
                <label htmlFor="" className="form-label fs-5 mt-3">
                    OTP
                  </label>
                  <div className="otp-input-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="otp-input"
                        value={digit}
                        onChange={(event) => handleInputChange(event, index)}
                        onKeyDown={(event) => handleInputKeyDown(event, index)}
                        maxLength={1}
                        ref={(inputRef) =>
                          (inputRefs.current[index] = inputRef)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>:
              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="lg_form">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Register Email address
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="user@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                     <div className="mb-3">
                     <label for="exampleInputPassword1" className="form-label">
                       Password
                     </label>
                     <input
                       className="form-control"
                       type="password"
                       id="password"
                       placeholder="**********"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                     />
                   </div>
                    
                   
                    {/* <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        placeholder="**********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div> */}
                    <div className="d-grid">
                      <p
                        id="error-message"
                        style={{
                          color: errorMessage.includes("successful")
                            ? "green"
                            : "red",
                        }}
                      >
                        {errorMessage}
                      </p>
                      <button
                        type="button"
                        className="btn btn-lg fw-bold bgcolor text-dark fs-4"
                        onClick={validateLogin}
                      >
                        SignUp
                      </button>
                      <p style={{ margin: "10px auto" }}>Or</p>
                      <button 
                      type="button" 
                      className="btn btn-outline-dark googlebtn"
                      >
                        <span>
                          <img
                            src="images/google.png"
                            alt=""
                            style={{ width: "25px" }}
                          />
                        </span>
                        Sign in With Google
                      </button>
                      <div className="text-center mt-2">
                        <span className="text-muted"> Already have an account ?  </span>
                        <Link className="text-success" to="/login">
                        Log In
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
            </div>}

            <Sidebanner text={bannerheading} />
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
             <div className="">
              {isOTPSent?
              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="lg_form">
                <label htmlFor="" className="form-label fs-5 mt-3">
                    OTP
                  </label>
                  <div className="otp-input-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="otp-input"
                        value={digit}
                        onChange={(event) => handleInputChange(event, index)}
                        onKeyDown={(event) => handleInputKeyDown(event, index)}
                        maxLength={1}
                        ref={(inputRef) =>
                          (inputRefs.current[index] = inputRef)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>:
              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="lg_form">
                    <div className="phone-input-container mb-3">
                    <label for="exampleInputEmail1" className="form-label fs-4">
                          Mobile Number
                        </label>
                          <PhoneInput
                            country={"in"} // set default country to India
                            value={phone}
                            onChange={handlePhoneChange}
                            inputclassName="phone-input" // Add a custom class to the input
                          
                          />
                    </div>
                    
                  
                    <div className="d-grid">
                      <p
                        id="error-message"
                        style={{
                          color: errorMessage.includes("successful")
                            ? "green"
                            : "red",
                        }}
                      >
                        {errorMessage}
                      </p>
                      <div id="recaptcha-container"></div>
                      <button
                        type="button"
                        className="btn btn-lg fw-bold bgcolor text-dark fs-4"
                        onClick={()=>{
                          otp_send()
                        }}
                      >
                        SignUp
                      </button>
                      <p style={{ margin: "10px auto" }}>Or</p>
                      <button 
                      type="button" 
                      className="btn btn-outline-dark googlebtn"
                      onClick={()=>{
                        googleLogin();
                      }}>
                        <span>
                          <img
                            src="images/google.png"
                            alt=""
                            style={{ width: "25px" }}
                          />
                        </span>
                        Sign in With Google
                      </button>
                      <div className="text-center mt-2">
                        <span className="text-muted"> Already have an account ?  </span>
                        <Link className="text-success" to="/login">
                        Log In
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
            </div>}

            <Sidebanner text={bannerheading} />
              </div>
            </div>
          </div>
        </div>
      
    </div>
    </div>
    </>
  );
};

export default Signup;
