import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import {
  get_all_designation,
  get_all_cadre,
  create_cadre,
} from "../../../../http_requests/httpreq";

const CreateCadreType = (props) => {
  const [cadre, setCadre] = useState();

  const handleChange = (e) => {
    setCadre(e.target.value);
  };

  const handleAddCadre = () => {
    create_cadre(cadre).then((res) => {
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
          label="Enter Cadre Type"
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
            onClick={handleAddCadre}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCadreType;
