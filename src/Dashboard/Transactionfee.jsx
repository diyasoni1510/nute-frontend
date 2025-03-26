import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menuitem from '../components/Menuitem';

const Transactionfee = () => {
    const [start_date, setStartDate] = useState();
    const [end_date, setEndDate] = useState();
    const [type, setType] = useState();
    const [address, setAddress] = useState();
    const [symbol, setSymbol] = useState();
    const tableHeadings = ["Address", "Amount",  "Amount in $", "Order Id", "Type", "Date & Time"];
    const fetchData = () => {
        let data = {
          
          start_date,
          end_date,
          type,
          address,
          symbol
        }
        
      };
  return (
    <div>
         <Header />
      <div className="d-flex">
        <Menuitem />
        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <div className="">
              <h1 className="mt-4 mb-3 fw-bold table-heading">Transaction Fee</h1>
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
                    
                  {/* <tr >
                          <td className="e2grw2-5"></td>
                          <td className="e2grw2-5">
                           </td>
                           <td className="e2grw2-5">
                           </td>
                           <td className="e2grw2-5">
                           </td>
                           <td className="e2grw2-5">
                           </td>
                          
                        </tr> */}
                    
                    
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
                
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {/* {history.length>0?
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
                
                
              </ul>:null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactionfee