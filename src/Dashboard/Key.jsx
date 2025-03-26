import React, { useState, useEffect } from "react";
import "./Domainverification.css";
import Header from "./Header";
import Menuitem from "../components/Menuitem";
import { NotificationManager } from "react-notifications";
import { createApiKey, getKeysData } from "../pages/utils/api_functions";
import usePageMetadata from "../pages/usePageMetadata";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Keycode from "./Keycode";
const Key = () => {
  usePageMetadata({
    title: "Manage Your API Keys: Nute Payment Gateway",
    description:
      "Securely generate and manage API keys for your payment gateway services",
  });
  const { token } = useSelector((state) => state.AuthReducer);
  const [currentStep, setCurrentStep] = useState(1);
  const [api_key, setApiKey] = useState("");
  const [secret_key, setSecretKey] = useState("");
  const [keysdata, setkeysdata] = useState([]);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [load, setLoad] = useState(false);

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
      console.log(res)
    });
  }, [load]);

  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid  subdashbordmain">
          <div className="pagewrapper">
            <div className="mt-3 mb-5">
              <h1 className="fw-bold table-heading">Api Keys</h1>
              <p className="gSPqhc">
              Enhance the security of your cryptocurrency transactions by managing API keys securely
              </p>
            </div>

            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="fw-bold m-0">Your API Keys</p>
              <button
                    className="btn btn-outline-success h"
                    onClick={() => {
                      createApiKey(token).then((res) => {
                        if (res.status == 200) {
                          setLoad(!load);
                          NotificationManager.success(res.message);
                        } else {
                          NotificationManager.error(res.message);
                        }
                      });
                    }}
                  >
                    create api key
                  </button>
              </div>
             
              <div className="key-table table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-dark">
                        Domain
                      </th>
                      <th>API Key</th>
                      <th>Secret Key</th>
                      <th>Name</th>
                      <th>Create on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keysdata.length>0 ? keysdata.map((item)=>{
                      return(
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
                        <td  className="e2grw2-5 text-dark">
                          {item.domain}
                        </td>
                        <td className="e2grw2-5">{item.api_keys}</td>
                        <td className="e2grw2-5">{item.secret_keys}</td>
                        <td className="e2grw2-5">nute</td>
                        <td className="e2grw2-5">{new Date(item.createdAt).toLocaleString()}</td>
                      </tr>
                      )
                    }):<tr>
                    <td className="text-center" colSpan={5}>
                   <div >
                      <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                      <p className="text-center text-secondary fw-bold">
                        No Record Found...
                      </p>
                
              </div>
              </td>
                  </tr>}
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <div className="row">
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
                  <div className="col-lg-8 col-sm-12">
          
<Keycode/>
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

export default Key;
