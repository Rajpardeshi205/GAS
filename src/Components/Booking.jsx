import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase";
import Styled from "./Booking.module.css";
import { FaUser } from "react-icons/fa";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Booking = ({ user, setUser }) => {
  const [logoutError, setLogoutError] = useState(null);
  const [booking, setBooking] = useState({
    name: "",
    address: "",
    mobile: "",
    lpgId: "", // Add LPG ID to booking state
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [activeSection, setActiveSection] = useState("booking");
  const [bookingHistory, setBookingHistory] = useState([]);
  const [bookingLimitReached, setBookingLimitReached] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setLogoutError(null);
      navigate("/GAS/");
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(bookingQuery);
      const bookingCount = querySnapshot.size;

      if (bookingCount >= 12) {
        setBookingLimitReached(true);
        return;
      }

      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, {
        ...booking,
        userId: user.uid,
        status: "Pending",
        timestamp: new Date(),
      });
      setBookingSuccess("Booking request submitted successfully!");
      setBookingStatus("Pending");
      setBookingLimitReached(false);
      setBooking({
        name: "",
        address: "",
        mobile: "",
        lpgId: "", // Reset LPG ID after submission
      });

      navigate("/payment");
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  const fetchBookingHistory = async () => {
    if (user) {
      try {
        const bookingQuery = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(bookingQuery);
        const history = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookingHistory(history);
      } catch (error) {
        console.error("Error fetching booking history: ", error);
      }
    }
  };

  useEffect(() => {
    if (activeSection === "history") {
      fetchBookingHistory();
    }
  }, [activeSection]);

  return (
    <div className={Styled.booking}>
      {user && (
        <header className={Styled.nav}>
          <ul>
            <li className={Styled.img_img}>
              <img src="./Images/logo.png" alt="Logo" />
            </li>
            <li>
              <p onClick={() => setActiveSection("booking")}>Gas Booking</p>
            </li>
            <li>
              <p onClick={() => setActiveSection("history")}>Booking History</p>
            </li>
            <li>
              <div>
                <FaUser className={Styled.icon} />
              </div>
              <h5>{user.displayName || user.email}</h5>
              <ul className={Styled.logout}>
                <li>
                  <button onClick={handleLogout} className={Styled.logout_btn}>
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </header>
      )}
      <section className={Styled.mainSection}>
        {activeSection === "booking" && (
          <div className={Styled.bookingForm}>
            <h2>Book Gas Cylinder</h2>
            {bookingLimitReached && (
              <p className={Styled.error}>
                You have reached the booking limit of 12.
              </p>
            )}
            {!bookingLimitReached && (
              <form onSubmit={handleBookingSubmit}>
                <div className={Styled.input_box}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={booking.name}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className={Styled.input_box}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={booking.address}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className={Styled.input_box}>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={booking.mobile}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className={Styled.input_box}>
                  <input
                    type="text"
                    name="lpgId"
                    placeholder="LPG ID" // Add placeholder for LPG ID
                    value={booking.lpgId}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <button type="submit">Book Now</button>
                {bookingSuccess && (
                  <p className={Styled.success}>{bookingSuccess}</p>
                )}
              </form>
            )}
            {bookingStatus && (
              <p
                className={`${Styled.status} ${
                  bookingStatus === "Approved"
                    ? Styled.approved
                    : bookingStatus === "Rejected"
                    ? Styled.rejected
                    : Styled.pending
                }`}
              >
                Status: {bookingStatus}
              </p>
            )}
          </div>
        )}

        {activeSection === "history" && (
          <div className={Styled.history}>
            <h2>Your Booking History</h2>
            {bookingHistory.length > 0 ? (
              <ul className={Styled.history_li}>
                {bookingHistory.map((booking) => (
                  <li key={booking.id}>
                    <p>Name: {booking.name}</p>
                    <p>Address: {booking.address}</p>
                    <p>Mobile: {booking.mobile}</p>
                    <p>LPG ID: {booking.lpgId}</p> {/* Display LPG ID */}
                    <p>Status: {booking.status}</p>
                    <p>
                      Date:{" "}
                      {new Date(
                        booking.timestamp.seconds * 1000
                      ).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
      </section>
      {logoutError && <p className={Styled.error}>{logoutError}</p>}
    </div>
  );
};

export default Booking;
