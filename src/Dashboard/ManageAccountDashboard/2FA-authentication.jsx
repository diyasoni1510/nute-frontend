import React, { useState } from "react";
import Header from "../Header";
import AccountSidebar from "./AccountSidebar";
import "./Acc-style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  sendOTP,
  setGoogleAuth,
  setGoogleAuthOTP,
  verifyOTPEmail,
} from "../../pages/utils/api_functions";
import { NotificationManager } from "react-notifications";
var QRCode = require("qrcode");
const FAauthentication = () => {
  const { token, profile } = useSelector((state) => state.AuthReducer);
  console.log("profile",profile)
  const [url, setUrl] = useState();
  const [gotp, setGotp] = useState();
  const [userSecret, setUserSecret] = useState();
  const [isscan, setIsScan] = useState(true);

  const checkAuthenticate = (txt) => {
    if (txt == "g" && profile.authenticator != 1) {
      setGoogleAuth(token).then((d) => {
        if (d.status == 200) {
          QRCode.toDataURL(d.secret.otpauth_url, function (err, data_url) {
            if (err) {
              NotificationManager.error("Not getting Data");
            }
            setIsScan(d.scan);
            setUrl(data_url);
            setUserSecret(d.secret.base32);
          });
        }
      });
    }
    if (txt == "e" && profile.email_auth != 1) {
      sendOTP(token).then((d) => {
        if (d.status == 200) {
          NotificationManager.success(d.message);
        }
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="d-flex">
        <AccountSidebar />
        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <h1 className="mt-4 mb-4 fw-bold table-heading">2FA Authentication</h1>
            <p className="gSPqhc">
              Secure your account with an additional layer of security with 2FA
              authentication. Verify via an OTP or Google authenticator app
            </p>
            <div className="row">
              <div className="col-lg-6 mb-1">
                <div className="jcfdwc w-100 h-100">
                  <div className="d-flex justify-content-start align-items-center gap-2 eyOHCf ">
                    <img src="images/mobile-sms.svg" alt="" />
                    <div className=" brRdSA">OTP on SMS and Email</div>
                    <span className="badge successbage rounded-1">Active</span>
                  </div>
                  <div className="mkjn">
                    <div className="gSPqhc2 mt-2 my-2">
                      A verification code will be sent to your phone and email
                      to verify yourself.
                    </div>
                    <div className=" gSPqhc2 my-3">Registered Contact Details</div>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label gSPqhc2"
                        for="flexCheckDefault"
                      >
                        +91xxxxxx0988
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        checked={profile?.email_auth == 1 ? "checked" : ""}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        onClick={() => {
                          checkAuthenticate("e");
                        }}
                      />
                      <label
                        className="form-check-label gSPqhc2"
                        for="flexCheckChecked"
                      >
                        {profile?.email}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-1">
                <div className="jcfdwc w-100 h-100">
                  <div className="d-flex justify-content-start align-items-center gap-2 eyOHCf ">
                    <i className="fa-brands fa-google-plus "></i>
                    <div className=" brRdSA">Google Authenticator App</div>
                  </div>
                  <div className="mkjn">
                    <div className="gSPqhc2 mt-2 my-2">
                      Authenticate via the Google Authenticator app when you try
                      to access the critical sections in your Nute account.
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>{
                          checkAuthenticate("g");
                        }}
                      >
                        Use this method instead
                      </button>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div
                              className="modal-header"
                              style={{ background: "#e6e9ee" }}
                            >
                              <h5 className="modal-title" id="exampleModalLabel">
                                Setup Google Authenticator
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="gSPqhc2">
                                Download the Google Authenticator app from{" "}
                                <Link className="text-success">Play Store</Link>
                                , add a new account by clicking on{" "}
                                <img src="images/add.svg" alt="" /> then ‘Scan
                                the QR code’ below.
                              </div>
                              {profile?.authenticator !== 1 ? (
                              <>
                                {!isscan?
                                <>
                                <div className="form-group text-center">
                                  <img src={url} />
                                </div>
                                <div className="form-group text-center">
                                  {userSecret}
                                </div>
                                </>:null}
                                <label for="Fiat" className="text-muted">
                                  OTP
                                </label>{" "}
                                <input
                                  type="number"
                                  className="form-control"
                                  value={gotp}
                                  onChange={(e) => {
                                    setGotp(e.target.value);
                                  }}
                                />
                              </>
                            ) : (
                              <div>
                                Are you Want to Disable Google Authentication
                              </div>
                            )}
                            </div>
                            <div
                              className="modal-footer"
                              style={{ borderTop: "unset", padding: "10px" }}
                            >
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              {profile?.authenticator != 1 ? (
                              <button type="button" className="btn btn-success"
                              onClick={() => {
                                if (gotp) {
                                  setGoogleAuthOTP(token, 1, gotp, "g").then(
                                    (data) => {
                                      if (data.status === 200) {
                                        NotificationManager.success(data.message);
                                        window.location.reload();
                                      } else {
                                        NotificationManager.error(data.message);
                                      }
                                    }
                                  );
                                } else {
                                  NotificationManager.error("fill all data");
                                }
                              }}
                              >
                                Proceed
                              </button>):
                              <button type="button" className="btn btn-success"
                              onClick={() => {
                                setGoogleAuthOTP(token, 0).then((data) => {
                                  if (data.status === 200) {
                                    NotificationManager.success(data.message);
                                    window.location.reload();
                                  } else {
                                    NotificationManager.error(data.message);
                                  }
                                });
                              }}
                              >
                                Proceed
                              </button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="jcfdwc w-100 h-100">
                  <div className="d-flex justify-content-between align-items-center gap-2 eyOHCf ">
                    <div className=" brRdSA">Enable 2FA for Login</div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={profile.authenticator == 1 ? "checked" : ""}
                        id="flexSwitchCheckDefault"
                        onClick={() => {
                          checkAuthenticate("g");
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="gSPqhc2 mt-2 my-2">
                      After logging into your account, you will be asked to
                      authenticate using 2FA.
                    </div>
                    <div
                      className="alert alert-success gSPqhc2 mt-3 p-2 border-0"
                      role="alert"
                      style={{ maxWidth: "320px" }}
                    >
                      <em className="fst-normal fw-bold text-dark">Note</em>{" "}
                      This will also apply to your alias accounts
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                      <div
                        className="modal-header"
                        style={{ background: "#e6e9ee" }}
                      >
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Google Authentication
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="">
                          <div className="mb-4">
                            {profile?.authenticator !== 1 ? (
                              <>
                                {!isscan?
                                <>
                                <div className="form-group text-center">
                                  <img src={url} />
                                </div>
                                <div className="form-group text-center">
                                  {userSecret}
                                </div>
                                </>:null}
                                <label for="Fiat" className="text-muted">
                                  OTP
                                </label>{" "}
                                <input
                                  type="number"
                                  className="form-control"
                                  value={gotp}
                                  onChange={(e) => {
                                    setGotp(e.target.value);
                                  }}
                                />
                              </>
                            ) : (
                              <div>
                                Are you Want to Disable Google Authentication
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        {profile?.authenticator != 1 ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              if (gotp) {
                                setGoogleAuthOTP(token, 1, gotp, "g").then(
                                  (data) => {
                                    if (data.status === 200) {
                                      NotificationManager.success(data.message);
                                      window.location.reload();
                                    } else {
                                      NotificationManager.error(data.message);
                                    }
                                  }
                                );
                              } else {
                                NotificationManager.error("fill all data");
                              }
                            }}
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              setGoogleAuthOTP(token, 0).then((data) => {
                                if (data.status === 200) {
                                  NotificationManager.success(data.message);
                                  window.location.reload();
                                } else {
                                  NotificationManager.error(data.message);
                                }
                              });
                            }}
                          >
                            Disable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="staticBackdrop1"
                  data-bs-backdrop="static1"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                      <div
                        className="modal-header"
                        style={{ background: "#e6e9ee" }}
                      >
                        <h5 className="modal-title" id="staticBackdropLabel1">
                          Email Authentication
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="">
                          <div className="mb-4">
                            {profile?.email_auth !== 1 ? (
                              <>
                                <label for="Fiat" className="text-muted">
                                  OTP
                                </label>{" "}
                                <input
                                  type="number"
                                  className="form-control"
                                  value={gotp}
                                  onChange={(e) => {
                                    setGotp(e.target.value);
                                  }}
                                />
                              </>
                            ) : (
                              <div>
                                Are you Want to Disable Email Authentication
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        {profile?.email_auth != 1 ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              if (gotp) {
                                verifyOTPEmail(token, 1, gotp).then((data) => {
                                  if (data.status === 200) {
                                    NotificationManager.success(data.message);
                                    window.location.reload();
                                  } else {
                                    NotificationManager.error(data.message);
                                  }
                                });
                              } else {
                                NotificationManager.error("fill all data");
                              }
                            }}
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              verifyOTPEmail(token, 0, 0, "disable").then((data) => {
                                if (data.status === 200) {
                                  NotificationManager.success(data.message);
                                  window.location.reload();
                                } else {
                                  NotificationManager.error(data.message);
                                }
                              });
                            }}
                          >
                            Disable
                          </button>
                        )}
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
  );
};

export default FAauthentication;
