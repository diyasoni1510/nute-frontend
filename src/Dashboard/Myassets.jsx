import React, { useEffect, useState } from "react";
import Menuitem from "../components/Menuitem";
import Header from "./Header";
import { getAssetsUser, updateAssetsUser } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

const Myassets = () => {
  const [assetsData, setAssets] = useState([]);
  const {token} = useSelector((state)=>state.AuthReducer);
  useEffect(()=>{
    getAssetsUser(token)
    .then((res)=>{
      if(res.status==200){
        setAssets(res.asset_data);
      }
    })
  }, [])

  const updateUserAssets = (data, action) =>{
    updateAssetsUser(data, action, token)
    .then((res)=>{
      if(res.status==200) {
        NotificationManager.success(res.message);
        window.location.reload();
      } else {
        NotificationManager.success(res.message);
      }
    });
  };
  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />
        <div className="container-fluid subdashbordmain ">
          <div className="pagewrapper">
            <div className="">
              <h1 className="mt-4 mb-3 fw-bold table-heading">My Assets</h1>
              <p className="gSPqhc">
                Explore Your Crypto Portfolio: Manage, Track, and Secure Your
                Assets
              </p>
            </div>
            <div className="" style={{ marginTop: "10px" }}>
              <div className="sub-tab table-responsive">
                <table
                  id="example"
                  className="table table-hover"
                  style={{ width: "100%" }}
                >
                  <thead className="table-head">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Symbol</th>
                      <th scope="col">Chain Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {assetsData.length>0 ?assetsData.map((item, index) => (
                <tr key={index}>
                  <td className='e2grw2-5' >
                    <img src={item.logo} height="20" width="20" />&nbsp;
                    {item.name}
                  </td>
                  <td className='e2grw2-5' >{item.symbol}</td>
                  <td className='e2grw2-5' >{item.name}</td>
                  <td className='e2grw2-5' >{item.token_address}</td>
                  <td className='e2grw2-5'><button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        updateUserAssets(item, "minus");
                      }}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    
                  </td>
                </tr>
              )):
                    <tr>
                      <td className="text-center" colSpan={5}>
                        <div>
                          <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                          <p className="text-center text-secondary fw-bold">
                            No Record Found...
                          </p>
                        </div>
                      </td>
                    </tr>
}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myassets;
