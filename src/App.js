import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import PrivacyPolicy from "./view/PrivacyPolicy";
import UserDetails from './view/UserDetails';
import Users from './view/Users'
import TermsAndConditions from './view/TermsAndConditions';
import Login from "./Pages/Login/Login";
import Booking from "./view/Booking";
import BookingDetails from "./view/BookingDeatils";
import Announcement from "./view/Announcement";
import AnnouncementDetails from "./view/AnnouncementDetails";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/announcement/:id" element={<AnnouncementDetails/>} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    

        </Route>
      </Routes>
    </div>
  );
}

export default App;
