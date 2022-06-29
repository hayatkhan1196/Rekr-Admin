import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PrivacyTipRoundedIcon from "@mui/icons-material/PrivacyTipRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CampaignIcon from '@mui/icons-material/Campaign';
import "../../style/home.scss";
import CategoryIcon from '@mui/icons-material/Category';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const Menues = () => {
  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >

        <Link
          to="/users"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <GroupRoundedIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Users" style={{ color: "black" }} />
          </ListItemButton>
        </Link>
        <Link
          to="/booking"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <BookOnlineIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Booking" style={{ color: "black" }} />
          </ListItemButton>
        </Link>
        <Link
          to="/Announcement"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <CampaignIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Announcement" style={{ color: "black" }} />
          </ListItemButton>
        </Link>

        <Link
          to="/catergory"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <CategoryIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Add Catergory" style={{ color: "black" }} />
          </ListItemButton>
        </Link>

        <Link
          to="/privacy-policy"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <PrivacyTipRoundedIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" style={{ color: "black" }} />
          </ListItemButton>
        </Link>
        <Link
          to="/terms-and-conditions"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton className="menu_background">
            <ListItemIcon>
              <NoteAltIcon sx={{ color: "#0980B0" }} />
            </ListItemIcon>
            <ListItemText primary="Terms & Conditions" style={{ color: "black" }} />
          </ListItemButton>
        </Link>



      </List>
    </div>
  );
};

export default Menues;
