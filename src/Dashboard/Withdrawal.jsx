import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menuitem from "../components/Menuitem";
import { getAssets, withdrawWallet, sendOTP } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { round } from "../pages/utils/math";


const Withdrawal = () => {
  const { token, profile } = useSelector((state) => state.AuthReducer);
  const [symbol, setSymbol] = useState();
  const [allsymbol, setAllSymbol] = useState();
  const [loader, setLoader] = useState(false);
  const [wallet_address, setWalletAddress] = useState("");
  const [amount, setAmount] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [otp, setotp] = useState();


  useEffect(() => {
    getAssets().then((res) => {
      if (res.status === 200) {
        setAllSymbol(res.data);
      }
    });
  }, []);
  let user_data = allsymbol && allsymbol.map((item)=>{
    return (
      <option value={item.symbol}>{item.symbol}</option>
    )
  })

  const withdrawAmount = () =>{
   
    if(symbol && wallet_address && otp && amount>0) {
        if(profile?.balance>=amount) {
          setLoader(true);
          withdrawWallet(token, symbol, wallet_address, otp, amount)
          .then((res)=>{
            setLoader(false);
            NotificationManager.success(res.message)
          })
        } else {
          NotificationManager.error("amount is greater than available balance")
        }
    

    } else {
      NotificationManager.error("select symbol or put right data")
    }
  }



  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid  subdashbordmain">
          <div className="pagewrapper">
          <div className="mt-5 mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="fw-bold fs-6">Wallet Info</p>
                
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-12 col-mb-12">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Available Wallet Balance{" "}
                        <span className="sidebaricon">
                          <i className="fa-solid fa-money-check"></i>
                        </span>
                      </h5>
                      <hr />

                      <p className="card-text mb-1">Amount</p>
                      <div className="kbQqVE">
                        <em className="fst-normal text-success fw-bold">$</em>{" "}
                        {parseFloat(profile?.balance)
                          ? round(profile?.balance)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-mb-12">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Total Deposit{" "}
                        <span className="sidebaricon">
                          <i className="fa-solid fa-money-check"></i>
                        </span>
                      </h5>
                      <hr />

                      <p className="card-text mb-1">Amount</p>
                      <div className="kbQqVE " style={{ whiteSpace: "nowrap" }}>
                        <em className="fst-normal text-success fw-bold">$</em>{" "}
                        {parseFloat(profile?.total_deposit)
                          ? round(profile.total_deposit)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-mb-12 ">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Total withdrawal{" "}
                        <span className="sidebaricon">
                          <img
                            src="images/withdraw.png"
                            alt="withdraw"
                            style={{ width: "25px" }}
                          />
                        </span>
                      </h5>
                      <hr />

                      <p className="card-text mb-1">Amount </p>
                      <div className="kbQqVE">
                        <em className="fst-normal text-success fw-bold">$</em>{" "}
                        {parseFloat(profile?.total_withdraw)
                          ? round(profile.total_withdraw)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div className="mt-3 mb-5">
              <h1 className="fw-bold table-heading"> Withdrawal Crypto Assets</h1>
              <p className="gSPqhc">
                Explore Your Crypto Portfolio: Manage, Track, and Secure Your
                Assets
              </p>
            </div>

            <div>
              <div className="mt-5">
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="cycle-tab-container">
                        <form className="mt-5">
                          <div className="">
                            <div className="mb-3">
                              <label for="" className="form-label">
                                Symbol{" "}
                                <em className="text-danger">*</em>
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setSymbol(e.target.value);
                                }}
                              >
                                <option selected disabled>
                                  Please select
                                </option>
                                {user_data}
                              </select>
                              <div
                                id="emailHelp"
                                className="form-text"
                                style={{ fontSize: "14px" }}
                              >
                                Multi-sender allows you to send ERC20 token in
                                batch by easiest way. You can enter token
                                address to send specific token or leave it
                                blank to send chain token such as BNB....
                              </div>
                            </div>
                            <div className="mb-3">
                              <label for="" className="form-label">
                                Withdrawal Wallet Address{" "}
                                <em className="text-danger">*</em>
                              </label>
                              <input 
                              className="form-control"
                              type="text"
                              value={wallet_address}
                              onChange={(e)=>{
                                setWalletAddress(e.target.value)
                              }}
                              />
                            </div>
                            <div className="mb-3">
                              <label for="" className="form-label">
                                Withdrawal Amount ${" "}
                                <em className="text-danger">*</em>
                              </label>
                              <input 
                              className="form-control"
                              type="number"
                              value={amount}
                              onChange={(e)=>{
                                setAmount(e.target.value)
                              }}
                              />
                            </div>
                            <div className=" d-grid gap-2 col-3">
                            {loader?
                            <div className="loader_btn"></div>:
                              <button
                                type="button"
                                className="btn btn-dark rounded-pill  "
                                data-bs-toggle="modal" data-bs-target="#withdrawWallet"
                              >
                                submit{" "}
                              </button>}
                            </div>
                          </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="withdrawWallet" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered ">
      <div className="modal-content">
        <div className="modal-header" style={{background:"#e6e9ee"}}>
          <h5 className="modal-title" id="withdrawWalletLabel">Delete Wallet</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            {isAgree?
          <div className="">
           <label for="Fiat" className="text-muted">
              OTP
            </label>{" "}
            <input
              type="number"
              className="form-control"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
          </div>:<div className="">
           Are you Want to Withdrawal
          </div>}
        </div>
        {isAgree?
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success" data-bs-dismiss="modal"
           onClick={()=>{
            withdrawAmount();
          }}
          >Confirm</button>
        </div>:<div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success"
          onClick={(e)=>{
            if(symbol && wallet_address && amount>0) {
              if(profile?.balance>=amount) {
            sendOTP(token)
            .then((res)=>{
                if(res.status==200) {
                    setIsAgree(!isAgree);
                }
            })
          }else {
            NotificationManager.error("Amount is higher than available balance")
          }
          }else {
            NotificationManager.error("Please Fill All Required")
          }
            
          }}
          >Yes</button>
        </div>}
      </div>
    </div>
  </div>  
      </div>
    </>
  );
};

export default Withdrawal;
