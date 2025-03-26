import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteUserAddress, sendOTP } from "../../pages/utils/api_functions";
const DeleteWallet = ({wallet_address, updateIsCall}) => {
    const {token} = useSelector((state)=>state.AuthReducer);
    const [isAgree, setIsAgree] = useState();
    const [otp, setotp] = useState();
    return (
      <>
  <button type="button" className="text-danger bg-light" data-bs-toggle="modal" data-bs-target="#deleteWallet">
  {" "}
  <i className="fas fa-close"></i>
  </button>
  
  <div className="modal fade" id="deleteWallet" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered ">
      <div className="modal-content">
        <div className="modal-header" style={{background:"#e6e9ee"}}>
          <h5 className="modal-title" id="deleteWalletLabel">Delete Wallet</h5>
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
           Fund may loss if wallet will delete
          </div>}
        </div>
        {isAgree?
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success" data-bs-dismiss="modal"
           onClick={()=>{
            deleteUserAddress(wallet_address, otp, token)
            .then((res)=>{
              if(res.status==200){
                updateIsCall();
              }
            })
          }}
          >Confirm</button>
        </div>:<div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success"
          onClick={(e)=>{
            sendOTP(token)
            .then((res)=>{
                if(res.status==200) {
                    setIsAgree(!isAgree);
                }
            })
            
          }}
          >Yes</button>
        </div>}
      </div>
    </div>
  </div>  
      </>
    )
  }

 export default DeleteWallet