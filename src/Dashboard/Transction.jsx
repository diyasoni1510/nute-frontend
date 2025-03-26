import React, { useEffect, useState } from 'react';
import Menuitem from '../components/Menuitem';
import Header from './Header';
import { getAssetsUser, getHistory } from '../pages/utils/api_functions';
import { useSelector } from 'react-redux';
import { round } from '../pages/utils/math';

const Transction = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const [history, setHistory] = useState([]);
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();
  const [type, setType] = useState();
  const [address, setAddress] = useState();
  const [symbol, setSymbol] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Set the number of items per page
  const [totalPages, setTotalPages] = useState(0);
  const [user_assest, setUserAssest] = useState();
  const tableHeadings = ["Address", "Amount",  "Amount in $", "Order Id", "Type", "Date & Time"];

  useEffect(() => {
    fetchData();
  }, [token, currentPage]);

  const fetchData = () => {
    let data = {
      page:currentPage,
      per_page:itemsPerPage,
      start_date,
      end_date,
      type,
      address,
      symbol
    }
    getHistory(data, token).then((res) => {
      if (res.status === 200) {
        setHistory(res.data);
        setTotalPages(res.total/itemsPerPage);
      }
    });
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <div className="">
              <h1 className="mt-4 mb-3 fw-bold table-heading">Transactions</h1>
              <p className="gSPqhc">
                Effortlessly Handle Secure Crypto Exchanges and Financial Operations.
              </p>
            </div>
            <div className="row cstm_form">
                  <div className="col-lg-2  col-sm-6 mb-2">
                    <input
                      type="Date"
                      className="form-control"
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2  col-sm-6 mb-2">
                    <input
                      type="Date"
                      className="form-control"
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2  col-sm-6 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Address'
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2  col-sm-6 mb-2">
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Symbol'
                      onChange={(e) => {
                        setSymbol(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2  col-sm-6 mb-2">
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option selected disabled>Type</option>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                    </select>
                  </div>
                 
                  <div className="col-lg-2  col-sm-6 mb-2">
                    <button className="btn btn-outline-success"
                    onClick={()=>{
                      fetchData();
                    }}
                    >
                      Search
                    </button>
                  </div>
                </div>
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
                    {history.length > 0 ? (
                      history.map((item, index) => (
                        <tr key={index}>
                          <td className="e2grw2-5">{item.address}</td>
                          <td className="e2grw2-5">
                            <img src={item.logo} height="20" width="20" />&nbsp;
                            {round(item?.amount)}</td>
                          <td className="e2grw2-5">{round(item?.doller_amount)}</td>
                          <td className="e2grw2-5">
                            {item.order_id.slice(0, 2)}...
                            {item.order_id.slice(-4)}
                          </td>
                          <td className="e2grw2-5">
                            {item.type}
                          </td>
                          <td className="e2grw2-5">
                            {new Date(item.updatedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={7}>
                          <div>
                            <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                            <p className="text-center text-secondary fw-bold">
                              No Record Found...
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {history.length>0?
              <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={handlePrev} disabled={currentPage === 1} className='page-link'>
              &laquo;
                </button>
             </li>
             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button onClick={handleNext} disabled={history.length < itemsPerPage} className="page-link">
                &raquo;
                        </button>
              </li>
                
                
              </ul>:null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transction;
