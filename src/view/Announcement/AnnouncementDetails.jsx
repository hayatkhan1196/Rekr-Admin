import React, { useState, useEffect } from "react";
import Sidebars from "../../component/SideBar/Sidebars";
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
import { getService, updateService } from '../../services/Services';
import { db } from "../../config/firebase/firebase";

const AnnouncementDetails = () => {
  const params = useParams();
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
  const [title, setTitle] = useState()

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
        const docRef = doc(db, "Annoucements", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data())
          // setfullName(docSnap.data().firstname)
          // setTitle(docSnap.data().title)
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


  const deleteUser = async (userId, id) => {

    const docRef = doc(db, "Annoucements", id);
    const docSnap = await getDoc(docRef);
    let announcementData = docSnap.data();


    const arrayOfObj = Object.entries(announcementData).map((e) => ({ [e[0]]: e[1] }));
    const updatedDate = arrayOfObj.filter((item) => item.userId !== userId)
    let objectDate = {
      responces: updatedDate

    }
    updateService("Annoucements", id, objectDate)

    if (data) {
      try {

        let list = data
        let listData = Object.values(list)
        list = listData.filter((i) => i.userId !== userId);
        setData(list)

      } catch (error) {
        console.log("error occur");
      }
    } else {
      console.log("No such document!");
      // setLoading(false)
    }
  };






  // const updateUser = async () => {
  //   let data = {
  //       userName: fullName,
  //       title: title
  //   }
  //   await updateService("Annoucements", id, data)
  //   _handleClose3()
  // }

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
        onClick={(() => { deleteUser(data.userId, id) })}
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
                image={data && data.picture}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {data && data.userName}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {data && data.firstname}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </Grid>

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
            <p> FullName</p>
            <TextField
              id="standard-multiline-static"
              value={fullName}
              variant="outlined"
              fullWidth
              onChange={(e) => setfullName(e.target.value)}

            />
          </div>
          <div style={{ padding: "8px" }}>
            <p> Contact</p>

            <TextField
              id="standard-multiline-static"
              value={title}
              variant="outlined"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}

            />
          </div>
          <Button
            variant="contained"
            // onClick={updateUser}
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

export default AnnouncementDetails;



