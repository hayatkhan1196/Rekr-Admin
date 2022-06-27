import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { postService, postServiceById } from "../../services/Services";

const AddTermsAndConditions = ({ onClose }) => {
  const [termConditon, setTermConditon] = useState('')
  const handleAddPolicyDescription = (event) => {
    setTermConditon(event.target.value)
  }
  const onSubmit = async () => {

    onClose();
    const record = {

      termsAndConditionsDesc: termConditon,

    };
    await postServiceById("TermsAndCondition", record)
  }

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Add terms and condition
      </Typography>
      <Divider />
      <div style={{ padding: "8px" }}>
        <Typography variant="body1" component="div" gutterBottom>
          Terms and conditions Description
        </Typography>
        <TextField
          id="standard-multiline-static"
          placeholder="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={termConditon}
          onChange={handleAddPolicyDescription}
        />
      </div>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        style={{
          float: "right",
          margin: "7px",
          color: "black",
          backgroundColor: "#E63369",
        }}
        onClick={onSubmit}

      >
        Save
      </Button>
    </div>
  );
};

export default AddTermsAndConditions;
