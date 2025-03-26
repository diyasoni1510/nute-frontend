import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header";
import Menuitem from "../components/Menuitem";
import { useSelector } from "react-redux";
import { getUserAccess, payAmount } from "./utils/api_functions";
import { useLocation, useNavigate } from "react-router-dom";

const AddFunds = () => {
  const authInfo = useSelector((state) => state.AuthReducer);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.status || false;

  useEffect(() => {
    console.log("status", status);
  }, []);

  const handlePayClick = async () => {
    const res = await payAmount(authInfo.token, authInfo.profile._id, amount);

    setAmount(""); // Reset amount to blank

    const userInfo = await getUserAccess(authInfo.token, authInfo.profile._id);

    console.log(userInfo)

    navigate(`/pay/${res.data.order_id}`, {
      state: {
        user_id: authInfo.profile._id,
        order_id: res.data.order_id,
        amount: amount,
        keys: userInfo?.data?.[0]?.api_keys,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <div className="mt-3 mb-5"></div>

            <div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-outline-success"
                  onClick={handlePayClick}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFunds;
