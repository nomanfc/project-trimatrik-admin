import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { get_dash_data } from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";

const DashData = () => {
  const router = useRouter();
  const [dashData, setDashData] = useState();
  const [enter, setEnter] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await get_dash_data();
    setDashData(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        minHeight: "100px",
      }}
    >
      {dashData?.map((data, index) => (
        <div
          key={index}
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
            borderRadius: "10px",
            background: "#FFFFFF",
            height: "100px",
            width: "24%",
            cursor: "pointer",
            display: "flex",
          }}
          onMouseEnter={() => setEnter(true)}
          onClick={() => Router.push(data?.box_tap_link)}
        >
          <div>
            <div
              style={{
                color: mainThemeColor,
                fontWeight: 600,
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <span>{data?.title}</span>
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: 900,
                fontSize: "25px",
                color: "#000000",
              }}
            >
              <span>{data?.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashData;