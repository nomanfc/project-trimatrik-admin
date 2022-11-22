import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import {
  create_designation,
} from "../../../../http_requests/httpreq";

const CreateDesignation = (props) => {
  const [designation, setDesignation] = useState();

  const handleChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleAddDesignation = () => {
    create_designation(designation).then((res) => {
      if (res.data.success === 1) {
        props.setMsgS(res.data.message);
        props.handleClose();
        props.setSnackbarS(true);
        props.fetchData();
      }
    });
  };

  return (
    <>
      <div>
        <TextField
          size="small"
          fullWidth
          stytle={{}}
          id="outlined-basic"
          label="Enter Designation"
          onChange={handleChange}
          variant="outlined"
        />
      </div>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "auto" }}>
          <Button
            style={{
              textTransform: "none",
              color: "gray",
              marginRight: "50px",
            }}
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddDesignation}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateDesignation;
