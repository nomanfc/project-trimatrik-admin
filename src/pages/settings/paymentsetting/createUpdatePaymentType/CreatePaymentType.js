import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import { create_payment_type } from "../../../../http_requests/httpreq";

const CreatePaymentType = (props) => {
  const [paymentType, setPaymentType] = useState();

  const handleChange = (e) => {
    setPaymentType({ ...paymentType, [e.target.name]: e.target.value });
  };

  const handleAddPaymentType = () => {
    create_payment_type(paymentType).then((res) => {
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
          label="Enter Payment Type"
          name="value"
          onChange={handleChange}
          variant="outlined"
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <TextField
          size="small"
          fullWidth
          stytle={{}}
          id="outlined-basic"
          label="Enter Purpose"
          multiline
          rows={4}
          name="purpose"
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
            onClick={handleAddPaymentType}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePaymentType;
