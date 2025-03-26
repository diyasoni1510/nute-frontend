import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { sendEmail, updateNewPassword, verifyForgetOtp } from "./utils/api_functions";
import { NotificationManager } from "react-notifications";

const Forgetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isOTPSent, setIsSendOTP] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

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
      const fullOtp = otp.join("");
      let nOtp = fullOtp + inputValue;
      verifyUserOtp(nOtp);
    }
  };

  const handleInputKeyDown = (event, index) => {
    // Handle backspace to focus on the previous input
    if (event.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const verifyUserOtp = (notp) => {
    verifyForgetOtp(email, notp)
    .then((res)=>{
      if(res.status==200) {
        setIsSendOTP(2);
      } else {
        NotificationManager.error(res.message);
      }
    })
   
  };

  const updatePassword = () => {
    if(email && password && confirm_password && isOTPSent==2) {
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password must contain at least one number, one uppercase letter, and be at least 6 characters"
        );
      }else if (!passwordRegex.test(confirm_password)) {
        setErrorMessage(
          "Password must contain at least one number, one uppercase letter, and be at least 6 characters"
        );
      } else if(password === confirm_password) {
        updateNewPassword(email, password, confirm_password)
        .then((res)=>{
          if(res.status==200) {
            NotificationManager.success(res.message)
          } else {
            NotificationManager.error(res.message)
          }
        })
      } else {
        setErrorMessage(
          "Password and Confirm Password Mismatch"
        );
      }
     
    } else {
      NotificationManager.error("Not Updated")
    }
    
  }
  return (
    <>
      <div className=" p-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-1">
          <div className="">
            {" "}
            <img
              src="images/fav.png"
              alt=""
              className=""
              style={{ width: "50px" }}
            />
          </div>
          <div className="lh-1">
            <div className="fw-bolder  fs-5">Nute</div>
            <div className="fw-bolder  fs-5">Payment</div>
          </div>
        </div>
      </div>
      <div className="Login-wrapper">
        <div className="left-container2">
          <div className="">
{/* send email before reset */}
<div className="login-container">
              <div className="left-header">Reset Your Password</div>


              {isOTPSent==1 ? (
                  <div className="">
                     <label htmlFor="" className="form-label fs-5 mt-3">
                      Email OTP
                    </label>
                    <div className="otp-input-container">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          className="otp-input"
                          value={digit}
                          onChange={(event) => handleInputChange(event, index)}
                          onKeyDown={(event) =>
                            handleInputKeyDown(event, index)
                          }
                          maxLength={1}
                          ref={(inputRef) =>
                            (inputRefs.current[index] = inputRef)
                          }
                        />
                      ))}
                      
                    </div>
                   
                  </div>
              ) : isOTPSent ==0 ?(
                <>
                <div className="">
                <div className="mb-3">
               <div className="text-secondary text-center mb-3" style={{fontSize:"15px"}}>
               Enter your email address that you signed up with on Cashfree and we'll send you a link to reset your password.
               </div>

                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="user@business.com"
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                
               

                <div className="d-grid mt-4 mb-4">
                  <button
                    type="submit"
                    className="btn  fw-bold bgcolor text-light w-100"
                    onClick={()=>{
                      sendEmail(email)
                      .then((res)=>{
                        if(res.status==200) {
                          setIsSendOTP(1);
                        } else {
                          NotificationManager.error(res.message);
                        }
                      })
                    }}
                  >
                   Send Email
                  </button>
                </div>
                <Link to="/" className="text-success fw-bold text-decoration-none ">
                  <div className="text-center ">  Back to Log in</div>
                </Link>
                <div className="text-center mt-4" style={{fontSize:"10px"}}>
                Protected by reCAPTCHA. Google <br />
                <Link to="/" className="text-success text-decoration-none">Privacy Policy</Link>   & <Link to="/" className="text-success  text-decoration-none">Terms of Service</Link>apply.
                </div>
              </div>
                </>
              ):isOTPSent==2?(
                  <div className="">
            
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <div className="passwordinput">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e)=>{
                          setPassword(e.target.value)
                        }}
                        required
                        placeholder="***********"
                      />
                      <i
                        class={`eyeicon ${
                          showPassword
                            ? "fa-regular fa-eye"
                            : "fa-regular fa-eye-slash"
                        }`}
                        onClick={handleTogglePassword}
                      ></i>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Confirm Password
                    </label>
                    <div className="passwordinput">
                      <input
                        className="form-control"
                        type={showPassword2 ? "text" : "password"}
                        id="password"
                        value={confirm_password}
                        onChange={(e)=>{
                          setConfirmPassword(e.target.value);
                        }}
                        required
                        placeholder="***********"
                      />
                      <i
                        class={`eyeicon ${
                          showPassword2
                            ? "fa-regular fa-eye"
                            : "fa-regular fa-eye-slash"
                        }`}
                        onClick={handleTogglePassword2}
                      ></i>
                    </div>
                  </div>
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
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn  fw-bold bgcolor text-light w-100"
                      onClick={()=>{
                        updatePassword();
                      }}
                    >
                      Confirm Password
                    </button>
                  </div>
                  <Link to="/" className="text-success fw-bold text-decoration-none ">
                  <div className="text-center ">  Back to Log in</div>
                  </Link>
                  <div className="text-center mt-4" style={{fontSize:"10px"}}>
                  Protected by reCAPTCHA. Google <br />
                  <Link to="/" className="text-success text-decoration-none">Privacy Policy</Link>   & <Link to="/" className="text-success  text-decoration-none">Terms of Service</Link>apply.
                  </div>
                </div>
              ):null}
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetpassword;
