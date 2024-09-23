import React from "react";
import Styled from "./About.module.css";
import Navigation from "./Navigation";

const About = () => {
  return (
    <div className={Styled.About_bg}>
      <Navigation />
      <section className={Styled.aboutContainer}>
        <h1>About Us</h1>
        <p>
          Welcome to our Online Gas Booking System! We are dedicated to
          providing a seamless and convenient experience for our customers to
          book gas cylinders from the comfort of their homes.
        </p>
        <p>
          Our platform allows users to easily request gas cylinders, view their
          booking history, and manage their orders with just a few clicks. With
          a user-friendly interface and secure payment options, we strive to
          ensure that our customers receive their gas cylinders promptly and
          safely.
        </p>
        <p>
          Our mission is to simplify the gas booking process and make it
          accessible to everyone. We value customer satisfaction and are
          committed to delivering high-quality service.
        </p>
        <p>
          Thank you for choosing us for your gas booking needs. We look forward
          to serving you!
        </p>
      </section>
    </div>
  );
};

export default About;
