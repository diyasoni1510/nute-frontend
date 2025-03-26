import React from "react";

const ReedemVoucher = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-light text-succes"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalredeem"
      >
        Redeem
      </button>

      <div
        className="modal fade"
        id="exampleModalredeem"
        tabIndex="-1"
        aria-labelledby="exampleModalredeemLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header modelheading">
              <h5 className="modal-title fw-normal" id="exampleModalredeemLabel">
                Redeem Voucher
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body reedemmodalbody">
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter the coupon code here</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default ReedemVoucher;
