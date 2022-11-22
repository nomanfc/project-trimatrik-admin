import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import jsPDF from "jspdf";
import "jspdf-autotable";

import {
  get_all_members,
  remove_member,
  approve_member,
  disapprove_member,
  update_member_phone,
} from "../../http_requests/httpreq";

import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant.js";

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

const styleRemovePhone = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Members = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();

  const [id, setId] = useState();

  const [approveData, setApproveData] = useState();
  const [disApproveData, setDisApproveData] = useState();

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

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original.id);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openApproveModal, setOpenApproveModal] = React.useState(false);
  const handleOpenApproveModal = (data) => () => {
    setOpenApproveModal(true);
    setApproveData(data.row.original);
  };
  const handleCloseApproveModal = () => setOpenApproveModal(false);
  ///////////////////////////////////////////////////

  //Disapprove modal/////////////////////////////////////
  const [openDisApproveModal, setOpenDisApproveModal] = React.useState(false);
  const handleOpenDisApproveModal = (data) => () => {
    setOpenDisApproveModal(true);
    setDisApproveData(data.row.original);
  };
  const handleCloseDisApproveModal = () => setOpenDisApproveModal(false);
  ///////////////////////////////////////////////////

  const [updatePhoneData, setUpdatePhoneData] = useState();
  //Update Phone modal/////////////////////////////////////
  const [openUpdatePhoneModal, setOpenUpdatePhoneModal] = React.useState(false);
  const handleOpenUpdatePhoneModal = (data) => () => {
    setOpenUpdatePhoneModal(true);
    setUpdatePhoneData(data.row.original);
  };
  const handleCloseUpdatePhoneModal = () => setOpenUpdatePhoneModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setId(user?.member_id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleRemoveUser = () => {
    remove_member(deleteData).then((res) => {
      if (res.data.success === 1) {
        setSnackbarF(true);
        setOpenDeleteModal(false);
        setMsgF(res.data.message);
      }

      fetchData();
    });
  };

  const handleChangePhone = (e) => {
    setUpdatePhoneData({ ...updatePhoneData, [e.target.name]: e.target.value });
  };

  const handleApproveMember = () => {
    approve_member(approveData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        handleCloseApproveModal();
        setSnackbarS(true);
        fetchData();
      }
    });
  };

  const handleDisApproveMember = () => {
    disapprove_member(disApproveData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseDisApproveModal();
        setSnackbarF(true);
        fetchData();
      }
    });
  };

  const handleUpdatePhone = (e) => {
    update_member_phone(updatePhoneData).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        handleCloseUpdatePhoneModal();
        setSnackbarS(true);
        fetchData();
      }
    });
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = "Trimatrik"
    const headers = [["No.", "Name", "Cadre", "Phone", "Email"]];

    const data = alluser.map((elt) => [
      elt.member_no,
      elt.name,
      elt.cadre,
      elt.phone,
      elt.email,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    // doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${title}.pdf`);
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
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
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
            Do you want to remove this member ?
          </Typography>

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
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveUser}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
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
            Do you want to approve this member ?
          </Typography>

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
                onClick={handleCloseApproveModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApproveMember}
                style={{ textTransform: "none", color: mainThemeColor }}
              >
                Approve
              </Button>
            </div>
          </div>
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
            Do you want to Disapprove this member ?
          </Typography>
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
                onClick={handleCloseDisApproveModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDisApproveMember}
                style={{ textTransform: "none", color: "red" }}
              >
                Disapprove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openUpdatePhoneModal}
        onClose={handleCloseUpdatePhoneModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemovePhone}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Update Phone Number
          </Typography>

          <div>
            <div
              style={{
                width: "100%",
                marginTop: "30px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                focused
                id="outlined-basic"
                label="Phone Number"
                onChange={handleChangePhone}
                value={updatePhoneData?.phone}
                name="phone"
                variant="outlined"
              />
            </div>
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
                onClick={handleCloseUpdatePhoneModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdatePhone}
                style={{ textTransform: "none", color: mainThemeColor }}
              >
                Update Phone number
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Table
        handleApproveModal={handleOpenApproveModal}
        handleDisApproveModal={handleOpenDisApproveModal}
        handleDeleteModal={handleOpenDeleteModal}
        handleOpenUpdatePhoneModal={handleOpenUpdatePhoneModal}
        exportPDF={exportPDF}
        row={alluser}
      />
    </div>
  );
};

export default Members;
