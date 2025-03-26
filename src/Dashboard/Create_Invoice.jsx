import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { getAdminAssets, getInvoiceOrder } from "../pages/utils/api_functions";
import { round } from "../pages/utils/math";
import { WALLETBUTTON } from "./WalletButton";
import {
  getAccount,
  sendTransaction,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { TOKEN_ABI } from "./config";
const CreateInvoice = () => {
  const [dots, setDots] = useState("");
  const [order_id, setOrderId] = useState("");
  const [token, setToken] = useState();
  const [checkwallet, setCheckWallet] = useState();
  const [wallet_address, setWalletAddress] = useState();
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(-1);
  const [data, setData] = useState();
  const initialTime = 30 * 60; // 10 minutes in seconds
  const [timer, setTimer] = useState(initialTime);
  const [timerExpired, setTimerExpired] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setAccordionOpen((prev) => !prev);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    setOrderId(id);
    getInvoiceOrder(id).then((res) => {
      console.log(res);
      if (res.status == 200) {
        getAdminAssets().then((res1) => {
          console.log(res1);
          if (res1.status == 200) {
            setToken(res1.data);
            setStatus(res?.inc_data?.status);
            setData(res.inc_data);
          }
        });
      }
    });
  }, []);

  const getAddress = (sys) => {
    setSymbol(sys);
    getInvoiceOrder(order_id, sys).then((res) => {
      if (res.status == 200) {
        setPrice(res.data.price);
        setAmount(res.data.amount);
        setWalletAddress(res.data.address);
      }
    });
  };
  useEffect(() => {
    const getWalletAccount = async () => {
      const wallet_account = await getAccount();
      setCheckWallet(wallet_account);
    };
    getWalletAccount()
  }, []);
  var tt;
  const getww = () => {
    tt = setInterval(() => {
      (async () => {
        const wallet_account = await getAccount();
        if (wallet_account?.address) {
          setCheckWallet(wallet_account);
          clearInterval(tt);
        }
      })();
    }, 1000);
    // return clearInterval(tt);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        if (newTimer <= 0) {
          setTimerExpired(true);
          clearInterval(timerInterval);
        }
        return newTimer;
      });
    }, 1000);

    // Clear the interval when the component is unmounted or when the timer reaches zero
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    // Add leading zero if seconds is a single digit
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const getMessage = () => {
    if (timerExpired) {
      return "invoice expired";
    } else {
      return (
        <div className="d-flex align-items-center justify-content-between ">
          <div className=" d-flex gap-2 align-items-center">
            <div
              className="spinner-border text-light spinner-border-sm "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            Awaiting Payment {dots}
          </div>
          <div className="">{formatTime(timer)}</div>
        </div>
      );
    }
  };
  const transferAmmount = async () => {
    if (token.type == "token") {
      const approve = await writeContract({
        abi: TOKEN_ABI,
        address: token.token_address,
        functionName: "approve",
        args: [
          wallet_address,
          (amount * 1e18).toLocaleString("fullwide", { useGrouping: false }),
        ],
      });

      const approveReceipt = await waitForTransaction({
        hash: approve.hash,
      });

      console.log("Transaction Receipt:", approveReceipt, "ref::::");

      const data = await writeContract({
        abi: TOKEN_ABI,
        address: token.token_address,
        functionName: "transfer",
        args: [
          wallet_address,
          (amount * 1e18).toLocaleString("fullwide", { useGrouping: false }),
        ],
      });
    } else {
      const result = await sendTransaction({
        to: wallet_address,
        value: (amount * 1e18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      });
      console.log("res", result);
    }
  };

  return (
    <>
      {/* this container is for genrate invoice  */}
      {status == 0 ? (
        <div className="container">
          <div className="card invoice-card">
            <div className="card-body p-0">
              <div className="d-flex align-items-center gap-2  mb-2 p-2">
                <div className="">
                  <img src="images/fav.png" alt="" style={{ width: "50px" }} />
                </div>
                <div className="heading-logo">nute payment gateway</div>
              </div>
              <div className={timerExpired ? "expired" : "timer-in"}>
                <div className="">{getMessage()}</div>
              </div>
              <div className="d-flex align-items-center justify-content-between pay_with">
                <div className="">
                  <p className="mb-0 text-secondary fw-bold">Pay with</p>
                </div>
                <div className="">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      getAddress(e.target.value);
                    }}
                  >
                    <option selected disabled>
                      Select Currency
                    </option>
                    {/* <option value="BTC" selected>BTC</option> */}
                    {token && token
                      ? token.map((item) => {
                          return (
                            <option value={item.symbol}>{item.symbol}</option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <hr />
              <div className="invoice-accordian">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className={`accordion-button ${
                          accordionOpen ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                        onClick={toggleAccordion}
                      >
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <div className="">Nute payement gateway</div>
                          <div className="text-end">
                            <p className="text-dark mb-1">
                              {amount}&nbsp;{symbol}
                            </p>{" "}
                            <small className="text-secondary">
                              1 {symbol} = $&nbsp;{round(price)}
                            </small>
                          </div>
                        </div>
                        <div className="inv-ico">
                          <i
                            class={
                              accordionOpen
                                ? "fa-solid fa-chevron-up"
                                : "fa-solid fa-chevron-down"
                            }
                          ></i>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body bg-light">
                        <div className="">
                          <table className="curreny-details-table w-100">
                            <tbody>
                              <tr>
                                <th role="cell" scope="row" className="fw-normal">
                                  Order Amount
                                </th>
                                <td>
                                  {" "}
                                  <p className="text-dark mb-0">
                                    {amount}&nbsp;{symbol}
                                  </p>{" "}
                                  <small className="text-secondary">
                                    1 {symbol} = $&nbsp;{round(price)}
                                  </small>
                                </td>
                              </tr>
                              <tr>
                                <th role="cell" scope="row" className="fw-normal">
                                  Network Cost
                                </th>
                                <td>txCount x 0.000003546&nbs;{symbol}</td>
                              </tr>
                              <tr>
                                <th role="cell" scope="row" className="fw-normal">
                                  Already Pay
                                </th>
                                <td>
                                  <div className="text-truncate width166666">
                                    -0.00000000&nbsp;{symbol}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th
                                  role="cell"
                                  scope="row"
                                  className="fw-bold text-dark"
                                >
                                  Due
                                </th>
                                <td>
                                  <div className="text-truncate width166666">
                                    {amount}&nbsp;{symbol}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <ul
                  className="nav nav-pills justify-content-around"
                  style={{
                    background: "#f0f0f0f7",
                    boxShadow: "0px 5px 7px 0px rgba(0, 0, 0, 0.09)",
                  }}
                >
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      id="tab1"
                      data-bs-toggle="pill"
                      data-bs-target="#pane1"
                      role="tab"
                    >
                      Scan
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      id="tab2"
                      data-bs-toggle="pill"
                      data-bs-target="#pane2"
                      role="tab"
                    >
                      Copy
                    </button>
                  </li>
                </ul>

                <div className="tab-content ">
                  <div
                    className="tab-pane fade show active"
                    id="pane1"
                    role="tabpanel"
                  >
                    <div className="CompeletPay_Body p-4">
                      <div className="mt-4">
                        <div className="vector_img">
                          <QRCode
                            value={`ethereum:${wallet_address}?value=${
                              amount * 1e18
                            }`}
                            size="200"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="">
                          <div
                            className="d-grid gap-2 mb-3"
                            style={{ textAlign: "center" }}
                          >
                            <WALLETBUTTON name="OPEN WALLET" getww={getww} />
                          </div>
                          {checkwallet?.address ? (
                            <div
                              className="d-grid gap-2 mb-3"
                              style={{ textAlign: "center" }}
                            >
                              <button
                                onClick={() => {
                                  transferAmmount();
                                }}
                              >
                                {" "}
                                Transfer
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <p
                        className=" text-secondary "
                        style={{ textAlign: "center", fontSize: "12px" }}
                      >
                        Recommended_Fee
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pane2" role="tabpanel">
                    <div className="CompeletPay_Body p-4">
                      <p
                        className=" text-secondary "
                        style={{ textAlign: "center", fontSize: "12px" }}
                      >
                        CompeletPay_Body
                      </p>
                      <div className="pay-card">
                        <div className="border-bottom">
                          <p
                            className="  mt-1 mb-1 "
                            style={{ textAlign: "center", fontSize: "12px" }}
                          >
                            AMOUNT
                          </p>
                          <div className="text-center fs-4 ">
                            {amount}&nbsp;{symbol}
                          </div>
                          <div className="separatorGem"></div>
                        </div>

                        <div className="border-bottom">
                          <small className="text-center">ADDRESS</small>
                          <div className="input-group flex-nowrap p-3">
                            <span
                              className="input-group-text"
                              id="addon-wrapping"
                              style={{ height: "47px" }}
                            >
                              @
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              aria-label="Username"
                              aria-describedby="addon-wrapping"
                              value={wallet_address}
                            />
                          </div>
                          <div className="separatorGem"></div>
                        </div>
                        <div className="border-bottom">
                          <small className="text-center ">
                            PAYMENT LINK WITH PAYJOIN SUPPORT
                          </small>
                          <div className="input-group flex-nowrap p-3">
                            <span
                              className="input-group-text"
                              id="addon-wrapping"
                              style={{ height: "47px" }}
                            >
                              @
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              aria-label="Username"
                              aria-describedby="addon-wrapping"
                              value={wallet_address}
                            />
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
      ) : null}
      {/* this is invoce creted details card show this for  invoice detail after created invoice*/}
      {status == 1 ? (
        <div className="container">
          <div className="card invoice-card2">
            <div className="card-body p-0">
              <div className="d-flex align-items-center  justify-content-between gap-2  mb-2 p-2">
                <i className="fa-solid fa-arrow-left"></i>
                <div className="fs-6 fw-bold ">Invoice Details</div>
                <i className="fa-solid fa-clipboard-question"></i>
              </div>
              <div className="text-center mt-4 mb-4">
                <p className="fs-3 fw-bold mb-0">
                  +{data?.amount}&nbsp;
                  <em className="fst-normal ">
                    {data?.type == "doller" ? "$" : "₹"}
                  </em>
                </p>
                <small className="fw-bold" style={{ color: "#58d37a" }}>
                  <i className="fa-solid fa-circle-check"></i>&nbsp;Compeleted
                </small>
                <br />
                <small className="fw-bold" style={{ color: "#b5767e" }}>
                  {data?.custom_thank_message}
                </small>
              </div>
              <hr />
              <div className="">
                <table className="curreny-details-table detail-in w-100">
                  <tbody>
                    <tr>
                      <th role="cell" scope="row" className="fw-normal">
                        Amonut
                      </th>
                      <td>
                        <span className="n-id">{data?.coin_amount}</span>
                      </td>
                    </tr>
                    <tr>
                      <th role="cell" scope="row" className="fw-normal">
                        Currency
                      </th>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <div className="fw-bold ">{data?.symbol}</div>
                          {/* <div className="" style={{width:"20px"}}><img src="images/bnb.png" alt="currency" className="w-100" /></div> */}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th role="cell" scope="row" className="fw-normal">
                        Address
                      </th>
                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <div
                            className=" text-dark  lh-1"
                            style={{ width: "270px" }}
                          >
                            {data?.address}
                          </div>
                          <i className="fa-solid fa-copy"></i>
                        </div>
                      </td>
                    </tr>
                    {/* <tr>
                    <th role="cell" scope="row" className="fw-normal">
                      Txid
                    </th>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <div
                          className=" text-decoration-underline text-dark lh-1"
                          style={{ width: "270px" }}
                        >
                          0x542e235b938867145eF5A80446E4cACEC619cfb5
                        </div>
                        <i className="fa-solid fa-copy"></i>
                      </div>
                    </td>
                  </tr> */}
                    <tr>
                      <th role="cell" scope="row">
                        Depposit Wallet
                      </th>
                      <td>
                        <div className="text-dark">Nute wallet</div>
                      </td>
                    </tr>
                    <tr>
                      <th role="cell" scope="row">
                        Date
                      </th>
                      <td>
                        <div className="text-dark">
                          {new Date(data?.updatedAt).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateInvoice;
