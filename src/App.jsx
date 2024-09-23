import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/firebase";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Booking from "./Components/Booking";
import AdminBookings from "./Components/AdminBookings";
import Payment from "./Components/Payment";
import Help from "./Components/Help";
import "./App.css";
import About from "./Components/About";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const adminUID = "DN7jjXFR80aA204YRzQizgwcQPn2";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        try {
          const idTokenResult = await user.getIdTokenResult(true);
          const isAdminUser =
            idTokenResult.claims.admin || user.uid === adminUID;
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error("Error getting user claims:", error);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/GAS/" />} />
        <Route
          path="/GAS/"
          element={
            user ? (
              isAdmin ? (
                <Navigate to="/admin-bookings" />
              ) : (
                <Booking user={user} />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/GAS/Register" element={<Register />} />
        <Route
          path="/admin-bookings"
          element={isAdmin ? <AdminBookings /> : <Navigate to="/GAS/" />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/help" element={<Help />} />
        <Route path="/page_about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
