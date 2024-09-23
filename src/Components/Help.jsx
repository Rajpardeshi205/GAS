import React from "react";
import Navigation from "./Navigation";
import Styled from "./Help.module.css";

const Help = () => {
  return (
    <div className={Styled.help_bg}>
      <Navigation />
      <section className={Styled.help_section}>
        <h2> Gas Online Booking Procedure</h2>
        <ul>
          <p>1. In Consumer Login, Enter your user name /Email Id</p>
          <p>2. You can also Register in Consumer Registration</p>
          <p>3. Fill Distributor Details-</p>
          <p> - State/District/Distributor/Consumer No OR 17 Digit LPG Id</p>
          <p> - User Name /Email Id</p>
          <p> - Contact No -Landline/Mobile</p>
          <p> - Click on Accepted terms & Conditions</p>
          <p> - Submit</p>
          <p>
            {" "}
            - The order will be sent to the concerned distributor and you will
            able to pay to the distributor directly on delivery OR You can Pay
            Online.
          </p>
          <p> - You will be able to track the status of your booking online.</p>
        </ul>
      </section>
    </div>
  );
};

export default Help;
