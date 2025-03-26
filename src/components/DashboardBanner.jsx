import React from "react";

const DashboardBanner = () => {
  return (
    <>
      <div className="dasbord_banner">
        <h1 className="fs-5 text-light">Product Activation Pending</h1>
        <p className="text-light">
          We noticed you may need the below products.Submit the activation form
          and use our products that best suit your bussiness needs.
        </p>
        <div className="bannerlist">
          <ul className="bannerlistc text-light p-2">
            <li className="list-group-item"><div><p className="text-light m-0">Products Pending : </p></div></li>
            <li className="list-group-item"><div className="d-flex gap-2 align-items-baseline"><div><img src="images/Easy Split.png" alt="Easy Split.png"  /></div> <div><p className=" text-light m-0">Easy Split</p></div></div> </li>
            <li className="list-group-item"><div className="d-flex gap-2 align-items-baseline"><div><img src="images/Auto collect.png" alt="Auto collect.png"  /></div> <div><p className="text-light m-0">Auto Collect</p></div>   </div> </li>
            <li className="list-group-item"><div className="d-flex gap-2 align-items-baseline"><div><img src="images/Subscription.png" alt=""  /></div> <div ><p className="text-light m-0">Subscription</p></div></div> </li>
            <li className="list-group-item"><div className="d-flex gap-2 align-items-baseline"><div><img src="images/Payment gateway.png" alt=""  /></div> <div><p className="text-light m-0">Payment Gateway</p></div> </div></li>
            <li className="list-group-item"><div className="d-flex gap-2 align-items-baseline"><div><img src="images/Offline Payments.png" alt=""  /></div> <div><p className="text-light m-0">softPOS</p></div></div> </li>
          </ul>
        </div>
        <button type="button" className="btn btn-light">
          Complete Now
        </button>
      </div>
    </>
  );
};

export default DashboardBanner;
