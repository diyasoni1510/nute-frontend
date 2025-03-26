import React from "react";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <>
      <div className="product">
        <div className="">
          <h5 className="card-title cardheading"><img src={props.image} alt="" />{props.heading}</h5>
          <p className="tiny-light-p">{props.text}</p>
        </div>
        <div className="card-footer">
          <div className="d-grid gap-2 d-md-flex justify-content-between   align-items-center">
            <Link to={props.link}>
            <button type="button" class={` 'btn-sm' ${props.btnclass}`}>
             {props.button_txt}
            </button>
            </Link>
            
            <a
              href="#"
              className="card-link text-success"
              style={{ textDecoration: "none" }}
            >
              view Docs
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
