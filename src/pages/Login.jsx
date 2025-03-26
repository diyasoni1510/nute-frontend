import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  socialLogin,
  verifyAuthOTP,
  verifyOTP,
} from "./utils/api_functions";
import { useGoogleLogin } from "@react-oauth/google";
import { NotificationManager } from "react-notifications";
import usePageMetadata from "./usePageMetadata";
import { useDispatch } from "react-redux";
import { authLogin } from "./redux/reducers/authReducer";
const Login = (props) => {
  usePageMetadata({
    title: "Nute Payment Gateway: Secure Login",
    description:
      "Access your cryptocurrency and INR payment gateway services securely",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [auth, setAuth] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otp1, setOtp1] = useState(["", "", "", "", "", ""]);
  const [otp2, setOtp2] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const inputRefs1 = useRef([]);
  const inputRefs2 = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email_auth, setEmailAuth] = useState(1);
  const [phone_auth, setPhoneAuth] = useState(0);
  const [google_auth, setGoogleAuth] = useState(0);

  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showButton, setShowButton] = useState(true);
  let grey = "#D9D9D9";
  const [bgColor, setBgColor] = useState(grey);
  const [opacity, setopacity] = useState(0.5);
  const [imageSrc, setImageSrc] = useState("/images/nute-swap.png");
  const [displayText, setDisplayText] = useState("Introducing Nute Payments!");
  const [displayTextto, setDisplayTextto] = useState(
    "Nute Pay Your one-stop solution for bill payments, recharges, bookings, and more. Manage it all effortlessly on our platform."
  );
  const [showPassword, setShowPassword] = useState(false);
  const qrCodeContents = "https://nadcab.com";
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleButton = () => {
    setShowButton(!showButton);
    let removebg = "";
    setBgColor(removebg);
    setopacity("");
    setImageSrc("/images/tablet-1.png");
    setDisplayText("Now Pay Your Aii payment Bills Through Crypto");
    setDisplayTextto(
      "With nute ,pay all your bills through Crypto has never been easier - a seamless and secure way to manage your finances in the digital age."
    );
  };

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
    loginUser(email, phone, password).then((res) => {
      if (res.status == 200) {
        dispatch(authLogin({ data: res }));
        navigate("/", { replace: true });
      } else if (
        res.status == 300 &&
        (res.authenticator == 1 || res.email_auth == 1 || res.phone_auth == 1)
      ) {
        setIsOTPSent(true);
        setAuth(1);
        setGoogleAuth(res.authenticator);
        setEmailAuth(res.email_auth);
        setPhoneAuth(res.phone_auth);

        setErrorMessage(
          "varification code, Please check Your authenticator app"
        );
      } else if (res.status == 300) {
        setIsOTPSent(true);
        setAuth(1);
        setErrorMessage(
          "varification code sent successful, Please check Your Email"
        );
      } else {
        setErrorMessage(res.message);
      }
    });
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

  const handleInputChange1 = (event, index) => {
    const inputValue = event.target.value;

    if (!isNaN(inputValue) && inputValue.length <= 1) {
      setOtp1((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = inputValue;
        return newOtp;
      });
      // Focus on the next input if a digit is entered
      if (inputValue !== "" && index < 5) {
        inputRefs1.current[index + 1].focus();
      }
    }

    // Perform your verification logic here if needed
    if (index + 1 === 6) {
      const fullOtp = otp1.join("");
      let nOtp = fullOtp + inputValue;
      verifyUserOtp(nOtp);
    }
  };

  const handleInputKeyDown1 = (event, index) => {
    // Handle backspace to focus on the previous input
    if (event.key === "Backspace" && index > 0) {
      inputRefs1.current[index - 1].focus();
    }
  };

  const handleInputChange2 = (event, index) => {
    const inputValue = event.target.value;

    if (!isNaN(inputValue) && inputValue.length <= 1) {
      setOtp2((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = inputValue;
        return newOtp;
      });
      // Focus on the next input if a digit is entered
      if (inputValue !== "" && index < 5) {
        inputRefs2.current[index + 1].focus();
      }
    }

    // Perform your verification logic here if needed
    if (index + 1 === 6) {
      const fullOtp = otp2.join("");
      let nOtp = fullOtp + inputValue;
      verifyUserOtp(nOtp);
    }
  };

  const handleInputKeyDown2 = (event, index) => {
    // Handle backspace to focus on the previous input
    if (event.key === "Backspace" && index > 0) {
      inputRefs2.current[index - 1].focus();
    }
  };

  const otp_send = () => {
    if (phone) {
      console.log("phone", phone);
    }
  };
  const verifyUserOtp = (notp) => {
    console.log("yes in verifyUserOtp")
    console.log(auth)
    if (auth > 0) {
      if (google_auth == 1 && email_auth == 1 && phone_auth == 1) {
        if (!otp2.every((value) => !value) && !otp1.every((value) => !value)) {
          verifyAuthOTP(email, phone, otp.join(""), otp.join(""), notp).then(
            (res) => {
              if (res.status == 200) {
                dispatch(authLogin({ data: res }));
                navigate("/", { replace: true });
              }
            }
          );
        }
      } else if (google_auth == 1 && email_auth == 1) {
        if (!otp1.every((value) => !value)) {
          verifyAuthOTP(email, phone, otp.join(""), notp, otp2.join("")).then(
            (res) => {
              if (res.status == 200) {
                dispatch(authLogin({ data: res }));
                navigate("/", { replace: true });
              }
            }
          );
        }
      } else if (email_auth == 1 && phone_auth == 1) {
        if (!otp2.every((value) => !value)) {
          verifyAuthOTP(email, phone, otp.join(""), otp1.join(""), notp).then(
            (res) => {
              if (res.status == 200) {
                dispatch(authLogin({ data: res }));
                navigate("/", { replace: true });
              }
            }
          );
        }
      } else if (google_auth == 1 && phone_auth == 1) {
        if (!otp2.every((value) => !value)) {
          verifyAuthOTP(email, phone, otp.join(""), otp1.join(""), notp).then(
            (res) => {
              if (res.status == 200) {
                dispatch(authLogin({ data: res }));
                navigate("/", { replace: true });
              }
            }
          );
        }
      } else if (google_auth == 1) {
        verifyAuthOTP(email, phone, notp, otp1.join(""), otp2.join("")).then(
          (res) => {
            if (res.status == 200) {
              dispatch(authLogin({ data: res }));
              navigate("/", { replace: true });
            }
          }
        );
      } else if (email_auth == 1) {
          verifyOTP(email, phone, notp).then((res) => {
            if (res.status == 200) {
              dispatch(authLogin({data: res }));
              navigate("/", { replace: true });
            }
          });
      } else if (phone_auth == 1) {
        verifyAuthOTP(email, phone, otp.join(""), otp1.join(""), notp).then(
          (res) => {
            if (res.status == 200) {
              dispatch(authLogin({ data: res }));
              navigate("/", { replace: true });
            }
          }
        );
      }
    } else {
      verifyOTP(email, phone, otp).then((res) => {
        if (res.status == 200) {
          dispatch(authLogin({ data: res }));
          navigate("/", { replace: true });
        }
      });
    }
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
      <div className="Login-wrapper">
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
              <Link className="text-decoration-none " to="/signup">
                <p className="m-0 text-dark">
                  Dont't have account?
                  <em className="text-success fst-normal ">SignUp</em>
                </p>
              </Link>
            </div>

            <div className="login-container">
              <div className="left-header">Login</div>
              {isOTPSent ? (
                <>
                  <div className="">
                    {google_auth == 1 ? (
                      <>
                        <label htmlFor="" className="form-label fs-5 mt-3">
                          Google Authenticator Code
                        </label>
                        <div className="otp-input-container">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              type="text"
                              className="otp-input"
                              value={digit}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
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
                      </>
                    ) : null}
                    {email_auth == 1 ? (
                      <>
                        <label htmlFor="" className="form-label fs-5 mt-3">
                          Email OTP
                        </label>
                        <div className="otp-input-container">
                          {otp1.map((digit, index) => (
                            <input
                              key={index}
                              type="text"
                              className="otp-input"
                              value={digit}
                              onChange={(event) =>
                                handleInputChange1(event, index)
                              }
                              onKeyDown={(event) =>
                                handleInputKeyDown1(event, index)
                              }
                              maxLength={1}
                              ref={(inputRef) =>
                                (inputRefs1.current[index] = inputRef)
                              }
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                    {phone_auth == 1 ? (
                      <>
                        <label htmlFor="" className="form-label fs-5 mt-3">
                          Mobile OTP
                        </label>
                        <div className="otp-input-container">
                          {otp2.map((digit, index) => (
                            <input
                              key={index}
                              type="text"
                              className="otp-input"
                              value={digit}
                              onChange={(event) =>
                                handleInputChange2(event, index)
                              }
                              onKeyDown={(event) =>
                                handleInputKeyDown2(event, index)
                              }
                              maxLength={1}
                              ref={(inputRef) =>
                                (inputRefs2.current[index] = inputRef)
                              }
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Register Email address
                      </label>

                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@business.com"
                        required
                      />
                    </div>
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
                          onChange={(e) => setPassword(e.target.value)}
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
                    <Link
                      to="/ForgetPassword"
                      className="text-success text-decoration-none"
                    >
                      <label
                        for="exampleInputPassword1"
                        className="form-label text-success mb-0"
                        style={{ cursor: "pointer" }}
                      >
                        Forgot Password ?
                      </label>
                    </Link>
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
                        Login
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
                      <button
                        type="button"
                        className="btn  googlebtn mb-1 fw-bold"
                        onClick={() => googleLogin()}
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
                      {/* <button
                            type="button"
                            className="btn btn-outline-dark googlebtn mb-1 fw-bold"
                          >
                            <span>
                              
                              <i className="fa-brands fa-apple text-dark"  style={{ fontSize: "25px" }}></i>
                            </span>{" "}
                            Continue in With Apple
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-dark googlebtn mb-1 fw-bold"
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
                          <button
                            type="button"
                            className="btn btn-outline-dark googlebtn fw-bold"
                          >
                            <span>
                            <i className="fa-brands fa-facebook text-primary" style={{ fontSize: "25px" }}></i>
                            </span>{" "}
                            Continue in With Facebook
                          </button> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="login-banner vendor">
            <div className="">
              <div className="ban-heading ">{displayText}</div>
              <p className="ban-con mt-3">{displayTextto}</p>
              <p className="fw-bold text-light">
                For more info <i className="fa-solid fa-arrow-right"></i>
              </p>

              <div className="nutemobil_img">
                <img
                  src={process.env.PUBLIC_URL + imageSrc}
                  alt="Current Image"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
