import React, { useEffect, useCallback, useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import PaymentTypeTable from "./PaymentType";
import CreatePaymentType from "./createUpdatePaymentType/CreatePaymentType";
import EditPaymentType from "./createUpdatePaymentType/EditPaymentType";

import {
  get_all_payment_type_data,
  delete_payment_type,
} from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleRemove2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentSettingMain = () => {
  const [designation, setDesignation] = useState();
  const [cadre, setCadre] = useState();

  const [msgS, setMsgS] = useState("");
  const [msgF, setMsgF] = useState("");

  const [removeCadreData, setRemoveCadreData] = useState();
  const [paymentTypeData, setPaymentTypeData] = useState();

  const [editCadreData, setEditCadreData] = useState();
  const [editDesignationData, setEditDesignationData] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_all_payment_type_data();
    setDesignation(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  //////////////////////////////////////////////
  const [SnackbarF, setSnackbarF] = useState(false);
  const handleCloseSnackF = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarF(false);
  };

  //////////////////////////////////////////////
  const [SnackbarS, setSnackbarS] = useState(false);
  const handleCloseSnackS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarS(false);
  };

  //add designation modal/////////////////////////////////////
  const [openAddDesignation, setOpenAddDesignation] = React.useState(false);
  const handleOpenAddDesignation = () => {
    setOpenAddDesignation(true);
    // setAddCadreData(data.row.original.id);
  };
  const handleCloseAddDesignation = () => setOpenAddDesignation(false);

  //remove designation modal/////////////////////////////////////
  const [openRemoveDesignationModal, setOpenRemoveDesignationModal] =
    React.useState(false);
  const handleOpenRemoveDesignationModal = (data) => () => {
    setOpenRemoveDesignationModal(true);
    setPaymentTypeData(data.row.original.id);
  };
  const handleCloseRemoveDesignationModal = () =>
    setOpenRemoveDesignationModal(false);

  //edit Designation modal/////////////////////////////////////
  const [openEditDesignationModal, setOpenEditDesignationModal] =
    React.useState(false);
  const handleOpenEditDesignationModal = (data) => () => {
    setOpenEditDesignationModal(true);
    setEditDesignationData(data.row.original);
  };
  const handleCloseEditDesignationModal = () =>
    setOpenEditDesignationModal(false);

  /////////////////////////////////////////////////////////////////////////////////

  const handleRemovePaymentType = () => {
    delete_payment_type(paymentTypeData).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseRemoveDesignationModal();
        setSnackbarF(true);
        fetchData();
      }
    });
  };



  return (
    <>
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
        open={openAddDesignation}
        onClose={handleCloseAddDesignation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Add New Payment Type
          </div>
          <CreatePaymentType
            handleClose={handleCloseAddDesignation}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openEditDesignationModal}
        onClose={handleCloseEditDesignationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Edit Payment Type
          </div>
          <EditPaymentType
            editDesignationData={editDesignationData}
            handleClose={handleCloseEditDesignationModal}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openRemoveDesignationModal}
        onClose={handleCloseRemoveDesignationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove2}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Do you want to remove this payment type ?
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
                onClick={handleCloseRemoveDesignationModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemovePaymentType}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div
        style={{
          fontWeight: 600,
          color: "gray",
          margin: "auto auto 50px auto",
          fontSize: "22px",
        }}
      >
        Dropdown Settings
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "47%", marginBottom: "50px" }}>
          <PaymentTypeTable
            designation={designation}
            handleOpenAddDesignation={handleOpenAddDesignation}
            handleOpenRemoveDesignationModal={handleOpenRemoveDesignationModal}
            handleOpenEditDesignationModal={handleOpenEditDesignationModal}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentSettingMain;
