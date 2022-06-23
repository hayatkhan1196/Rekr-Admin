import React, { useEffect, useState } from "react";
import Sidebars from "../component/Sidebars";
import "../style/privacyPolicy.scss";
import _TermsAndConditions from "../assets/images/terms_and_conditions.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTermsAndConditions from "../component/AddTermsAndConditions";
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

const TermsAndConditions = () => {
  const [_open, setOpen] = useState(false);
  const _handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [termConditon, setTermConditon] = useState('')
  let list = []
  const getAllTermsAndCondition = async () => {

    const querySnapshot = await getService("TermsAndCondition")

    querySnapshot.forEach((doc) => {

      list.push({
        id: doc.id,

        ...doc.data()
      })
    });
    list.map((item) => {

      setTermConditon(item)

    })
    // setLoading(false)
  };

  useEffect(() => {
    // if(!openPopup){
    getAllTermsAndCondition()
    // }
  }, [])
  return (
    <div className="privacy_div">
      <Sidebars />
      <div className="privacy_policy">
        <img
          src={_TermsAndConditions}
          alt="privacy policy"
          className="privacy_image"
        />
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ display: "flex", justifyContent: "center", color: "#E63369" }}
        >
          <strong>TERMS AND CONDITIONS</strong>
        </Typography>
        <Typography
          variant="body2"
          component="div"
          gutterBottom
          style={{ padding: "0px 40px 20px 40px" }}
        >
          {termConditon && termConditon.termsAndConditionsDesc}
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
          Add New Terms and Conditions
        </Button>
        <Modal
          open={_open}
          onClose={_handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTermsAndConditions onClose={_handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TermsAndConditions;
