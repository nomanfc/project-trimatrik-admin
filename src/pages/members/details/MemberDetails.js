import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";

import { BarChart } from "./barChart/BarChart";
import DashData from "./dashData/DashData";
import DoughNut from "./pieChart/PieChart";

import { get_member_by_id } from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";
// import Projects from "./projetcs/Projects";
import { useUserContext } from "../../../contexts/UserContext";

const MemberDetails = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState([""]);
  const [value, setValue] = React.useState();
  const [year, setYear] = useState("2022");
  const [id, setId] = React.useState(null);

  const router = useRouter();
  const {
    query: { data },
  } = router;

  const fetchData = useCallback(async () => {
    const res = await get_member_by_id(data);
    setAlluser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <div style={{ color: "#000000", fontSize: "25px", fontWeight: 700 }}>
        {alluser.id ? alluser?.first_name + " " + alluser?.last_name : "Name"}
      </div>
      <div style={{ color: "#000000", fontSize: "15px", fontWeight: 600 }}>
        {alluser.id ? alluser?.phone : "Phone number"}
      </div>
      <div style={{ color: "#000000", fontSize: "15px", fontWeight: 600 }}>
        {alluser.id ? alluser?.cadre_type : "Cadre"}
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "50px auto 10px auto",
        }}
      >
        <DashData id={data} />
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "50px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#000000", fontWeight: 700 }}></div>

          <div style={{ width: "fit-content", display: "flex" }}>
            <div style={{ marginLeft: "30px" }}>
              <FormControl fullWidth size="small" focused>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Year"
                  name="designation_id"
                  onChange={handleChangeYear}
                  style={{ color: mainThemeColor }}
                >
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </SelectM>
              </FormControl>
            </div>
          </div>
        </div>
        <BarChart id={data} year={year} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <div style={{ width: "47%", height: "200px" }}>
          <div
            style={{
              margin: "10px auto",
              color: mainThemeColor,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => Router.push("/projects/allprojects")}
          >
            Projects
          </div>
          <Projects />
        </div> */}
        <div style={{ width: "47%", height: "200px" }}>
          <DoughNut id={data} />
        </div>
      </div>
    </>
  );
};

export default MemberDetails;
