import React from "react";
import completeImage from "../assets/icon-complete.svg";

export default function Complete({ onComplete }) {
  return (
    <div class="completePage">
      <img src={completeImage} alt="Card Send Completed" />
      <h2>THANK YOU!</h2>
      <h4>We've added your card details</h4>
      <button onClick={onComplete}>Confirm</button>
    </div>
  );
}
