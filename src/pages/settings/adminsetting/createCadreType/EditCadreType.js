import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import { edit_cadre } from "../../../../http_requests/httpreq";

const EditCadreType = (props) => {
  const [cadre, setCadre] = useState();

  const handleChange = (e) => {
    setCadre({ ...cadre, value: e.target.value });
  };

  useEffect(() => {
    setCadre(props.editCadreData);
  }, [props]);

  const handleEditCadre = () => {
    edit_cadre(cadre).then((res) => {
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
          value={cadre?.value}
          id="outlined-basic"
          label="Enter Cadre Type"
          onChange={handleChange}
          variant="outlined"
          focused
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
            onClick={handleEditCadre}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditCadreType;
