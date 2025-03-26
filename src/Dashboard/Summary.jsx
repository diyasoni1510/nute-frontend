import React, { useEffect, useState } from "react";
import Menuitem from "../components/Menuitem";
import Header from "./Header";
import usePageMetadata from "../pages/usePageMetadata";
import {
  getTotal,
  getHistory,
  checkInvoicePayment
} from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { round } from "../pages/utils/math";
const Summary = () => {
  const navigate = useNavigate();
  const { token, profile } = useSelector((state) => state.AuthReducer);
  const [history, setHistory] = useState([]);
  const [order_history, setOrderHistory] = useState([]);
  const [total, setTotal] = useState();
  usePageMetadata({
    title: "Crypto Payment : Summary",
    description:
      "View detailed summaries of your crypto transactions and payment activities",
  });

  useEffect(() => {
    let data = {
      page:1,
      per_page:10,
    }
    getHistory(data, token).then((res) => {
      if (res.status === 200) {
        setHistory(res.data);
        if(res.data.length>4) {
          setOrderHistory(res.data.slice(0, 4))
        } else {
          setOrderHistory(res.data)
        }
      }
    });
    getTotal(token).then((res) => {
      if (res.status === 200) {
        console.log("res", res);
        setTotal(res.data);
      }
    });
  }, []);
  useEffect(()=>{
    checkInvoicePayment(token);
  }, []);
  return (
    <>
      <Header />

      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid subdashbordmain">
          <div className=" pagewrapper">
            <h1 className="mt-4 mb-4 fw-bold table-heading">
              Hello,{" "}
              {profile?.name ? profile?.name : profile?.email?.split("@")[0]}
              ..&#128075;
            </h1>
            <div className="alert alert-success mt-4 mb-2 d-flex justify-content-between align-items-center">
              <div className=" d-flex align-items-center " role="alert">
                <div className="rocket">
                  <i className="fa-solid fa-rocket text-success "></i>
                </div>
                <div className="">
                  {" "}
                  <p className="text-dark fw-bold mb-0 ">
                    Fastenup your research
                  </p>
                  <p className="text-dark  mb-0">integrate more tools</p>
                </div>
              </div>
              <div className="">
                <button type="button" className="btn btn-success btn-sm" >
                  Wallet Balance
                </button>
              </div>
            </div>
           
            <div className="mt-5 mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="fw-bold fs-6">Transation History</p>
                <p className="fw-bold fs-6 text-success" style={{"cursor":"pointer"}} onClick={()=>{
                   
                   navigate("../Transcations", { replace: true });
                }}>See all</p>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-12 col-mb-12">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Today Deposit{" "}
                        <span className="sidebaricon">
                          <i className="fa-solid fa-money-check"></i>
                        </span>
                      </h5>
                      <hr />

                      <p className="card-text mb-1">Amount</p>
                      <div className="kbQqVE">
                        <em className="fst-normal text-success fw-bold">$</em>{" "}
                        {parseFloat(total?.total_today)
                          ? round(total?.total_today)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-mb-12">
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
                          ? round(profile?.total_deposit)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-mb-12 ">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Today withdrawal{" "}
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
                        {parseFloat(total?.wtotal_today)
                          ? round(total.wtotal_today)
                          : 0.0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-mb-6 ">
                  <div className="card summarycard m-1">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        Total withdraw{" "}
                        <span className="sidebaricon">
                          <img
                            src="images/withdraw.png"
                            alt="withdraw"
                            style={{ width: "25px" }}
                          />
                        </span>
                      </h5>
                      <hr />

                      <p className="card-text mb-1">Amount</p>
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
              <div className="row mt-5 mb-5">
                <div className="col-lg-7">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="fw-bold fs-6">Transation History</p>
                    <Link to="/Transcations" className="text-decoration-none">
                      <p className="fw-bold fs-6 text-success">See all</p>
                    </Link>
                  </div>
                  <div className="table-responsive summarytble border-0 h-100">
                    <table className="table  pe-auto mb-0">
                      <thead className=" rounded-0">
                        <tr>
                          <th scope="col" className="rounded-0">
                            OrderId
                          </th>
                          <th scope="col">Amount</th>
                          <th scope="col">Currency</th>
                          <th scope="col">Time</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.length>0 ? (
                          history.map((item) => {
                            return (
                              <tr
                                class={
                                  item.type === "withdrawal"
                                    ? "table-danger"
                                    : "table-success"
                                }
                              >
                                <td
                                  scope="row"
                                  class={
                                    item.type === "withdrawal"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {item.order_id.slice(0, 2)}...
                                  {item.order_id.slice(-2)}
                                </td>
                                <td
                                  class={
                                    item.type === "withdrawal"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {round(item?.amount)}
                                </td>
                                <td
                                  class={
                                    item.type === "withdrawal"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {item.symbol}
                                </td>
                                <td
                                  class={
                                    item.type === "withdrawal"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {new Date(item.updatedAt).toLocaleString()}
                                </td>
                                <td
                                  class={
                                    item.type === "withdrawal"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {item.address.slice(0, 4)}...
                                  {item.address.slice(-4)}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <>
                            <td className="text-center" colSpan={5}>
                              <div className="p-5">
                                <img
                                  src="images/norecord.png "
                                  style={{ width: "80px", margin: "0px auto" }}
                                  alt=""
                                />
                                <p className="text-center fw-bold text-secondary">
                                  No Record
                                </p>
                              </div>
                            </td>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="l_transaction">
                    <p className="fw-bold fs-6 ">Latest Transactions</p>
                  </div>
                  {order_history.length>0 ? (
                    order_history.map((item, index) => {
                      return (
                        <div className="card summarycard-2 mb-1">
                          <div className="card-body">
                            <h6 className="card-title fw-bold ">
                              <i className="fa-solid fa-user text-success"></i>{" "}
                              Order ID{" "}
                              <em
                                className="fst-normal text-secondary "
                                style={{ fontSize: "13px" }}
                              >
                                {item?.order_id}
                              </em>
                            </h6>
                            <p className="card-text mb-0">
                              <small className="text-muted">
                                <em className="fst-normal fw-bolder">
                                  {item.type=='deposit'?"Received":"Send"}
                                </em>{" "}
                                : {round(item?.amount)}
                              </small>
                            </p>
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="card-text mb-0">
                                <small className="text-muted">
                                  <em className="fst-normal fw-bolder">
                                    <i className="fa-solid fa-clock"></i>
                                  </em>{" "}
                                  : {new Date(item.updatedAt).toLocaleString()}
                                </small>
                              </p>
                              <p className="card-text mb-0">
                                <small className="text-muted">
                                  <i className="fa-solid fa-paperclip text-danger"></i>{" "}
                                  OrderID Link :{" "}
                                  <Link to="" className="text-success">
                                    meet google.com
                                  </Link>
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="card h-100 w-100 text-center border-0">
                      <div className="m-auto">
                        <img
                          src="images/no-results-found.png "
                          style={{ width: "80px", margin: "0px auto" }}
                          alt=""
                        />
                        <p className="text-center fw-bold text-secondary">
                          No Activity Found
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
