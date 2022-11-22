import React, { useState, useEffect } from "react";
import moment from "moment";
import { get_payable_by_member_id } from "../../../http_requests/httpreq";

const DetailsModal = (props) => {
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    get_payable_by_member_id(props.details).then((res) => {
      setDetailData(res.data.data);
    });
  }, [props]);

  return (
    <div>
      {detailData?.map((data, index) => (
        <div data={index} style={{ marginTop: "10px" }}>
          <div>Date</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {moment(data?.created_at).format("lll") || "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Name </div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {data?.member_name || "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Title</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {data?.title || "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Amount Payable</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {data?.amount_payable || "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Payment Status</div>
          <div
            style={{
              color: data?.is_paid === 1 ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {data?.is_paid === 1 ? "Paid" : "Not paid yet"}
          </div>

          <div style={{ marginTop: "10px" }}>Paid at</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {data?.paid_at ? moment(data?.paid_at).format("lll") : "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Due Date</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {moment(data?.due_date).format("lll") || "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Fine Amount</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {data?.fine_amount || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsModal;
