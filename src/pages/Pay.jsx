// import React, { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";
// import {
//   checkTransaction,
//   getAssetsUser,
//   getUserAccess,
//   getWalletAddress,
// } from "./utils/api_functions";
// import { useSelector } from "react-redux";
// import { div } from "./utils/math";
// import { FaRegCopy } from "react-icons/fa";

// const Pay = () => {
//   const [timer, setTimer] = useState(3600);
//   const [checkTimer, setCheckTimer] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpired, setIsExpired] = useState(false);
//   const [isCheckExpired, setIsCheckExpired] = useState(false);
//   const [userAssets, setUserAssets] = useState([]);
//   const [selectedSymbol, setSelectedSymbol] = useState("");
//   const [networkOption, setNetworkOption] = useState();
//   const [selectedNetwork, setSelectedNetwork] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");

//   const { token } = useSelector((state) => state.AuthReducer);

//   const location = useLocation();
//   const { user_id, order_id, amount, keys } = location.state || {};

//   useEffect(() => {
//     const getAssets = async () => {
//       const res = await getAssetsUser(token);

//       if (res.asset_data) {
//         setUserAssets(res.asset_data); // Populate the state with asset data
//       } else {
//         console.error("Asset data not found in response");
//       }

//       getUserAccess(res.asset_data);
//     };
//     getAssets();
//   }, [token]);

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     } else {
//       setIsExpired(true);
//     }
//   }, [timer]);

//   useEffect(() => {
//    handleCheckTimer()
//   }, [checkTimer]);

//   const handleCheckTimer = () => {
//     if (checkTimer && checkTimer > 0 ) {
//       const checkInterval = setInterval(() => {
//         setCheckTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(checkInterval);
//     } else {
//       setIsCheckExpired(true);
//     }
//   }

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };
//   const handleSelectChange = async (e) => {
//     setSelectedSymbol(e.target.value);
//     const selectedAsset = userAssets.find(
//       (asset) => asset.symbol === e.target.value
//     );
//     setNetworkOption(selectedAsset.assets.nativeCurrency.symbol);
//   };
//   const proceedPayment = async (e) => {
//     e.preventDefault();
//     const res = await getWalletAddress(keys, selectedSymbol, order_id);
//     setWalletAddress(res.data.address);
//     setCheckTimer(10);
//     const asset = userAssets.filter((item) => item.symbol == selectedSymbol);

//     const res1 = checkTransaction(
//       res.data.address,
//       asset[0].assets.rpcUrl,
//       asset[0].chainId,
//       asset[0].type,
//       asset[0].token_address
//     );
//   };
//   const copyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(walletAddress);
//       alert("copied");
//     } catch (error) {
//       console.error("Failed to copy text: ", error);
//     }
//   };
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <div
//         className="bg-success-subtle shadow  position-relative rounded-5"
//         style={{
//           width: "50%",
//           height: "80vh",
//           minWidth: "300px",
//           maxWidth: "500px",
//         }}
//       >
//         <div className="bg-success rounded-top-5 p-4">
//           <img src="../images/Nute- logo.png" alt="" className="logo"></img>
//           <h2 className="my-4 fw-bold text-white">Select Currency</h2>
//           <h6 className="my-4 fw-bold text-white">{amount} USD</h6>
//           <div className="mb-4 bg-success-subtle p-2 rounded">
//             <div className="d-flex gap-3 align-items-center">
//               {isLoading && (
//                 <div
//                   className="spinner-border text-success-subtle"
//                   role="status"
//                 ></div>
//               )}
//               <div>
//                 <label className="form-label fw-bold">Expiration Timer</label>

//                 {isExpired ? (
//                   <p className="text-danger mb-0">Time Expired</p>
//                 ) : (
//                   <p className="h6 fw-bold mb-0 text-success">
//                     {formatTime(timer)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 pt-5">
//           {isCheckExpired && isCheckExpired !== undefined ? (
//             <div className="text-danger fw-bold">Expired</div>
//           ) : walletAddress ? (
//             <>
//               <p className="text-black-50">Recipient's wallet address</p>
//               <div className="d-flex gap-3 align-items-center">
//                 <span>{walletAddress}</span>
//                 <FaRegCopy onClick={copyAddress} color="gray" />
//               </div>
//               <div className="mt-3">
//                 <label className="form-label fw-bold">
//                   Checking transaction...
//                 </label>
//                 {!isExpired && (
//                   <p className="h6 fw-bold mb-0 text-success">
//                     {formatTime(checkTimer)}
//                   </p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <form>
//               <div className="mb-3">
//                 <select
//                   id="dropdown"
//                   className="form-select mb-3"
//                   onChange={(e) => handleSelectChange(e)}
//                 >
//                   <option value="">Select currency</option>
//                   {userAssets.length > 0 ? (
//                     userAssets.map((asset, index) => (
//                       <option value={asset.symbol} key={index}>
//                         <img src={asset.logo} alt="" width={24} height={24} />
//                         <span>{asset.symbol}</span>
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>Loading currencies...</option>
//                   )}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <select
//                   id="dropdown"
//                   className="form-select mb-3"
//                   disabled={selectedSymbol !== "" ? false : true}
//                 >
//                   <option value="">Select network</option>
//                   <option value="">{networkOption}</option>
//                 </select>
//               </div>
//               <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
//                 <button
//                   className="btn btn-outline-success text-dark py-2"
//                   onClick={(e) => proceedPayment(e)}
//                 >
//                   Proceed to the payment
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pay;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { checkTransaction, getAssetsUser, getUserAccess, getWalletAddress } from "./utils/api_functions";
// import { useSelector } from "react-redux";
// import { FaRegCopy } from "react-icons/fa";

