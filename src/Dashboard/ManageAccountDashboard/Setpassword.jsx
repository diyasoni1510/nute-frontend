import React,{useState} from 'react'
import { NotificationManager } from 'react-notifications';
import { setNewPassword } from '../../pages/utils/api_functions';
import { useSelector } from 'react-redux';

const Setpassword = () => {
  const {token} = useSelector((state)=>state.AuthReducer)
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
    const [showPassword ,setShowPassword]=useState(false);
    const handleTogglePassword =()=>{
        setShowPassword(!showPassword);
      }

const updatePassword = () =>{
  setNewPassword(token, password, confirm_password)
  .then((res)=>{
    if(res.status == 200) {
      NotificationManager.success(res.message);
    }
  })
} 
  return (
    <>
     
<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Set Password
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered ">
    <div className="modal-content">
      <div className="modal-header" style={{background:"#e6e9ee"}}>
        <h5 className="modal-title" id="staticBackdropLabel">Set Password</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="">
        <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                    New Password
                      </label>
                     <div className="passwordinput">
                     <input
                        className="form-control"
                        type={showPassword? 'text' :'password'}
                        id="password"
                        onChange={(e)=>{
                          setPassword(e.target.value);
                        }}
                        required
                        placeholder="***********"
                      />
                     <i class={`eyeicon ${showPassword ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'}`} onClick={handleTogglePassword} ></i>
                     </div>
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                   Confirm Password
                      </label>
                     <div className="passwordinput">
                     <input
                        className="form-control"
                        type={showPassword? 'text' :'password'}
                        id="password"
                        onChange={(e)=>{
                          setConfirmPassword(e.target.value);
                        }}
                        required
                        placeholder="***********"
                      />
                     <i class={`eyeicon ${showPassword ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'}`} onClick={handleTogglePassword} ></i>
                     </div>
                    </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal"
        onClick={()=>{
          updatePassword();
        }}
        >Confirm</button>
      </div>
    </div>
  </div>
</div>  
    </>
  )
}

export default Setpassword