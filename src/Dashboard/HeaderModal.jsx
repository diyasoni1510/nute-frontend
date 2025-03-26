import React from 'react'

const HeaderModal = () => {
  return (
    <div>
       <button type="button" className="btn m-0" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{border:"none"}}>
 <img src="images/grid.png" alt="gridicon" style={{width:"25px"}} />
</button>


<div className="collapse headercollaps" id="collapseExample" >
  
  
    
    
        <div className="d-flex collaps-card">
          <div className="headermn1 p-3">
            <div className="">
              <p className="fw-bold">Access</p>
              <p className="" style={{ color:"#747070"}}>Your active products here</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>collect Payment</p>
            </div>
          </div>
          <div className="headermn2" >
          <div className="" >
              <p className="fw-bold">Discover</p>
              <p className="" style={{ color:"#747070"}}>Cashfree's Payment's suit of product</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>collect Payment</p>
             <div className="mr-5" style={{marginLeft:"20px"}}>
             <p className="m-0">Payment Gateway</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Get paid online efforlessly through website integration website integration,custom links or forms-120+ payment model supported.</p>
              <p className="m-0">Auto Collect</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Accept payment and match them automatically with customer using virtual account</p>
              <p className="m-0">Subscription</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>collect repeat payments easily with the most advanced recurring payment solution.</p>
              <p className="m-0">SoftPOS</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Accept payments via OR codes ,payments links or Tap & amp Pay from your mobile phone </p>
              <p className="m-0">Cross Border Payment</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Send and receive money from international beneficiaries efforlessly </p>
             </div>

             <p className="" style={{fontSize:"12px", color:"#747070"}}>MAKE PAYOUT</p>
             <div className="mr-5" style={{marginLeft:"20px"}}>
             <p className="m-0">Payout</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Pay vender do instant refund disburse loan and more 24x7 even on a bank holiday via APIs or custom payout links</p>
              
             </div>

             <p className="" style={{fontSize:"12px", color:"#747070"}}>VERIFY IDENTITY</p>
             <div className="mr-5" style={{marginLeft:"20px"}}>
             <p className="m-0">Verification Suit</p>
              <p className="" style={{fontSize:"12px", color:"#747070"}}>Automatic customer KYC during onboarding with a wide range of idenetity verification tools like Bank Account ,UPI ID ,IFSC ,PAN,AADHAR and GSTIN</p>
              
             </div>


            </div>
          </div>
        </div>
      
     
  
</div>
    </div>






  )
}

export default HeaderModal
