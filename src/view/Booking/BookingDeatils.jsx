import React, { useState, useEffect } from "react";
// import Sidebars from "../component/Sidebars";
import "../../style/userDetail.scss";
import { useParams, } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
// import SalesBoard from "../component/SalesBoard";
// import MultiTabs from "../component/multiTab/MultiTabs";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import MoveDownIcon from '@mui/icons-material/MoveDown';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { doc, getDoc } from "firebase/firestore";
// import { getService, updateService } from '../services/Services';
import { db } from "../../config/firebase/firebase";
import { deleteService, getService, updateService } from '../../services/Services';
import Sidebars from '../../component/SideBar/Sidebars';
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const _handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const _handleClose2 = () => setOpen2(false);
  const handleOpen2 = () => setOpen2(true);
  const _handleClose3 = () => setOpen3(false);
  const handleOpen3 = () => setOpen3(true);
  const [_open, setOpen] = useState(false);
  const [_open2, setOpen2] = useState(false);
  const [_open3, setOpen3] = useState(false);
  const [data, setData] = useState();
  const [fullName, setfullName] = useState();
  const [category,  SetCategory] = useState()
  const { id } = params;

  // const user = userContent.find((user) => user.userName === userName);
  // const { userEmail, userImage } = user;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #E63369",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #E63369",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };


  useEffect(() => {
   
    // declare the data fetching function
    if (id) {
      const handelFetch = async () => {
        // setLoading(true)
        const docRef = doc(db, "Bookings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          docSnap.data().Bookings.map((item)=>{
            setData(item)
            setfullName(item.name)
            SetCategory(item.type)
          })
         
        } else {
          console.log("No such document!");
        }
      };
      // call the function
      handelFetch()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [id])



  const deleteUser = async (docId,id,) => {
   
    const docRef = doc(db, "Bookings",id);
     const docSnap = await getDoc(docRef);
    let bookingData = docSnap.data()
    const updatedDate = bookingData.Bookings.filter((item) => item.docId !== docId)
  let objectDate = {
    Bookings: updatedDate

    }
    updateService("Bookings", id, objectDate)
   
  if (data) {
    try {
          let list = data
          let objectList = Object.values(list)
          list = objectList.filter((i) => i.docId !== docId);
          setData(list)
          navigate(-1)
        } catch (error) {
          console.log("error occur");
      }
  } else {
      console.log("No such document!");
      // setLoading(false)
  }
 
  
    // if (docSnap.exists()) {
    //   try{

    //     let list = docSnap.data()
    //    list = list.filter((i)=>i.id!== id);
    //     await updateService("Bookings",id,list)
          
    //       const result = data?.filter((i)=>i.id!== id)
    //       setData(result)
          
    //   }catch(error){
        
    //   alert("error occur")
    //   }
 

    // } else {
    //   console.log("No such document!");
    //   // setLoading(false)
    // }        





  //   if (docSnap.exists()) {
  //     try {

  //         let list = docSnap.data()
  //         console.log("🚀 ~ file: BookingDeatils.jsx ~ line 136 ~ deleteUser ~ list", list)
  //         list = list.filter((i) => i.docId !== id);
  //         console.log("=======================>", list)
  //         setData(list)

  //     } catch (error) {
  //         console.log("error occur");
  //     }
  // } else {
  //     console.log("No such document!");
  //     // setLoading(false)
  // }
};
 








  // const deleteUser = async () => {
  //   await deleteService("Bookings", id)
  //   navigate(-1)
  // }




  const updateUser = async () => {
    let data1 = {
      name: fullName,
      type: category
    }
    await updateService("Bookings", id, data1)
    _handleClose3()
  }

  return (
    <div className="userDetails_div">
      <Sidebars />

      <Button
        variant="contained"
        onClick={handleOpen3}
        style={{
          marginTop: '10px',
          color: "black",
          background: "#0980B0 ",
          borderRadius: "10px",
          marginRight: '10px'

        }}
      >
        Manage Details
      </Button>
      <Button
        variant="contained"
        // onClick={handleOpen3}
         onClick={(()=>{deleteUser(data.docId,id)})}
        style={{
          marginTop: '10px',
          color: "black",
          background: "#0980B0 ",
          borderRadius: "10px",
          marginRight: '10px'
        }}
      >
        Delete Account
      </Button>
      <Grid container spacing={{ xs: 1, sm: 1, md: 3, lg: 3 }}>
        <Grid
          item
          sm={12}
          md={3}
          sx={{ marginBottom: "20px", marginTop: "10px" }}
        >
          <Card
            sx={{
              borderRadius: "16px ",
              border: "1px solid #E63369",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={data && data.photo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {data && data.name}
                </Typography>
                {/* <Typography gutterBottom variant="body1" component="div">
                  {data && data.name}
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>

        </Grid>

        {/* <Grid
          item
          sm={12}
          md={9}
          sx={{ marginBottom: "20px", marginTop: "10px" }}
        >
          <SalesBoard />
        </Grid> */}
        <Grid item xs={12} sx={{ marginBottom: "20px", marginTop: "10px" }}>
         
        </Grid>
      </Grid>
     
      <Modal
        open={_open3}
        onClose={_handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>

          <div style={{ padding: "8px" }}>
            <p> RecievedBy</p>
            <TextField
              id="standard-multiline-static"
              value={fullName}
              variant="outlined"
              fullWidth
              onChange={(e) => setfullName(e.target.value)}

            />
          </div>
          <div style={{ padding: "8px" }}>
            <p> Type</p>

            <TextField
              id="standard-multiline-static"
              value={category}
              variant="outlined"
              fullWidth
              onChange={(e) => SetCategory(e.target.value)}

            />
          </div>
          <Button
            variant="contained"
            onClick={updateUser}
            startIcon={<UpgradeIcon />}
            style={{
              float: "right",
              margin: "7px",
              color: "black",
              background: "#0980B0 ",

            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingDetails;



