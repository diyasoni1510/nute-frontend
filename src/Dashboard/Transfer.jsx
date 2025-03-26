import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Menuitem from "../components/Menuitem";
import Papa from "papaparse";
import { transerWallet, transerWalletWeb3, userAddress } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

import { getAccount, fetchBalance, waitForTransaction, writeContract } from "@wagmi/core";
import { TOKEN_ABI, testnetBSC_CONTRACT_ADDRESS,testnetbscabi} from "./config"
import { WALLETBUTTON } from "./WalletButton";


const Transfer = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const [activeTab, setActiveTab] = useState("Direct");
  const [allocation_data, setAllocationData] = useState();
  const [address_data, setAddress] = useState();
  const [wallet_address, setWalletAddress] = useState();
  const [token_address, setTokenAddress] = useState();
  const [loader, setLoader] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [csvData, setCSVData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Parse CSV file using papaparse
    Papa.parse(file, {
      complete: (result) => {
        // result.data is an array of arrays representing the CSV data
        setAllocationData(result.data);
      },
      header: true, // Set to true if your CSV has a header row
      dynamicTyping: true, // Automatically convert values to appropriate types
    });
  };

  const updateAllocation = (txt) => {
    let data = [];
    let txt_array = txt.split(",");
    if (
      txt_array.length > 0 &&
      txt_array[txt_array.length - 1] > 0 &&
      txt_array.length % 2 === 0
    ) {
      for (let i = 0; i < txt_array.length; i = i + 2) {
        const address = txt_array[i];
        const amount = parseFloat(txt_array[i + 1]);
        data.push({ address, amount });
      }
      setAllocationData(data);
    }
  };

  useEffect(() => {
    userAddress(token).then((res) => {
      if (res.status == 200) {
        setAddress(res.address);
      }
    });
  }, []);
  let user_data = address_data && address_data.map((item)=>{
    return (
      <option value={item.wallet_address}>{item.wallet_address} ({item.symbol})</option>
    )
  })

  async function transferAmount() {
    try {
      setLoader(true);
      let addr = [];
      let amt = [];
      let totalQuantity = 0;
  
      // Assuming allocation_data is an array
      allocation_data.forEach((item) => {
        addr.push(item.address);
        totalQuantity += item.amount;
        amt.push((item.amount * 1e18).toLocaleString("fullwide", { useGrouping: false }));
      });
  
      console.log("Addresses:", addr);
      console.log("Amounts:", amt);
      console.log("Total Quantity:", totalQuantity);
      if(token_address) {

      const approve = await writeContract({
        abi: TOKEN_ABI,
        address: token_address,
        functionName: "approve",
        args: [testnetBSC_CONTRACT_ADDRESS, (totalQuantity*1e18).toLocaleString("fullwide", { useGrouping: false })]
      });

      const approveReceipt = await waitForTransaction({
        hash: approve.hash,
      });
  
      console.log("Transaction Receipt:", approveReceipt, "ref::::");

        const data = await writeContract({
          abi: testnetbscabi,
          address: testnetBSC_CONTRACT_ADDRESS,
          functionName: "multisendToken",
          args: [token_address, true, addr, amt],
          value: 0
        });
    
        // console.log("Write Contract Data:", data);
        let hash = data.hash;
        const transactionReceipt = await waitForTransaction({
          hash:hash,
        });
    
        // console.log("Transaction Receipt:", transactionReceipt, "ref::::");
        const wallet_account = await getAccount()
        // console.log("wall", wallet_account);
        let web3_wallet_address = wallet_account.address;
        const account_details = await fetchBalance({
          address: web3_wallet_address,
          token: token_address, 
        })
        let sys = account_details.symbol;
        transerWalletWeb3(token, web3_wallet_address, hash, sys, allocation_data)
        .then((res)=>{
          NotificationManager.success(res.message);
        })
        setLoader(false)
      } else {
        const data = await writeContract({
          abi: testnetbscabi,
          address: testnetBSC_CONTRACT_ADDRESS,
          functionName: "multisendEther",
          args: [addr, amt],
          value: (totalQuantity*1e18).toLocaleString("fullwide", { useGrouping: false })
        });
    
        // console.log("Write Contract Data:", data);
        let hash = data.hash;
        const transactionReceipt = await waitForTransaction({
          hash: hash,
        });
    
        // console.log("Transaction Receipt:", transactionReceipt, "ref::::");
        const wallet_account =await getAccount()
        // console.log("wall", wallet_account);
        let web3_wallet_address = wallet_account.address;
        const account_details =await fetchBalance({
          address: web3_wallet_address
        })
        let sys = account_details.symbol=='tBNB'?'BNB':account_details.symbol;
        transerWalletWeb3(token, web3_wallet_address, hash, sys, allocation_data)
        .then((res)=>{
          NotificationManager.success(res.message);
        })
        setLoader(false)
      }
      
    } catch (error) {
      console.error("Error in transferAmount:", error.message || error);
      setLoader(false)
      // You can add additional error handling or logging here
    }
  }
  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid  subdashbordmain">
          <div className="pagewrapper">
            <div className="mt-3 mb-5">
              <h1 className="fw-bold table-heading"> Transfer Crypto Assets</h1>
              <p className="gSPqhc">
                Explore Your Crypto Portfolio: Manage, Track, and Secure Your
                Assets
              </p>
            </div>

            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold m-0">Your API Keys</p>
                <button className="btn btn-outline-success h">
                  create api key
                </button>
              </div>

              <div className="key-table table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-dark">Domain</th>
                      <th>API Key</th>
                      <th>Secret Key</th>
                      <th>Name</th>
                      <th>Create on</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <td
                          scope="row"
                          className="d-flex gap-4 align-items-center e2grw2-5"
                        >
                          <div className="">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkboxNoLabel"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="sib-tag">
                            <span className="label">v3</span>
                          </div>
                          </td> */}
                      <td className="e2grw2-5 text-dark">domain</td>
                      <td className="e2grw2-5">api_keys</td>
                      <td className="e2grw2-5">secret_keys</td>
                      <td className="e2grw2-5">nute</td>
                      <td className="e2grw2-5">343 </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="cycle-tab-container">
                      <ul className="nav nav-tabs">
                        <li
                          className={`cycle-tab-item ${
                            activeTab === "Direct" && "active"
                          }`}
                        >
                          <Link
                            className="nav-link"
                            role="tab"
                            to="#Direct"
                            onClick={() => handleTabClick("Direct")}
                          >
                            Direct Transfer
                          </Link>
                        </li>
                        <li
                          className={`cycle-tab-item ${
                            activeTab === "web3" && "active"
                          }`}
                        >
                          <Link
                            className="nav-link"
                            role="tab"
                            to="#web3"
                            onClick={() => handleTabClick("web3")}
                          >
                            Web3 Transfer
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Direct" && "show active"
                          }`}
                          id="Direct"
                          role="tabpanel"
                          aria-labelledby="Direct-tab"
                        >
                          <form className="mt-5">
                            <div className="">
                              <div className="mb-3">
                                <label for="" className="form-label">
                                  Token Address{" "}
                                  <em className="text-danger">*</em>
                                </label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setWalletAddress(e.target.value);
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
                              <label for="" className="form-label">
                                Allocations <em className="text-danger">*</em>
                              </label>
                              <div className="form-floating mb-3">
                                <textarea
                                  className="  textarea h-auto w-100 rounded"
                                  rows="10"
                                  placeholder="Insert allocation: separate with breaks line. By format: address,amount or address amount
          Ex:
          0x0000000000000000000000000000000000001000,13.45,
          0x0000000000000000000000000000000000001000,1.049,
          0x0000000000000000000000000000000000001000,1"
                                  onBlur={(e) => {
                                    updateAllocation(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                              <div className="file-input">
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div className="alert alert-warning" role="alert">
                                Please exclude{" "}
                                <em className="fst-normal">
                                  0x5D00661EA3c9b8f095520573b9B940B6fEbcfD8b{" "}
                                  <i className="fas fa-copy"></i>
                                </em>{" "}
                                from fees, rewards, max tx amount to start
                                sending tokens.
                              </div>
                              <div className=" d-grid gap-2 col-3">
                              {loader?
                              <div className="loader_btn"></div>:
                                <button
                                  type="button"
                                  className="btn btn-dark rounded-pill  "
                                  onClick={()=>{
                                    console.log(wallet_address, allocation_data)
                                    if(wallet_address && allocation_data.length>0) {
                                      setLoader(true);
                                      transerWallet(token, wallet_address, allocation_data)
                                      .then((res)=>{
                                        console.log("res", res);
                                        setLoader(false);
                                        NotificationManager.success(res.message)
                                      })
                                    }
                                  }}
                                >
                                  submit{" "}
                                </button>}
                              </div>
                            </div>
                          </form>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "web3" && "show active"
                          }`}
                          id="web3"
                          role="tabpanel"
                          aria-labelledby="web3-tab"
                        >
                          <form className="mt-5">
                            <div className="">
                              <div className="mb-3">
                                <WALLETBUTTON name="Connect Wallet"/>
                              </div>
                              <div className="mb-3">
                                <label for="" className="form-label">
                                  Token Address{" "}
                                </label>
                                <input type="text" onChange={(e)=>{
                                  setTokenAddress(e.target.value);
                                }} />
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
                              <label for="" className="form-label">
                                Allocations <em className="text-danger">*</em>
                              </label>
                              <div className="form-floating mb-3">
                                <textarea
                                  className="  textarea h-auto w-100 rounded"
                                  rows="10"
                                  placeholder="Insert allocation: separate with breaks line. By format: address,amount or address amount
          Ex:
          0x0000000000000000000000000000000000001000,13.45
          0x0000000000000000000000000000000000001000,1.049
          0x0000000000000000000000000000000000001000,1"
          onBlur={(e)=>{
            updateAllocation(e.target.value);
          }}
                                ></textarea>
                              </div>
                              <div className="file-input" onChange={handleFileChange}>
                                <input type="file" />
                              </div>
                              <div className="alert alert-warning" role="alert">
                                Please exclude{" "}
                                <em className="fst-normal">
                                  0x5D00661EA3c9b8f095520573b9B940B6fEbcfD8b{" "}
                                  <i className="fas fa-copy"></i>
                                </em>{" "}
                                from fees, rewards, max tx amount to start
                                sending tokens.
                              </div>
                              <div className=" d-grid gap-2 col-3">
                                {loader?
                              <div className="loader_btn"></div>:
                                <button
                                  type="button"
                                  className="btn btn-dark rounded-pill  "
                                  onClick={()=>{
                                    transferAmount();
                                  }}
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
                  <div className="col-lg-4 col-sm-12">
                    <div className="">
                      <h5 className="fw-bold">About the API</h5>
                      <p className="gSPqhc">
                        The Nute API makes it easy for programmers to integrate
                        many of nute features into other applications.
                        Interested in learning more?
                      </p>
                      <button
                        type="button"
                        className="btn btn-light text-dark fw-bold shadow-sm rounded-pill bg-white  mt-2"
                      >
                        Read our Api Documentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
