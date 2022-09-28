import React from "react";
import cardLogo from "../assets/card-logo.svg";

export default function CreditCard({ Name, Number, Month, Year, CVC }) {
  return (
    <div className="card-holder">
      <div className="card-one">
        <img src={cardLogo} alt="dummy card logo" className="cardlogo" />
        <div className="text-container-card">
          <span className="holder-name">{Number || "0000 0000 0000 0000"}</span>
          <div className="name-date-container">
            <span className="name-date">{Name || "Jane Appleseed"}</span>
            <span className="name-date">
              {Month || "00"}/{Year || "00"}
            </span>
          </div>
        </div>
      </div>
      <div className="card-two">
        <span className="cvc">{CVC || "123"}</span>
      </div>
    </div>
  );
}
