import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { postService } from "../services/Services";

const AddPolicy = ({onClose}) => {
  const [AddPolicydescription, setAddPolicyDescription] = useState('')

  const handleAddPolicyDescription = (event) => {
    setAddPolicyDescription(event.target.value)
}


const onSubmit = async () => {
  onClose();
  const record = {
      
      descriptionName: AddPolicydescription,
    
  };
          await postService("AddPolicy", record)
}
  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Add Policy
      </Typography>
      <Divider />
      <div style={{ padding: "8px" }}>
        <Typography variant="body1" component="div" gutterBottom>
          Policy Description
        </Typography>
        <TextField
          id="standard-multiline-static"
          placeholder="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={AddPolicydescription}
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

export default AddPolicy;
