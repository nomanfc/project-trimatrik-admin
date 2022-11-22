import React, { useEffect, useCallback, useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CadreTypeTable from "./CadreType";
import DesignationTable from "./Designation";

import CreateCadreType from "./createCadreType/CreateCadreType";
import EditCadreType from "./createCadreType/EditCadreType";

import CreateDesignation from "./designationCreateUpdate/CreateDesignation";
import EditDesignation from "./designationCreateUpdate/EditDesignation";

import {
  get_all_designation,
  get_all_cadre,
  remove_cadre,
  remove_designation,
} from "../../../http_requests/httpreq";
import { lightThemeColor, mainThemeColor } from "../../../constants/constant";
import ChangePassword from "./changePassword/ChangePassModal";

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

const AdminSettingMain = () => {
  const [designation, setDesignation] = useState();
  const [cadre, setCadre] = useState();

  const [msgS, setMsgS] = useState("");
  const [msgF, setMsgF] = useState("");

  const [removeCadreData, setRemoveCadreData] = useState();
  const [removeDesignationData, setRemoveDesignationData] = useState();

  const [editCadreData, setEditCadreData] = useState();
  const [editDesignationData, setEditDesignationData] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_all_designation();
    setDesignation(res.data.data);

    const resC = await get_all_cadre();
    setCadre(resC.data.data);
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
    setRemoveDesignationData(data.row.original.id);
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

  //add cadretype modal/////////////////////////////////////
  const [openAddCadreModal, setOpenAddCadreModal] = React.useState(false);
  const handleOpenAddCadreModal = () => {
    setOpenAddCadreModal(true);
    // setAddCadreData(data.row.original.id);
  };
  const handleCloseAddCadreModal = () => setOpenAddCadreModal(false);

  //edit cadretype modal/////////////////////////////////////
  const [openEditCadreModal, setOpenEditCadreModal] = React.useState(false);
  const handleOpenEditCadreModal = (data) => () => {
    setOpenEditCadreModal(true);
    setEditCadreData(data.row.original);
  };
  const handleCloseEditCadreModal = () => setOpenEditCadreModal(false);

  //remove cadretype modal/////////////////////////////////////
  const [openRemoveCadreModal, setOpenRemoveCadreModal] = React.useState(false);
  const handleOpenRemoveCadreModal = (data) => () => {
    setOpenRemoveCadreModal(true);
    setRemoveCadreData(data.row.original.id);
  };
  const handleCloseRemoveCadreModal = () => setOpenRemoveCadreModal(false);

  //Change pass modal/////////////////////////////////////
  const [openChangePassModal, setOpenChangePassModal] = React.useState(false);
  const handleOpenChangePassModal = () => {
    setOpenChangePassModal(true);
    // setChangePassData(data.row.original.id);
  };
  const handleCloseChangePassModal = () => setOpenChangePassModal(false);

  const handleRemoveDesignation = () => {
    remove_designation(removeDesignationData).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseRemoveDesignationModal();
        setSnackbarF(true);
        fetchData();
      }
    });
  };

  const handleRemoveCadre = () => {
    remove_cadre(removeCadreData).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        setSnackbarF(true);
        fetchData();
        handleCloseRemoveCadreModal();
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
            Add New Designation
          </div>
          <CreateDesignation
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
            Edit Designation
          </div>
          <EditDesignation
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
            Do you want to remove this designation ?
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
                onClick={handleRemoveDesignation}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openAddCadreModal}
        onClose={handleCloseAddCadreModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Add New Cadre Type
          </div>
          <CreateCadreType
            handleClose={handleCloseAddCadreModal}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openEditCadreModal}
        onClose={handleCloseEditCadreModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Edit Cadre Type
          </div>
          <EditCadreType
            editCadreData={editCadreData}
            handleClose={handleCloseEditCadreModal}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openRemoveCadreModal}
        onClose={handleCloseRemoveCadreModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove2}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Do you want to remove this cadre type ?
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
                onClick={handleCloseRemoveCadreModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveCadre}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openChangePassModal}
        onClose={handleCloseChangePassModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, marginBottom: "20px" }}>
            Change Password
          </div>
          <ChangePassword
            handleClose={handleCloseChangePassModal}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontWeight: 600,
            color: "gray",
            fontSize: "22px",
            marginBottom: "20px",
          }}
        >
          Password Settings :
        </div>
        <Button
          style={{
            textTransform: "none",
            background: lightThemeColor,
            color: "#FFFFFF",
            padding: "10px 20px",
          }}
          onClick={handleOpenChangePassModal}
        >
          Change Password
        </Button>
        <div></div>
      </div>

      <div
        style={{
          fontWeight: 600,
          color: "gray",
          margin: "50px auto 20px auto",
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
          <CadreTypeTable
            cadre={cadre}
            handleAddCadreModal={handleOpenAddCadreModal}
            handleOpenRemoveCadreModal={handleOpenRemoveCadreModal}
            handleOpenEditCadreModal={handleOpenEditCadreModal}
          />
        </div>
        <div style={{ width: "47%", marginBottom: "50px" }}>
          <DesignationTable
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

export default AdminSettingMain;
