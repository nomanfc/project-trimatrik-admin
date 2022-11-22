import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { mainThemeColor } from "../../../constants/constant.js";

const DeactivateModal = (props) => {
  return (
    <div>
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
            onClick={props.handleCloseDisApproveModal}
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleDeActive}
            style={{ textTransform: "none", color: "red" }}
          >
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
