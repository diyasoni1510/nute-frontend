import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header";
import Menuitem from "../components/Menuitem";
import { useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
const url = "http://localhost:5009/api";

const IpWhitelist = () => {
  const [ips, setIps] = useState([]);
  const [newIp, setNewIp] = useState("");
  const { profile } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    const user_id = profile._id;
    const getUserIp = async () => {
      try {
        await fetch(`${url}/whitelist/${user_id}`)
          .then((res) => res.json())
          .then((data) => setIps(data.ips));
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserIp();
  }, [profile]);
  // 2401:4900:8849:8d67:f1f1:8ad0:9460:2497
  const addIp = async () => {
    if (!newIp) {
      return NotificationManager.error("Enter a valid IP address");
    }

    try {
      const user_id = profile._id;

      const res = await fetch(`${url}/whitelist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, ip: newIp }),
      });

      const data = await res.json();

      if (res.ok) {
        setIps((prevIps) => [...prevIps, newIp]);
        setNewIp("");
        NotificationManager.success(data.message);
      } else {
        NotificationManager.error(data.message);
      }
    } catch (error) {
      console.error("Error adding IP:", error);
      NotificationManager.error("Failed to add IP. Please try again.");
    }
  };

  const removeIp = async (ip) => {
    const user_id = profile._id;
    const res = await fetch(`${url}/remove-whitelist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, ip }),
    });
    if (res.ok) {
      setIps(ips.filter((i) => i !== ip));
      NotificationManager.success("IP removed successfully");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className="container-fluid subdashbordmain">
          <div className="pagewrapper">
            <div className={`form-section active`}>
              <h1 className="mt-4 mb-3 fw-bold table-heading">
                Add ip address{" "}
              </h1>
              <hr className="" />
              <form className="mt-3">
                <div className="sib-div">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Enter your ip address <em className="text-danger">*</em>
                    </label>
                    <input
                      type="text"
                      id="domain"
                      name="domain"
                      value={newIp}
                      onChange={(e) => setNewIp(e.target.value)}
                      placeholder="abc.def.xyz/00"
                      required
                      className="form-control"
                    />
                    <div
                      id="emailHelp"
                      className="form-text"
                      style={{ fontSize: "14px" }}
                    >
                      Example: xxx.xxx.xxx.xxx <br />
                      {/* Do not add “http”, “https”, “www”, or “\”. */}
                    </div>
                  </div>

                  <div className=" d-grid gap-2 col-6">
                    <button
                      type="button"
                      className="btn btn-dark rounded-pill"
                      onClick={addIp}
                    >
                      Add this ip
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              {/* <h2 className="text-xl font-bold mt-5">Added IP</h2> */}
              <h1 className="mt-4 mt-md-5 mb-3 fw-bold table-heading">
                Added IP{" "}
              </h1>
              <ul className="mt-4 ps-0 ps-md-auto">
                {ips.length > 0 ? (
                  ips.map((ip) => (
                    <li
                      key={ip}
                      className="pb-4 d-flex flex-column flex-md-row justify-content-between p-2 border-bottom"
                    >
                      <div className="d-flex gap-3 align-items-center">
                        <i className="fa-solid fa-globe text-success"></i>
                        <span className="text-break">{ip}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIp(ip)}
                        className="ms-4 ms-md-0 btn btn-outline-dark text-xs rounded-pill mt-3 mt-md-0"
                        style={{ width: "110px" }}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="d-flex justify-content-between p-2 border-bottom text-black-50">
                    No ip address
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IpWhitelist;
