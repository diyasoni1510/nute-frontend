import React, { useEffect } from "react";
import Header from "./Header";
import DashboardBanner from "../components/DashboardBanner";
import Card from "../components/Card";
import ReedemVoucher from "./ReedemVoucher";
import { useNavigate } from "react-router-dom";
import usePageMetadata from "../pages/usePageMetadata";
import { useSelector } from 'react-redux';
const Dashboard = (props) => {
  usePageMetadata({
    title: 'Nute Payment Gateway: User Dashboard',
    description: 'Manage your payment gateways and monitor transactions in one convenient place',
  });
  const navigate = useNavigate()
  let login = localStorage.getItem("islogin");
  
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
      <div className="">
        <Header />
        <div className="container-fluid">
          <DashboardBanner />

          <div className="card-section">
            <h3 className="">Explore Our Porducts</h3>
            <div className="row">
              <div className="col-lg-9 col-md-6 col-sm-6 col-xs-12">
                <div className="product-list">
                
                    <Card
                    image="images/Payment gateway.png"
                      heading="Payment Gateway"
                      text="Accept domestic and international payments with 100+ payment options. Get paid the next day."
                      button_txt=" Complete Activation"
                      btnclass="card-button-active"
                      link=""
                    />
                
                  
                    <Card
                     image="images/Payout.png"
                      heading="Payouts"
                      text="Send payments instantly to any bank account, UPI VPA, card, or wallet."
                      button_txt=" Complete Activation"
                      btnclass="card-button-active"
                      link=""
                    />
                
                  
                    <Card
                     image="images/Payment Links.png"
                      heading="Crypto Gateway"
                      text="Create and share payment links instantly with your customers via SMS, email, WhatsApp etc., and receive payments in no time."
                      button_txt=" Complete Activation"
                      btnclass="card-button-active"
                      link="/summary"
                    />
              
            
                    <Card
                    image="images/BBPS.png"
                      heading="BBPS - Biller"
                      text="Leverage BBPS to collect payments at low cost with wide reach."
                      button_txt=" Complete Activation"
                      btnclass="card-button-active"
                    />
                  
                  
                    <Card
                    image="images/BBPS.png"
                      heading="Recharge Gateway"
                      text="Leverage BBPS to collect payments at low cost with wide reach."
                      button_txt=" Complete Activation"
                      btnclass="card-button-active"
                    />
                  
                
                    <Card
                    image="images/Offline Payments.png"
                      heading="Offline Payments - SoftPOS"
                      text="Collect Offline Payments for your storefronts and fleet on the street using various modes such as Static QR, Dynamic QR, and Tap n Pay.                  "
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                    />
                
                  
                    <Card
                     image="images/Subscription.png"
                      heading="Subscriptions"
                      text="Collect payment automatically via eNACH, UPI or Credit & Debit Cards without customer intervention."
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                    />
                
                
                
                    <Card
                     image="images/Cashgram.png"
                      heading="Cashgram"
                      text="Send Payout links to customers and provide them with the flexibility to collect the amount via bank account, UPI, or wallet instantly.                  "
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                   />
                  
                  
                    <Card
                     image="images/Auto collect.png"
                      heading="Auto Collect"
                      text="Match inbound payments to customers automatically using virtual account and virtual UPI IDs."
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                    />
                  
                  
                    <Card
                    image="images/Cross border.png"
                      heading="Cross Border"
                      text="Easily enable a variety of online international payments like education, travel and others."
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                    />
                  
                    <Card
                    image="images/Global Collection.png"
                      heading="Global Collections"
                      text="Receive international wire transfers at low-cost."
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                    />
                  
                  
                
                    <Card
                    image="images/Verification.png"
                      heading="Verification Suite"
                      text="Verify Aadhar, PAN, GSTIN and Bank a/c details of an individual or business and do identity verification in real-time."
                      button_txt=" Comming Soon"
                      btnclass="card-button-inactive"
                      
                    />
                  
                </div>
              </div>
              <div className="col-lg-3  col-md-6 col-sm-6 col-xs-12">
                <div className="">
                  <h6 className="">Integrate</h6>
                  <p className="tiny-light-p fw-bold text-dark m-0 mb-4">Explore our SDKs, Plugins, and APIs to start integrating.</p>
                  <div className=" d-flex gap-3">
                    <button
                      type="button"
                      className="card-button-active btn-sm"
                    >
                      Developer Docs
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                    >
                      Api Changelog
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mb-2">
                    <i className="fa-solid fa-clock "></i>{" "}
                    <p
                      className="cus_margin text-success fw-bold"
                      style={{ textDecoration: "none" }}
                    >
                      Status Page
                    </p>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </div>

                  <div className=" card card2">
                    <p className="text-light fw-bold cus_margin">
                      Do you have any coupons?
                    </p>
                    <p className="text-light cus_margin">
                      Redeem it now to get free credits.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <img
                          src="images/polygon.png"
                          alt=""
                          className="card-img1"
                        />
                        <img
                          src="images/polygon.png"
                          alt=""
                          className="card-img2"
                        />
                      </div>

                      <div className="">
                       <ReedemVoucher/>
                      </div>
                    </div>
                  </div>

                  <div className="helpbox">
                    <div
                      className=""
                      style={{ borderBottom: "1px solid #a8a4a4" }}
                    >
                      <p className="fw-bold cus_margin ">Need help?</p>
                      <p className="cus_margin mb-2">info@nute.com</p>
                    </div>
                    <div className="mt-2">
                      <select className="selectbox">
                        <option value="A">Account Manager</option>
                        <option value="B">Simran Kaur</option>
                        <option value="C">info@nute.com</option>
                        <option value="D">Working Hours 10:00 am to 06:00 pm</option>
                      </select>
                    </div>
                 
                  </div>
                  <div className=" d-flex gap-2 justify-content-center appdownloaddiv">
                        <div className="">
                          <img
                            src="images/asset-1.png"
                            className="appdownload"
                            alt=""
                          />
                        </div>
                        <div className="">
                          <img
                            src="images/asset-2.png"
                            className="appdownload"
                            alt=""
                          />
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

export default Dashboard;
