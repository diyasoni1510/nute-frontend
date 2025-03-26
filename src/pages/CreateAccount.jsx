import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
const CreateAccount = () => {
  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add("my-page-background");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("my-page-background");
    };
  }, []);
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
              <Link className="text-decoration-none " to="/">
                <p className="m-0 text-dark">
                 Have an account?
                  <em className="text-success fst-normal ">Login</em>
                </p>
              </Link>
            </div>

            <div className="login-container">
              <div className="left-header">SignUp</div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Register Email address
                </label>

                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="user@business.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Set Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  required
                  placeholder="***********"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn  fw-bold bgcolor text-light w-100"
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
                <button type="button" className="btn  googlebtn mb-1 fw-bold">
                  <span>
                    <img
                      src="images/google.png"
                      alt=""
                      style={{ width: "25px" }}
                    />
                  </span>{" "}
                  Continue in With Google
                </button>
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
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="signup-banner ">
            <div className="upper-section">
              <div className="juaMIt">
                Why Choose Us?
              </div>
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

export default CreateAccount;
