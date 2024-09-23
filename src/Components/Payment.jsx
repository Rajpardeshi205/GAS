import React from "react";
import Styled from "./Payment.module.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className={Styled.payment}>
      <h2>Payment Page</h2>
      <p>Thank you for your booking. Please proceed with the payment.</p>
      <button onClick={handleBack} className={Styled.backButton}>
        Back to Booking
      </button>
    </div>
  );
};

export default Payment;
