import React from 'react'

const Headern = () => {
  return (
    <div> <div className=" header">
    <div className="container-fluid">
    <div className=" d-flex justify-content-md-end align-items-center gap-2 headericon">
          <button className="btn  me-md-2  headerbtntxt" type="button">
            Developers
          </button>
          <button className="btn  headerbtntxt" type="button">
            Switch To Test
          </button>
          <div className="icon-mob">
            <i className="fa-solid fa-gear text-light fs-5"></i>
            <i className="fa-solid fa-bell text-light fs-5"></i>
          </div>
          <div className="btn-group">
            <i
              className="usernam dropdown-toggle"
              type="button"
              id="dropdownMenuClickableInside"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              
            >
              {" "}
              U
            </i>
            <div className="usernamdiv">
            <div className="">
                      <p className="fw-bold m-0" style={{ color: "#464646", fontSize: "15px" }}>Business Name</p>
                      <p
                        className="m-0"
                        style={{ color: "#464646", fontSize: "12px" }}
                      >
                        User@example.com
                      </p>
                    </div>
            </div>
            <ul
              className="dropdown-menu headerusericon"
              aria-labelledby="dropdownMenuClickableInside"
            >
              <li>
                <div className="dropdown-item">
                  <p className="fs-6" style={{ color: "#8d8b8b" }}>
                    Account
                  </p>
                  <div className="d-flex justify-content-start gap-4 align-center">
                    <div className="username-icon">
                      U {/*   set username first alphabet */}
                    </div>
                    <div className="">
                      <p className="fw-bold m-0">Business Name</p>
                      <p
                        className="m-0"
                        style={{ color: "#8d8b8b", fontSize: "14px" }}
                      >
                        User@example.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="dropdown-item d-grid gap-2">
                  <button className="btn btn-outline-success" type="button">
                    Manage your account
                  </button>
                </div>
              </li>
              <li>
                {" "}
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex gap-3"
                  href="#"
                  style={{ color: "#5f6064" }}
                >
                  <div className="">
                    {" "}
                    <i className="fa-solid fa-file"></i>
                  </div>{" "}
                  <div className="">Invoice</div>
                </a>
              </li>
              <li
                // onClick={() => {
                //   logout();
                //   navigate("../login", { replace: true });
                // }}
              >
                <a
                  className="dropdown-item d-flex gap-3"
                  style={{ color: "#5f6064" }}
                >
                  <div className="">
                    {" "}
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>{" "}
                  <div className="">LogOut</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div></div>
  )
}

export default Headern