import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Menuitem from "../components/Menuitem";

const Convert = () => {
  return (
    <>
   <Header />
      <div className="d-flex">
        <Menuitem />
        <div className="container-fluid subdashbordmain2">
          <div className="pagewrapper p-0">
          <div className="css-tdc76g">
        <img
          src="https://assets.staticimg.com/public-web/3.4.8/media/e4a3a7c3a0aa22a1b659.png"
          className="css-1lp45k"
        />
        <div className="css-15lrboi">
          <div data-inspector="convert_slogan" className="css-1pqoxyv">
            <span className="css-1totfpk">0 Fees</span>
            <span className="css-x8tq2f"></span>
            <span className="css-1totfpk">Locked-In Prices</span>
            <span className="css-x8tq2f"></span>
            <span className="css-1totfpk">One-Click Trading</span>
          </div>
          <div className="css-ysuizi ">
            <div className="css-zls27u">
              <div className="css-gbpxbf">
                <h1 className="css-tcae29">Convert</h1>
                <Link to="/history" className="css-3nv9e7">
                  <img
                    src="https://assets.staticimg.com/public-web/3.4.8/svg/order.0f3fac9b.svg"
                    className="css-1u486ya"
                  />
                  <span className="css-tk8fns">History</span>
                </Link>
              </div>
              {/* first input start */}
              <div className="">
                <div className="css-uf1ume">
                  <span className="css-7qqxuz">Pay</span>
                  <div width="464" className="css-60764">
                    <span>Available Balance: 0</span>
                    <img
                      src="https://assets.staticimg.com/public-web/3.4.8/media/e5dd7b190c85ee04e303.png"
                      alt="selectAssets"
                    />
                  </div>
                </div>
                <div className="css-1xjgpse">
                  <div className="css-38f1gh">
                    <input
                      type="text"
                      placeholder="0.1 ~ 820,000"
                      maxlength="18"
                      value=""
                    />
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <div className="dropdownvalue">
                        <div>
                          <img
                            src="https://assets-currency.kucoin.com/60bf877f8afb0a00068efd43_ALGO.png"
                            alt=""
                            style={{
                              height: "24px",
                              width: "24px",
                              marginRight: "10px",
                            }}
                          />
                        </div>
                        <div className="css-12bj1ea">ALGO</div>
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
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
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Select Currency
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div>
                              <div className="css-lb2fs9">
                                <div className="css-u30o77">
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                  placeholder="Search by name or address"
                                  type="text"
                                  className="css-mqw4sy"
                                  autocomplete="off"
                                  value=""
                                ></input>
                              </div>
                              <div
                                className="card-body scroll mt-2 "
                                style={{ height: "220px", overflow: "auto" }}
                              >
                                <div className="css-i7nkdv">
                                  <div className="img-currency">
                                    <img
                                      src="https://assets-currency.kucoin.com/60bf858b8afb0a00068efcf9_AAVE.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="css-yp9swi">
                                    <div className="css-1sg2lsz">
                                      <div className="css-1o0aml9">AAVE</div>
                                    </div>
                                    <div className="css-9e6y8f">Aave</div>
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
              </div>
              {/* end input */}
              {/* swap icon  */}
              <div className="css-tvj0bv">
                <div className="css-nlwnod"></div>
              </div>
              {/* swap icon end */}
              {/* second input start */}
              <div className="">
                <div className="css-uf1ume">
                  <span className="css-7qqxuz">Get (Estimated)</span>
                 
                </div>
                <div className="css-1xjgpse">
                  <div className="css-38f1gh">
                    <input
                      type="text"
                      placeholder="0.0000019 ~ 20"
                      maxlength="18"
                      value=""
                    />
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalsec"
                    >
                      <div className="dropdownvalue">
                        <div>
                          <img
                            src="https://assets-currency.kucoin.com/60bf8a90db892b0006d73786_BTC.png"
                            alt=""
                            style={{
                              height: "24px",
                              width: "24px",
                              marginRight: "10px",
                            }}
                          />
                        </div>
                        <div className="css-12bj1ea">BTC</div>
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModalsec"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabelsec"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabelsec">
                              Select Currency
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div>
                              <div className="css-lb2fs9">
                                <div className="css-u30o77">
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                  placeholder="Search by name or address"
                                  type="text"
                                  className="css-mqw4sy"
                                  autocomplete="off"
                                  value=""
                                ></input>
                              </div>
                              <div
                                className="card-body scroll mt-2 "
                                style={{ height: "220px", overflow: "auto" }}
                              >
                                <div className="css-i7nkdv">
                                  <div className="img-currency">
                                    <img
                                      src="https://assets-currency.kucoin.com/60bf858b8afb0a00068efcf9_AAVE.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="css-yp9swi">
                                    <div className="css-1sg2lsz">
                                      <div className="css-1o0aml9">AAVE</div>
                                    </div>
                                    <div className="css-9e6y8f">Aave</div>
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
              </div>
              {/* end input */}
              {/* price div */}
              <div className="mt-2 mb-2">
                <div className="d-flex justify-content-between">
                  <div className="css-1iwx048">
                    <i className="fa-solid fa-circle-info" />
                    &nbsp;Price:
                  </div>
                  <div className="">--</div>
                </div>
              </div>
              <div className="d-grid ">
                <button
                  className="btn btn-primary w-100 m-auto border-0 fs-5"
                  type="button"
                  style={{ background: "#00c98cf0" }}
                >
                  Convert
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-4" style={{ fontSize: "15px" }}>
            Unlock greater earnings with Convert Plus! &nbsp;
            <Link to="/" className="text-success text-decoration-none">
              Explore Convert Plus
            </Link>{" "}
            <br />
            To quickly convert your fiat to crypto,{" "}
            <Link to="/" className="text-success  text-decoration-none">
              Click Here
            </Link>
            .
          </div>
        </div>
      </div>
            </div>
            </div>
            </div>
     
    </>
  );
};

export default Convert;
