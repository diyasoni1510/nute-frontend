import React, { useState, useRef, useEffect } from "react";
import Sidebanner from "./Sidebanner";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailOtp, socialLogin, verifyOTP } from "./utils/api_functions";
import { useGoogleLogin } from "@react-oauth/google";
import { NotificationManager } from "react-notifications";
import usePageMetadata from "./usePageMetadata";
import { useDispatch } from "react-redux";
import { authLogin } from "./redux/reducers/authReducer";
const Signup = () => {
  usePageMetadata({
    title: 'Join Nute Payment Gateway: Create Your Account',
    description: 'Start facilitating crypto and INR payments, withdrawals, and BBPS services ',
  });

  const bannerheading = "Why Choose Nute Payment";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [showPassword ,setShowPassword]=useState(false);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePassword =()=>{
    setShowPassword(!showPassword);
  }
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
    console.log("check")
  };

  const sendEmailOTP = () => {
    if (email && password) {
      sendEmailOtp(email, password).then((res) => {
        if (res.status == 200) {
          setIsOTPSent(true);
          setErrorMessage(
            "varification code sent successful, Please check Your Email"
          );
        } else {
          setErrorMessage(res.message);
        }
      });
    } else {
      setErrorMessage("Fill all Data");
    }
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

  const otp_send = () => {
    if (phone) {
      console.log("phone", phone);
    }
  };
  const verifyUserOtp = (otp) => {
    verifyOTP(email, phone, otp).then((res) => {
      if (res.status == 200) {
        dispatch(authLogin({data: res }));
        navigate("/", { replace: true });
      }
    });
  };
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
          dispatch(authLogin({ data: res }));
          navigate("/", { replace: true });
        } else {
          NotificationManager.success(res.message);
        }
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
      <div className="signup-wrapper">
        <div className="left-container">
          <div className="">
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
              <Link className="text-decoration-none " to="/login">
                <p className="m-0 text-dark">
                  Have an account?
                  <em className="text-success fst-normal ">Login</em>
                </p>
              </Link>
            </div>

            <div className="login-container">
              <div className="left-header">SignUp</div>
              {isOTPSent ? (
                <>
                  <div className="">
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
                </>
              ) : (
                <>
                  {" "}
                  <div className="">
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
                        Set Password
                      </label>
                      <div className="passwordinput">
                      <input
                        className="form-control"
                        type={showPassword? 'text' :'password'}
                        id="password"
                        required
                        placeholder="***********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                       <i class={`eyeicon ${showPassword ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'}`} onClick={handleTogglePassword} ></i>
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
                        onClick={validateLogin}
                      >
                        SignUp
                      </button>

                      <p
                        style={{
                          margin: "10px auto",
                          color: "#a6a7b0",
                          fontSize: "15px",
                        }}
                      >
                        Or
                      </p>
                      <button type="button" className="btn  googlebtn mb-1 fw-bold"
                      onClick={()=>{
                        googleLogin()
                      }}
                      >
                        <span>
                          <img
                            src="images/google.png"
                            alt=""
                            style={{ width: "25px" }}
                          />
                        </span>{" "}
                        Continue in With Google
                      </button>
                    </div>
                    <Link className="text-decoration-none " to="/">
                      <div
                        className="m-0 text-dark fw-bold text-nowrap"
                        style={{ fontSize: "12px" }}
                      >
                        By signing up, you accept the Cashfree
                        <em className="text-success fst-normal ">
                          Term and condition
                        </em>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="signup-banner ">
            <div className="upper-section">
              <div className="juaMIt">Why Choose Us?</div>
              <div>
                <div className="heading">3,00,000+</div>
                <div className="description">
                  Businesses trust us with their payment needs
                </div>
              </div>
              <div>
                <div className="heading">120+</div>
                <div className="description">
                  Payment modes for smoother payments
                </div>
              </div>
              <div>
                <div className="heading">100+</div>
                <div className="description">
                  Currencies to grow your business globally
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
