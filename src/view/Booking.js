import React, { useState, useEffect } from "react";
import Sidebars from "../component/Sidebars";
import "../style/users.scss";
import { userContent } from "../component/UserData";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

import { getService } from '../services/Services';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase/firebase";

const Booking = () => { 
  // const params = useParams();
  // const { id } = params;
  const [users, setUsers] = useState([])
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   // declare the data fetching function
  //   if (id) {
  //     const handelFetch = async () => {
  //       // setLoading(true)
  //       const docRef = doc(db, "users", id);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log("Document data:", docSnap.data());
  //         setData(docSnap.data())
  //         // setLoading(false)

  //       } else {
  //         console.log("No such document!");
  //         // setLoading(false)
  //       }

  //     };
  //     // call the function
  //     handelFetch()
  //       // make sure to catch any error
  //       .catch(console.error);
  //   }
  // }, [id])
  
let allList=[]
  let list = []
  const getAllUsers = async () => {

    const querySnapshot = await getService("Bookings")

    querySnapshot.forEach((doc) => {

      list.push({
        id: doc.id,

        ...doc.data()
      })
    });
    list.map((item) => {
      item?.Bookings.map((subitems) => {
       
          allList.push(subitems)
       
       
      })
     
      
    })
    setUsers(allList)
    
  };

  useEffect(() => {
    // if(!openPopup){
    getAllUsers()
    // }
  }, [])

  

  return (
    <div className="users_div">
      <Sidebars />
      <div className="users_data">
        <div className="order_head">
          <Typography variant="h6" component="div" gutterBottom>
            {" "}
      BOOKING          </Typography>
        </div>
        <Divider sx={{ background: "#E63369" }} />

        <div style={{ padding: "25px" }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={2}>
              <Typography variant="h6" component="div" gutterBottom>
                User ID
              </Typography>
            </Grid> */}
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
               Image
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
               Name
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
Service              </Typography>
            </Grid>
      
            <Grid item xs={1.5}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ textAlign: "center" }}
              >
               Status
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ textAlign: "center" }}
              >
            Type
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ textAlign: "center" }}
              >
              Date
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                View
              </Typography>
            </Grid>
          </Grid>
          {users&& users?.map((item,index) => {
            return (
              <div>
                <Divider className="food_detail" />
                <Grid container spacing={2} key={index}>
                  {/* <Grid item xs={2}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item.userId}
                    </Typography>
                  </Grid> */}
                  <Grid item xs={1.5}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={item && item.photo}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                    </span>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.service}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography
                      variant="body1"
                      component="div"
                      gutterBottom
                      style={{ textAlign: "center" }}
                    >
                      {item && item.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Link
                      to={`/users/${item.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography align="center">
                        <Button variant="outlined" size="small">
                          View Detail
                        </Button>
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Booking;
