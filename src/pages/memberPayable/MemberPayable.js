import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DetailsModal from "./detailsModal/DetailsModal.js";

import {
  get_all_payoutable,
  payout_verification_any,
  activate_payable,
  deactivate_payable,
  remove_member,
  approve_member,
  disapprove_member,
} from "../../http_requests/httpreq";

import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant.js";
import DeactivateModal from "./activeModal/DeActivateModal.js";
import ActivateModal from "./activeModal/ActiveModal.js";

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

const styleRemoveDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MemberPayable = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [id, setId] = useState();

  const [verificationData, setVerificationData] = useState();
  const [detailsData, setDetailsData] = useState();
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
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
  const handleOpenDetailsModal = (data) => () => {
    setDetailsData(data.row.original.member_id);
    setOpenDetailsModal(true);
  };
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);
  ///////////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openApproveModal, setOpenApproveModal] = React.useState(false);
  const handleOpenApproveModal = (data) => () => {
    setVerificationData(data.row.original);
    setOpenApproveModal(true);
  };
  const handleCloseApproveModal = () => setOpenApproveModal(false);
  ///////////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openDisApproveModal, setOpenDisApproveModal] = React.useState(false);
  const handleOpenDisApproveModal = (data) => () => {
    setVerificationData(data.row.original);
    setOpenDisApproveModal(true);
  };
  const handleCloseDisApproveModal = () => setOpenDisApproveModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_all_payoutable();
    setAlluser(res.data.data);
    setId(user?.member_id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleDeActive = () => {
    deactivate_payable(verificationData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        setSnackbarF(true);
        fetchData();
        handleCloseDisApproveModal();
      }
    });
  };

  const handleActive = () => {
    activate_payable(verificationData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        setSnackbarS(true);
        fetchData();
        handleCloseApproveModal();
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
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemoveDetails}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Payable Details
          </Typography>

          <DetailsModal
            handleCloseDetailsModal={handleCloseDetailsModal}
            details={detailsData}
          />
        </Box>
      </Modal>

      <Modal
        open={openDisApproveModal}
        onClose={handleCloseDisApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to deactivate this request ?
          </Typography>

          <DeactivateModal
            handleCloseDisApproveModal={handleCloseDisApproveModal}
            handleDeActive={handleDeActive}
          />
        </Box>
      </Modal>

      <Modal
        open={openApproveModal}
        onClose={handleCloseApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to activate this request ?
          </Typography>

          <ActivateModal
            handleCloseApproveModal={handleCloseApproveModal}
            handleActive={handleActive}
          />
        </Box>
      </Modal>

      <Table
        handleOpenApproveModal={handleOpenApproveModal}
        handleOpenDisApproveModal={handleOpenDisApproveModal}
        row={alluser}
        handleOpenDetailsModal={handleOpenDetailsModal}
      />
    </div>
  );
};

export default MemberPayable;
