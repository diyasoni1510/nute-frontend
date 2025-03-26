import React from 'react'

const Sidebanner = (props) => {

  return (
    <>
       <div className="side-banner">
        <div className="stk">
          <img
           src="images/stroke.png"
            className="change-my-color"
            alt=""
            style={{ width: "100%" }}
          />
        </div>
        <div className="container mt-5 ">
          <h2 className="fw-bold fs-1 singuptxt mb-5 ">{ props.text}</h2>
         <div className=" mt-5 mb-5">
         <div className="row">
            <div className="col-lg-6 col-sm-6 ">
              <div className="text-center">
                <h4 className="text-dark fw-bold fontSize">200+</h4>
                <p className="">Countries Converted</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 ">
              
              <div className="text-center">
                <h4 className="text-dark fw-bold fontSize">29Million</h4>
                <p className="">Global Investor</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 ">
              
              <div className="text-center">
                <h4 className="text-dark fw-bold fontSize">700+</h4>
                <p className="">Coins</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 ">
              
              <div className="text-center">
                <h4 className="text-dark fw-bold fontSize">$1.79Billons</h4>
                <p className="">24h Trading Volume</p>
              </div>
            </div>
          </div>
         </div>

          <div className="nutemobil_imgto">
            <img src="images/asset-4.png" alt="" style={{ width: "100%" }}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebanner
