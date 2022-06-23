import React, { useState, useEffect } from "react";
import Sidebars from "../component/Sidebars";
import "../style/users.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { getService } from '../services/Services';

const Booking = () => {
  const [users, setUsers] = useState([])
  const [booking, setBooking] = useState([])
  const [final,setFinal]=useState([])

  const getUsersAndBookingData=()=>{
    let array=[]
  booking.map((item)=>{
    users.map((user)=>{

      if(item.BookedBy == user.id){
           item.BookedBy =user.firstname
           item.id=user.id
           item.number=user.number
     array.push( item)

      } else if(item.RecievedBy == user.id){
        item.RecievedBy = user.firstname
        item.id=user.id
        item.number=user.number
        array.push(item)
      }

    })
    
  })
  setFinal(array);

  }

  let list1 = []
  const getAllUsers1 = async () => {

    const querySnapshot = await getService("users")

    querySnapshot.forEach((doc) => {

      list1.push({
        id: doc.id,

        ...doc.data()
      })
    });
    setUsers(list1) 

  };

  useEffect(() => {
    
    if(users && booking){
      getUsersAndBookingData()
    }
  }, [ users,booking])


  useEffect(() => { 
    getAllUsers1()
    getAllBooking()
   
  }, [])

  
let allList=[]
  let list = []
  const getAllBooking = async () => {

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
    setBooking(allList)
   
    
  };

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
           
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
               Image
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
               BookedBy
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h6" component="div" gutterBottom>
              RecievedBy             </Typography>
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
              Contact
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ marginLeft:"120px" }}
              >
                View
              </Typography>
            </Grid>
          </Grid>
          {final&& final?.map((item,index) => {
            return (
              <div>
                <Divider className="food_detail" />
                <Grid container spacing={2} key={index}>
                  
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
                      {item && item.BookedBy}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.RecievedBy}
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
                 
                  {/* <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.date}
                    </Typography>
                  </Grid> */}
                  <Grid item xs={1.5}>
                    <Typography variant="body1" component="div" gutterBottom>
                      {item && item.number}
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
                      <Typography align="center" >
                        <Button variant="outlined" size="small" >
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