// const Pay = () => {
//   const [timer, setTimer] = useState(3600); // Timer for expiration
//   const [checkTimer, setCheckTimer] = useState(60); // Default to 0 seconds initially
//   const [startCheckTimer, setStartCheckTimer] = useState(false); // Default to 0 seconds initially
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpired, setIsExpired] = useState(false);
//   const [isCheckExpired, setIsCheckExpired] = useState(false);
//   const [userAssets, setUserAssets] = useState([]);
//   const [selectedSymbol, setSelectedSymbol] = useState("");
//   const [networkOption, setNetworkOption] = useState();
//   const [selectedNetwork, setSelectedNetwork] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");

//   const { token } = useSelector((state) => state.AuthReducer);

//   const location = useLocation();
//   const { user_id, order_id, amount, keys } = location.state || {};

//   useEffect(() => {
//     const getAssets = async () => {
//       const res = await getAssetsUser(token);

//       if (res.asset_data) {
//         setUserAssets(res.asset_data); // Populate the state with asset data
//       } else {
//         console.error("Asset data not found in response");
//       }

//       getUserAccess(res.asset_data);
//     };
//     getAssets();
//   }, [token]);

//   // Timer effect for expiration countdown
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     } else {
//       setIsExpired(true);
//     }
//   }, [timer]);

//   // Separate useEffect to handle checkTimer countdown
//   useEffect(() => {
//     if (checkTimer > 0 && startCheckTimer) {
//       const checkInterval = setInterval(() => {
//         setCheckTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(checkInterval);
//     } else {
//       setIsCheckExpired(true);
//     }
//   }, [checkTimer,startCheckTimer]);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleSelectChange = async (e) => {
//     setSelectedSymbol(e.target.value);
//     const selectedAsset = userAssets.find((asset) => asset.symbol === e.target.value);
//     setNetworkOption(selectedAsset.assets.nativeCurrency.symbol);
//   };

//   const proceedPayment = async (e) => {
//     e.preventDefault();
//     const res = await getWalletAddress(keys, selectedSymbol, order_id);
//     setWalletAddress(res.data.address);
//     // setCheckTimer(10); // Start the checkTimer with 10 seconds
//     setStartCheckTimer(true)
//     const asset = userAssets.filter((item) => item.symbol == selectedSymbol);

//     const res1 = checkTransaction(
//       res.data.address,
//       asset[0].assets.rpcUrl,
//       asset[0].chainId,
//       asset[0].type,
//       asset[0].token_address
//     );
//   };

//   const copyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(walletAddress);
//       alert("copied");
//     } catch (error) {
//       console.error("Failed to copy text: ", error);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//       <div className="bg-success-subtle shadow  position-relative rounded-5" style={{ width: "50%", height: "80vh", minWidth: "300px", maxWidth: "500px" }}>
//         <div className="bg-success rounded-top-5 p-4">
//           <img src="../images/Nute- logo.png" alt="" className="logo"></img>
//           <h2 className="my-4 fw-bold text-white">Select Currency</h2>
//           <h6 className="my-4 fw-bold text-white">{amount} USD</h6>
//           <div className="mb-4 bg-success-subtle p-2 rounded">
//             <div className="d-flex gap-3 align-items-center">
//               {isLoading && <div className="spinner-border text-success-subtle" role="status"></div>}
//               <div>
//                 <label className="form-label fw-bold">Expiration Timer</label>
//                 {isExpired ? (
//                   <p className="text-danger mb-0">Time Expired</p>
//                 ) : (
//                   <p className="h6 fw-bold mb-0 text-success">{formatTime(timer)}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 pt-5">
//           {walletAddress ? (
//             <>
//               <p className="text-black-50">Recipient's wallet address</p>
//               <div className="d-flex gap-3 align-items-center">
//                 <span>{walletAddress}</span>
//                 <FaRegCopy onClick={copyAddress} color="gray" />
//               </div>
//               <div className="mt-3">
//                 <label className="form-label fw-bold">Checking transaction...</label>
//                 {isCheckExpired ? (
//                   <p className="text-danger fw-bold">Expired</p>
//                 ) : (
//                   <p className="h6 fw-bold mb-0 text-success">{formatTime(checkTimer)}</p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <form>
//               <div className="mb-3">
//                 <select id="dropdown" className="form-select mb-3" onChange={(e) => handleSelectChange(e)}>
//                   <option value="">Select currency</option>
//                   {userAssets.length > 0 ? (
//                     userAssets.map((asset, index) => (
//                       <option value={asset.symbol} key={index}>
//                         <img src={asset.logo} alt="" width={24} height={24} />
//                         <span>{asset.symbol}</span>
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>Loading currencies...</option>
//                   )}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <select id="dropdown" className="form-select mb-3" disabled={selectedSymbol !== "" ? false : true}>
//                   <option value="">Select network</option>
//                   <option value="">{networkOption}</option>
//                 </select>
//               </div>
//               <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
//                 <button className="btn btn-outline-success text-dark py-2" onClick={(e) => proceedPayment(e)}>
//                   Proceed to the payment
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pay;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  checkTransaction,
  getAssetsUser,
  getUserAccess,
  getWalletAddress,
} from "./utils/api_functions";
import { useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa";
import { NotificationManager } from "react-notifications";

const Pay = () => {
  const [timer, setTimer] = useState(3600); // Timer for expiration (1 hour)
  const [checkTimer, setCheckTimer] = useState(10); // Timer for checking transaction (1 minute)
  const [startCheckTimer, setStartCheckTimer] = useState(false); // Timer for checking transaction (1 minute)
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [isCheckExpired, setIsCheckExpired] = useState(false);
  const [userAssets, setUserAssets] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState();
  // const [networkOption, setNetworkOption] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const [userAssetList, setUserAssetList] = useState([]);
  const [userAssetSlug, setUserAssetSlug] = useState([]);

  const { token } = useSelector((state) => state.AuthReducer);

  const location = useLocation();
  const navigate = useNavigate();
  const { user_id, order_id, amount, keys } = location.state || {};

  // console.log(keys)

  const processUserAssets = (data) => {
    console.log(data);
    const userAssetsSet = new Set();
    const userAssetSlugMap = {};

    data.forEach(({ symbol, slug }) => {
      userAssetsSet.add(symbol);

      if (!userAssetSlugMap[symbol]) {
        userAssetSlugMap[symbol] = [];
      }

      userAssetSlugMap[symbol].push(slug);
    });

    console.log("Array.from(userAssetsSet)", Array.from(userAssetsSet));
    console.log("[userAssetSlugMap]", [userAssetSlugMap]);

    setUserAssetList(Array.from(userAssetsSet));
    setUserAssetSlug([userAssetSlugMap]);
  };

  useEffect(() => {
    const getAssets = async () => {
      const res = await getAssetsUser(token);
      if (res.asset_data) {
        setUserAssets(res.asset_data);
        processUserAssets(res.asset_data);
      } else {
        console.error("Asset data not found in response");
      }
    };
    getAssets();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsExpired(true);
    }
  }, [timer]);

  useEffect(() => {
    if (startCheckTimer) {
      if (checkTimer > 0) {
        const checkInterval = setInterval(() => {
          setCheckTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(checkInterval);
      } else {
        setIsCheckExpired(true);
        setTimeout(() => {
          navigate("/addfunds");
        }, 1000);
      }
    }
  }, [checkTimer, startCheckTimer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectChange = async (e) => {
    setSelectedSymbol(e.target.value);
    const selectedAsset = userAssets.find(
      (asset) => asset.symbol === e.target.value
    );
    setSelectedCurrency(selectedAsset);
  };

  const proceedPayment = async (e) => {
    e.preventDefault();

    const res = await getWalletAddress(keys, selectedSymbol, order_id,selectedNetwork);

    if (!res || !res.data || !res.data.address) {
      console.error("❌ Error: Wallet address not received!");
      return NotificationManager.error("Access denied from this origin.");
    }

    setWalletAddress(res.data.address);
    setStartCheckTimer(true);

    const asset = userAssets.find((item) => item.symbol === selectedSymbol);

    if (!asset) {
      console.error("❌ Error: Asset not found!");
      return NotificationManager.error("Invalid asset selected!");
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await checkTransaction(
          res.data.address,
          order_id,
          asset.slug
        );

        if (response && response.status === 200) {
          setStartCheckTimer(false);
          setTransactionSuccess(true);
          clearInterval(intervalId);
          setTimeout(() => {
            navigate("/addfunds", { state: { status: true } });
          }, 1000);
        }
      } catch (error) {
        console.error("❌ Error checking transaction:", error);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      alert("copied");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const chainToStandard = {
    ethereum: "ERC-20",
    polygon: "POL-20",
    binance_smart_chain: "BEP-20",
    tron: "TRC-20",
    solana: "SPL",
    ton: "TON-20",
    avalanche: "ARC-20",
    fantom: "FRC-20",
    arbitrum: "ARB-20",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className={`${
          isCheckExpired ? "bg-danger-subtle" : "bg-success-subtle"
        } shadow  position-relative rounded-5`}
        style={{
          width: "50%",
          height: "80vh",
          minWidth: "300px",
          maxWidth: "500px",
        }}
      >
        <div className="bg-success rounded-top-5 p-4">
          <img src="../images/Nute- logo.png" alt="" className="logo"></img>
          <h2 className="my-4 fw-bold text-white">Select Currency</h2>
          <h6 className="my-4 fw-bold text-white">{amount} USD</h6>
          {/* <div className="mb-4 bg-success-subtle p-2 rounded">
            <div className="d-flex gap-3 align-items-center">
              {isLoading && (
                <div
                  className="spinner-border text-success-subtle"
                  role="status"
                ></div>
              )}
              <div>
                <label className="form-label fw-bold">Expiration Timer</label>
                {isExpired ? (
                  <p className="text-danger mb-0">Time Expired</p>
                ) : (
                  <p className="h6 fw-bold mb-0 text-success">
                    {formatTime(timer)}
                  </p>
                )}
              </div>
            </div>
          </div> */}
        </div>

        <div className="p-4 pt-5">
          {isCheckExpired ? (
            <div className="text-danger fw-bold">Expired</div>
          ) : transactionSuccess ? (
            <div className="text-success fw-bold">Transaction successfull</div>
          ) : walletAddress ? (
            <>
              <p className="text-black-50">Recipient's wallet address</p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <span className="text-break">{walletAddress}</span>
                <FaRegCopy onClick={copyAddress} color="gray" />
              </div>
              <div className="mt-3">
                <label className="form-label fw-bold">
                  Checking transaction...
                </label>
                {!isCheckExpired && (
                  <p className="h6 fw-bold mb-0 text-success">
                    {formatTime(checkTimer)}
                  </p>
                )}
              </div>
            </>
          ) : (
            <form>
              <div className="mb-3">
                <select
                  id="dropdown"
                  className="form-select mb-3"
                  onChange={(e) => handleSelectChange(e)}
                >
                  <option value="">Select currency</option>
                  {userAssetList.length > 0 ? (
                    userAssetList.map((asset, index) => (
                      <option value={asset} key={index}>
                        {/* <img src={asset.logo} alt="" width={24} height={24} /> */}
                        {/* <span>{asset}</span> */}
                        {asset}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading currencies...</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <select
                  id="dropdown"
                  className="form-select mb-3"
                  disabled={selectedSymbol !== "" ? false : true}
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                >
                  <option value="">Select network</option>
                  {/* {selectedSymbol && selectedCurrency && (
                    <option
                      value={
                        {
                          ethereum: "ERC-20",
                          polygon: "POL-20",
                          binance_smart_chain: "BEP-20",
                          tron: "TRC-20",
                          solana: "SPL",
                          ton: "TON-20",
                          avalanche: "ARC-20",
                          fantom: "FRC-20",
                          arbitrum: "ARB-20",
                        }[selectedCurrency.slug] || ""
                      }
                    >
                      {{
                        ethereum: "ERC-20",
                        polygon: "POL-20",
                        binance_smart_chain: "BEP-20",
                        tron: "TRC-20",
                        solana: "SPL",
                        ton: "TON-20",
                        avalanche: "ARC-20",
                        fantom: "FRC-20",
                        arbitrum: "ARB-20",
                      }[selectedCurrency.slug] || ""}
                    </option>
                  )} */}
                  {/* {userAssetSlug[0]?.[selectedSymbol]?.map((chain) => (
                    <option key={chain} value={chain}>
                      {chain.toUpperCase()}
                    </option>
                  ))} */}
                  {userAssetSlug[0]?.[selectedSymbol]?.map((chain) => (
                    <option key={chain} value={chain}>
                      {chainToStandard[chain] || chain.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
                <button
                  className="btn btn-outline-success"
                  disabled={selectedSymbol && selectedNetwork ? false : true}
                  onClick={(e) => proceedPayment(e)}
                >
                  Proceed to the payment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pay;
