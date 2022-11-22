import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";
import Router from "next/router";

import { BarChart } from "./barChart/BarChart";
import DashData from "./dashData/DashData";
import DoughNut from "./pieChart/PieChart";
import Projects from "./projetcs/Projects";

import { get_all_members } from "../../http_requests/httpreq";
import { mainThemeColor } from "../../constants/constant";

const DashBoard = () => {
  const [alluser, setAlluser] = useState([]);
  const [name, setName] = useState();
  const [value, setValue] = React.useState();
  const [year, setYear] = useState("2022");
  const [id, setId] = React.useState(null);

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
    get_all_members().then((res) => {
      setAlluser(res.data.data);
      setName(res.data.data[0].name);
    });
  }, [fetchData]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };


  return (
    <>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "0px auto 10px auto",
        }}
      >
        <DashData />
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "40px auto",
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
            <div style={{ width: "250px" }}>
              <Autocomplete
                options={alluser}
                getOptionLabel={(option) => option?.name}
                size="small"
                id="members"
                value={value}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setValue(newValue);
                    setId(newValue?.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Member" />
                )}
              />
            </div>
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
        <BarChart id={id} year={year} />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        <div style={{ width: "47%", height: "200px" }}>
          <div
            style={{
              margin: "10px auto",
              color: mainThemeColor,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => Router.push("/payoutrequest")}
          >
            <span style={{ fontWeight: 700, fontSize: "18px" }}>
              {" "}
              Memeber Payout Requests
            </span>
            <span style={{ fontWeight: 700, fontSize: "14px", opacity: '0.7' }}>(view all)</span>
          </div>
          <Projects />
        </div>
        <div style={{ width: "47%", height: "200px" }}>
          <DoughNut />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
