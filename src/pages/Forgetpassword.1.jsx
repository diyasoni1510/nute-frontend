import React, { useState } from "react";

export const Forgetpassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const [showPassword2, setShowPassword2] = useState(false);
    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    return (
        <>
            <div className="Login-wrapper">
                <div className="left-container">
                    <div className="">
                        <div className=" p-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-1">
                                <div className="">
                                    {" "}
                                    <img
                                        src="images/fav.png"
                                        alt=""
                                        className=""
                                        style={{ width: "50px" }} />
                                </div>
                                <div className="lh-1">
                                    <div className="fw-bolder  fs-5">Nute</div>
                                    <div className="fw-bolder  fs-5">Payment</div>
                                </div>
                            </div>
                        </div>

                        {/* .....................this code is for reset password ........................ */}
                        end reset password..............
                    </div>
                </div>

            </div>
        </>
    );
};
