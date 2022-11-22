import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../../../constants/constant.js";

import { edit_payment_type } from "../../../../http_requests/httpreq";

const EditPaymentType = (props) => {
  const [paymentType, setPaymentType] = useState();

  const handleChange = (e) => {
    setPaymentType({ ...paymentType, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setPaymentType(props?.editDesignationData);
  }, [props]);

  const handleEditPaymentType = () => {
    edit_payment_type(paymentType).then((res) => {
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
          stytle={{}}
          id="outlined-basic"
          label="Enter Payment Type"
          value={paymentType?.value}
          name="value"
          onChange={handleChange}
          variant="outlined"
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <TextField
          size="small"
          fullWidth
          focused
          stytle={{}}
          id="outlined-basic"
          label="Enter Purpose"
          multiline
          value={paymentType?.purpose}
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
            onClick={handleEditPaymentType}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditPaymentType;
