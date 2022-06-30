import React from "react";
import { Routes, Route } from "react-router-dom";
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
import AddCategory from "./view/AddCategory/addCategory";
import CategoryDetails from "./view/AddCategory/CatergoryDetails";
import Notification from "./view/Notifications/Notification";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/announcement/:id" element={<AnnouncementDetails />} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/catergory" element={<AddCategory />} />
          <Route path="/CategoryDetails/:id" element={<CategoryDetails />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
