import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import { edit_designation } from "../../../../http_requests/httpreq";

const EditDesignation = (props) => {
  const [designation, setDesignation] = useState();

  const handleChange = (e) => {
    setDesignation({ ...designation, value: e.target.value });
  };

  useEffect(() => {
    setDesignation(props.editDesignationData);
  }, [props]);

  const handleUpdateDesignation = () => {
    edit_designation(designation).then((res) => {
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
          focused
          value={designation?.value}
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
            onClick={handleUpdateDesignation}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditDesignation;
