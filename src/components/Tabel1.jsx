import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import { updateAssetsUser } from "../pages/utils/api_functions";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
const Tabel1 = ({ assetsData, tableHeadings }) => {
  // console.log(assetsData)
  const { token } = useSelector((state) => state.AuthReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assetsData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateUserAssets = (data, action) => {
    updateAssetsUser(data, action, token).then((res) => {
      if (res.status == 200) {
        NotificationManager.success(res.message);
        window.location.reload();
      } else {
        NotificationManager.success(res.message);
      }
    });
  };

  return (
    <>
      <div className="d-flex align-items-baseline gap-2">
        {/* <i
                  className="fas fa-wallet"
                  style={{ color: "green", fontSize: "30px" }}
                /> */}
        <h1 className="mt-4 mb-3 fw-bold table-heading">Assets</h1>
      </div>
      <p className="fs-6 gSPqhc">
        Manage Crypto Assets: Your Gateway to Secure Digital Currency
        Transactions
      </p>
      <div className="" style={{ marginTop: "10px" }}>
        <div className="sub-tab table-responsive ">
          <table
            id="example"
            className="table table-hover"
            style={{ width: "100%" }}
          >
            <thead className="table-head">
              <tr>
                {tableHeadings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="e2grw2-5">
                    <img src={item.logo} height="20" width="20" />
                    &nbsp;
                    {item.name}
                  </td>
                  <td className="e2grw2-5">{item.symbol}</td>
                  {/* <td className="e2grw2-5">{item.slug}</td> */}
                  <td className="e2grw2-5">{item.name}</td>
                  <td className="e2grw2-5">{item.token_address}</td>
                  <td className="e2grw2-5">
                    {item.status ? (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          updateUserAssets(item, "minus");
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          updateUserAssets(item, "add");
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={assetsData.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </nav>
      </div>
    </>
  );
};

Tabel1.propTypes = {
  heading: PropTypes.string.isRequired,
  assetsData: PropTypes.array.isRequired,
  tableHeadings: PropTypes.array.isRequired,
};

export default Tabel1;
