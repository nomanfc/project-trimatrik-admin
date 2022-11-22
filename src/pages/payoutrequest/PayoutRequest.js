import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  get_all_payout_request,
  payout_verification_any,
  remove_member,
  approve_member,
  disapprove_member,
  payout_verification_any_disapprove,
  get_all_verified_payout_request,
  get_all_canceled_payout_request,
  get_all_pending_payout_request,
} from "../../http_requests/httpreq";

import VerifierModal from "./verifierModal/VerifierModal.js";
import NormalVerification from "./verifierModal/NormalVerification.js";

import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant.js";
import { IconButton } from "@mui/material";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleRemoveVer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "300px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PayOutRequest = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [age, setAge] = React.useState(0);
  const [id, setId] = useState(user?.member_id);

  const [verificationData, setVerificationData] = useState();
  const [msgS, setMsgS] = useState("");
  const [msgF, setMsgF] = useState("");

  //////////////////////////////////////////////
  const [SnackbarF, setSnackbarF] = useState(false);
  const handleCloseSnackF = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarF(false);
  };
  ///////////////////////////////////////////////

  //////////////////////////////////////////////
  const [SnackbarS, setSnackbarS] = useState(false);
  const handleCloseSnackS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarS(false);
  };
  ///////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openApproveModal, setOpenApproveModal] = React.useState(false);
  const handleOpenApproveModal = (data) => () => {
    setVerificationData(data.row.original);
    setOpenApproveModal(true);
  };
  const handleCloseApproveModal = () => setOpenApproveModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    setId(user?.member_id);
    if (!age) {
      const res = await get_all_payout_request();
      setAlluser(res.data.data);
    }

    if (age) {

      
      if (age === 1) {
        const res = await get_all_verified_payout_request();
        setAlluser(res.data.data);
      }

      if (age === 2) {
        const res = await get_all_canceled_payout_request();
        setAlluser(res.data.data);
      }

      if (age === 3) {
        const res = await get_all_pending_payout_request();
        setAlluser(res.data.data);
      }

    }
  }, [age]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleVerification = () => {
    payout_verification_any(verificationData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        handleCloseApproveModal();
        fetchData();
        setSnackbarS(true);
      } else {
        window.alert(res.data.message);
      }
    });
  };

  const handleDisapproveVerification = () => {
    payout_verification_any_disapprove(verificationData, id).then((res) => {
      console.log(res);
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseApproveModal();
        fetchData();
        setSnackbarF(true);
      } else {
        window.alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <Snackbar
        open={SnackbarF}
        autoHideDuration={3000}
        onClose={handleCloseSnackF}
      >
        <Alert
          onClose={handleCloseSnackF}
          severity="success"
          sx={{ width: "100%", background: "#F88379" }}
        >
          {msgF}
        </Alert>
      </Snackbar>

      <Snackbar
        open={SnackbarS}
        autoHideDuration={3000}
        onClose={handleCloseSnackS}
      >
        <Alert
          onClose={handleCloseSnackS}
          severity="success"
          sx={{ width: "100%", background: "#599f22" }}
        >
          {msgS}
        </Alert>
      </Snackbar>

      <Modal
        open={openApproveModal}
        onClose={handleCloseApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemoveVer}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                width: "fit-content",

                marginBottom: "30px",
              }}
            >
              <IconButton onClick={handleCloseApproveModal}>
                <CancelIcon />
              </IconButton>
            </div>
          </div>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to approve this request ?
          </Typography>

          {/* {verificationData?.payment_type_id === 1 ? (
            <VerifierModal />
          ) : (
            <NormalVerification />
          )} */}

          <NormalVerification
            handleVerification={handleVerification}
            handleCloseApproveModal={handleCloseApproveModal}
            handleDisapproveVerification={handleDisapproveVerification}
          />
        </Box>
      </Modal>

      <Table
        handleApproveModal={handleOpenApproveModal}
        row={alluser}
        age={age}
        handleChange={handleChange}
      />
    </div>
  );
};

export default PayOutRequest;
