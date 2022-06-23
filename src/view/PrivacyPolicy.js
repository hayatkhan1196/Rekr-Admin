import React, { useEffect, useState } from "react";
import Sidebars from "../component/Sidebars";
import "../style/privacyPolicy.scss";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import _PrivacyPolicy from "../assets/images/privacy_policy.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddPolicy from "../component/AddPolicy";
import { getService } from '../services/Services';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #E63369",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const PrivacyPolicy = () => {
  const [_open, setOpen] = useState(false);
  const _handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [addPolicy, setAddPolicy] = useState('')

  let list = []
  const getAllPolicy = async () => {

    const querySnapshot = await getService("AddPolicy")

    querySnapshot.forEach((doc) => {

      list.push({
        id: doc.id,

        ...doc.data()
      })
    });
    list.map((item) => {

      setAddPolicy(item)

    })
    // setLoading(false)
  };

  useEffect(() => {
    // if(!openPopup){
    getAllPolicy()
    // }
  }, [])
  return (
    <div className="privacy_div">
      <Sidebars />
      <div className="privacy_policy">
        <img
          src={_PrivacyPolicy}
          alt="privacy policy"
          className="privacy_image"
        />
        <Typography
          variant="body2"
          component="div"
          gutterBottom
          style={{ padding: "20px 40px 20px 40px" }}
        >
          {addPolicy && addPolicy.descriptionName}
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{
            margin: "10px 0px 10px 40px",
            color: "black",
            backgroundColor: "#E63369",
            borderRadius: "50px",
          }}
        >
          Add New Policy
        </Button>
        <Modal
          open={_open}
          onClose={_handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddPolicy onClose={_handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
