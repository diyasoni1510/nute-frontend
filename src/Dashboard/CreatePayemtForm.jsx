import React from 'react'

const CreatePayemtForm = () => {
  return (
    <>

<button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
 Add Wallet
</button>


<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header" style={{background:"#e6e9ee"}}>
        <h5 className="modal-title fw-bold" id="staticBackdropLabel">Add Wallet</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
      
        <button type="button" className="btn btn-success">submit</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default CreatePayemtForm