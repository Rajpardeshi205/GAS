import React, { useEffect, useState } from "react";
import { db, auth } from "./Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { setAdminClaim } from "./firebaseFunctions";
import { useNavigate } from "react-router-dom";
import Styled from "./AdminBookings.module.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [logoutError, setLogoutError] = useState(null);
  const [activeSection, setActiveSection] = useState("pendingBookings");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("status", "==", "Pending")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookingsArray = [];
        querySnapshot.forEach((doc) => {
          bookingsArray.push({ id: doc.id, ...doc.data() });
        });
        setBookings(bookingsArray);
      });

      return () => unsubscribe();
    };

    const fetchUsers = async () => {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersArray = [];
        querySnapshot.forEach((doc) => {
          usersArray.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersArray);
      });

      return () => unsubscribe();
    };

    fetchBookings();
    fetchUsers();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status });
    } catch (error) {
      console.error("Error updating booking status: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLogoutError(null);
      navigate("/GAS/");
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  const renderUsers = () => (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </li>
      ))}
    </ul>
  );

  const renderPendingRequests = () => (
    <ul className={Styled.list}>
      {bookings.map((booking) => (
        <li key={booking.id}>
          <p>Name: {booking.name}</p>
          <p>Address: {booking.address}</p>
          <p>Mobile: {booking.mobile}</p>
          <p>LPG ID: {booking.lpgId}</p> {/* Display LPG ID */}
          <button onClick={() => handleApproval(booking.id, "Approved")}>
            Approve
          </button>
          <button onClick={() => handleApproval(booking.id, "Rejected")}>
            Reject
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <section className={Styled.admin_booking}>
      <div className={Styled.dashboard}>
        <nav>
          <ul className={Styled.nav}>
            <li onClick={() => setActiveSection("pendingBookings")}>
              <a href="#pending-bookings">Pending Bookings</a>
            </li>
            <li onClick={() => setActiveSection("allUsers")}>
              <a href="#all-users">All Users</a>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>
        <div className={Styled.ad}>
          <h2>Admin Dashboard</h2>
        </div>
        {activeSection === "pendingBookings" && (
          <>
            <h2>Pending Bookings</h2>
            {renderPendingRequests()}
          </>
        )}
        {activeSection === "allUsers" && (
          <>
            <h2>All Users</h2>
            {renderUsers()}
          </>
        )}
      </div>
    </section>
  );
};

export default AdminBookings;
