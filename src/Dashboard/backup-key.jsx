import React, { useState, useEffect } from "react";
import "./Domainverification.css";
import Header from "./Header";
import Menuitem from "../components/Menuitem";
import { NotificationManager } from "react-notifications";
import { createApiKey, getKeysData } from "../pages/utils/api_functions";
import usePageMetadata from "../pages/usePageMetadata";
import { useSelector } from "react-redux";
const Key = (props) => {
  usePageMetadata({
    title: 'Manage Your API Keys: Nute Payment Gateway',
    description: 'Securely generate and manage API keys for your payment gateway services',
  });
  const { token } = useSelector((state) => state.AuthReducer);
  const [currentStep, setCurrentStep] = useState(1);
  const [api_key, setApiKey] = useState("");
  const [secret_key, setSecretKey] = useState("");
  const [keysdata, setkeysdata] = useState([]);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  const copyToClipboard = (text, setShowTooltip) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied");
        setTooltipMessage("Copied");
        setShowTooltip(true);
      })
      .catch((err) => {
        console.error("Copy failed", err);
        setTooltipMessage("Copy failed");
        setShowTooltip(true);
      });
  };

  useEffect(() => {
    // Hide tooltip after 2 seconds
    const timeoutId = setTimeout(() => {
      setShowTooltip1(false);
      setShowTooltip2(false);
    }, 2000);

    return () => {
      // Clear the timeout if the component unmounts
      clearTimeout(timeoutId);
    };
  }, [showTooltip1]);

  useEffect(() => {
    getKeysData(token).then((res) => {
      setkeysdata(res.keys);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid  subdashbordmain">
          <div className="pagewrapper">
            <h1 className="mt-4 mb-2 fw-bold table-heading">
              Domain Verification
            </h1>
            <p className="fs-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Deserunt, ullam?
            </p>
          

          <div className=" container domain-verification">
            {keysdata ? (
              <div key={keysdata._id}>
                   <h3>Api key</h3>
                <div className="content-box">
             
                  <div
                    className="d-flex justify-content-between align-items-center"
                    id="copyText"
                    onClick={() =>
                      copyToClipboard(keysdata.api_keys, setShowTooltip1)
                    }
                  >
                    <p className="m-0">{keysdata.api_keys}</p>
                    <p className="m-0">
                      <i className="fa-regular fa-copy"></i>
                    </p>
                  </div>
                  {showTooltip1 && (
                    <div className="tooltip">{tooltipMessage}</div>
                  )}
                </div>
                <h3>Secret key</h3>
                <div className="content-box">
                
                  <div
                    className="d-flex justify-content-between align-items-center"
                    id="copyText"
                    onClick={() =>
                      copyToClipboard(keysdata.secret_keys, setShowTooltip2)
                    }
                  >
                    <p className="m-0">{keysdata.secret_keys}</p>
                    <p className="m-0">
                      <i className="fa-regular fa-copy"></i>
                    </p>
                  </div>
                  {showTooltip2 && (
                    <div className="tooltip">{tooltipMessage}</div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="d-grid gap-2 col-3 pt-1 pb-1">
                  {api_key && secret_key? null:
                  <button
                    className="btn btn-outline-success h"
                    onClick={() => {
                      createApiKey(token).then((res) => {
                        if (res.status == 200) {
                          setApiKey(res.api_keys);
                          setSecretKey(res.secret_keys);
                          setCurrentStep(2);
                          NotificationManager.success(res.message);
                        } else {
                          NotificationManager.error(res.message);
                        }
                      });
                    }}
                  >
                    create api key
                  </button>}
                </div>
                <div
                  className={`form-section ${currentStep === 2 && "active"}`}
                >
                  <h3>Api key</h3>
                  <div className="content-box">
                   
                    <div
                      className="d-flex justify-content-between align-items-center"
                      id="copyText"
                      onClick={() => copyToClipboard(api_key, setShowTooltip1)}
                    >
                      <p className="m-0">{api_key}</p>
                      <p className="m-0">
                        <i className="fa-regular fa-copy"></i>
                      </p>
                    </div>
                    {showTooltip1 && (
                      <div className="tooltip">{tooltipMessage}</div>
                    )}
                  </div>
                  <h3>Secret key</h3>
                  <div className="content-box">
                   
                    <div
                      className="d-flex justify-content-between align-items-center"
                      id="copyText"
                      onClick={() => copyToClipboard(secret_key, setShowTooltip2)}
                    >
                      <p className="m-0">{secret_key}</p>
                      <p className="m-0">
                        <i className="fa-regular fa-copy"></i>
                      </p>
                    </div>
                    {showTooltip2 && (
                      <div className="tooltip">{tooltipMessage}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Key;
