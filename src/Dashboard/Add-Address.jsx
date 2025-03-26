import React, { useState, useEffect } from "react";
import Tabel from "../components/Tabel";
import Menuitem from "../components/Menuitem";
import Header from "./Header";
import CreatePayemtForm from "./CreatePayemtForm";
import QRCode from "qrcode.react"
import "./table.css";
import { addWallet, deleteUserAddress, getAssetsUser, userAddress } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DeleteWallet from "./ManageAccountDashboard/DeleteWallet";

const MySwal = withReactContent(Swal);
const ChainInput = ({ value, onChange, onBlur }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleInChange = (e)=>{
    onBlur(e.target.value)
  }

  return (
    <div className="d-flex">
      {/* <select value={value} onChange={handleInputChange} className="selecthgt">
        Add your select options here
        <option value="97">97</option>
        <option value="56">56</option>
      </select> */}
      <input
        type="text"
        className="inputslct"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInChange}
      />
    </div>
  );
};



const sweetalert = (row) =>{
  const handleQRCodeClick = () => {
    MySwal.fire({
      title: <p>Deposit Address</p>,
      html: <QRCode value={row.wallet_address} size="200" />,
      confirmButtonText: 'Close',
      showCloseButton: true,
    });
  };

  return (
    <p onClick={handleQRCodeClick} className="m-auto">
      <QRCode value={row.wallet_address} size="30" style={{margin:"auto"}} />
    </p>
  );
};

const AddAddress = () => {
  const {token} = useSelector((state)=>state.AuthReducer);
  
  const [data, setData] = useState();
  const [wallet_address, setWalletAddress] = useState('')
  const [user_assest, setUserAssest] = useState([]);
  const [iscall, setIscalled] = useState(false);
  // const [data, setData] = useState([
  //   { serialNo: "1", Wallet: "0x09...2344", Chain: "97", Balance: "25 $" },
  // ]);

  const createRow = (symbol) => {
    const newSerialNo = (data.length + 1).toString(); // Generate serial number
    // setData([
    //   ...data,
    //   { serialNo: newSerialNo, Wallet: "", Chain: "", Balance: "" },
    // ]);

    addWallet(token, symbol)
    .then((res)=>{
      if(res.status ==200) {
        setIscalled(!iscall)
      } else {
        NotificationManager.error(res.message)
      }
    })


  };

  const updateIsCall = () =>{
    setIscalled(!iscall)
  }

  const removeRow = (index) => {
    if (data.length > 1) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    } else {
      alert("You don't have permission to delete this?");
    }
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  useEffect(()=>{
    userAddress(token)
    .then((res)=>{
      if(res.status==200) {
        setData(res.address)
      }
    })
  }, [iscall]);

  useEffect(()=>{
    getAssetsUser(token)
    .then((res)=>{
      if(res.status==200) {
        setUserAssest(res.asset_data)
      }
    })
  }, [])
  let asset_data = user_assest && user_assest.map((item)=>{
    return (
      <option value={item.symbol}>{item.symbol}</option>
    )
  })

  return (
    <>
      <Header />
      <div className="d-flex">
       
            <Menuitem />
      
          <div className="container-fluid  subdashbordmain">
            <div className="pagewrapper">
              <div className="d-flex align-items-baseline gap-2">
                {/* <i
                  className="fas fa-wallet"
                  style={{ color: "green", fontSize: "30px" }}
                /> */}
                <h1 className="mt-4 mb-3 fw-bold table-heading">Wallet</h1>
              </div>
              <p className="fs-6 gSPqhc">All payment forms are shown here</p>
              <div className="text-end mb-2">
                {/* <CreatePayemtForm /> */}
                <div className="col offset-md-10">
                <select className="form-control" onChange={(e)=>{
                  createRow(e.target.value)
                }}>
                <option disabled selected>Please Select Coin</option>
                  {asset_data}
                </select>
                </div>
                {/* <div className="row offset-md-8">
                <div className="col-md-6">
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter Your Listed Coin"
                  />
                </div>
                <div className="col-md-4">
                  <button className="bg-success" onClick={createRow}>
                    Add Wallet
                  </button>
                </div>
              </div> */}
              </div>

              <div className="sub-tab table-responsive">
                <table
                  id="example"
                  className="table  "
                  style={{ width: "100%" }}
                >
                  <thead className="table-head">
                    <tr>
                      {/* <th>Scanner</th> */}
                      <th>Wallet</th>
                      <th>Symbol</th>
                      <th>Balance</th>
                      <th>Action</th>
                    </tr>
                  </thead>{" "}
                  {/* <tbody id="table_body">
              {!data.length >= 0 ? (
                <>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                      <td>
                        <div className="action_container">
                          <button
                            className="danger"
                            onClick={() => removeRow(rowIndex)}
                          >
                            <i className="fa fa-close"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={data.length} className="text-center">
                      <div>
                        <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                        <p className="text-center text-secondary fw-bold">
                          No Record Found...
                        </p>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </tbody> */}
                  <tbody className="tale-body">
                    {data && data.length > 0 ? (
                      <>
                        {data.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {/* {sweetalert(row)} */}
                            <td>
                              <div className="input-group ">
                              <span className="input-group-text" id="basic-addon1" style={{height:"47px"}}>{sweetalert(row)}</span>
                              <input
                              className="form-control"
                                type="text"
                                value={row.wallet_address}
                                // onChange={(e) =>
                                //   handleChange(
                                //     rowIndex,
                                //     "Wallet",
                                //     e.target.value
                                //   )
                                // }
                                disabled
                                readOnly
                              />
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={row.symbol}
                                // onChange={(e) =>
                                //   handleChange(
                                //     rowIndex,
                                //     "Symbol",
                                //     e.target.value
                                //   )
                                // }
                                disabled
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={row.balance}
                                // onChange={(e) =>
                                //   handleChange(
                                //     rowIndex,
                                //     "Symbol",
                                //     e.target.value
                                //   )
                                // }
                                disabled
                                readOnly
                              />
                            </td>
                            <td>
                              <DeleteWallet wallet_address={row.wallet_address} updateIsCall={updateIsCall} />
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        <tr>
                          <td colSpan="5" className="text-center">
                            <div className="mt-5 mb-5">
                              <i className="fa-regular fa-face-sad-tear fs-3 text-secondary"></i>
                              <p className="text-center text-secondary fw-bold">
                                No Record Found...
                              </p>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div> 
        </div>
      
    </>
  );
};

export default AddAddress;
