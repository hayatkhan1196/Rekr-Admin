import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import PrivacyPolicy from "./view/Privacy/PrivacyPolicy";
import UserDetails from './view/Users/UserDetails';
import Users from './view/Users/Users'
import TermsAndConditions from './view/TermAndCondition/TermsAndConditions';
import Login from "./Pages/Login/Login";
import Booking from "./view/Booking/Booking";
import AnnouncementDetails from "./view/Announcement/AnnouncementDetails";
import Announcement from './view/Announcement/Announcement';
import BookingDetails from './view/Booking/BookingDeatils';
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
