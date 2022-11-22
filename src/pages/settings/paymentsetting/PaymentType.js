import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "next/link";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// import { styled } from "@mui/material/styles";
// import { useSelector } from "react-redux";

import { Tooltip } from "@mui/material";

import { useTable, useSortBy, usePagination } from "react-table";
import { mainThemeColor, lightThemeColor } from "../../../constants/constant";
import { PaymentTypeColumnData } from "../../../components/TableColumns/ColumnData";
import * as s from "../../../components/Styles/TableStyles";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return hDisplay + " " + mDisplay;
}

const defaultValue = [
  {
    value: "",
  },
];

const PaymentTypeTable = (props) => {
  const [tableData, setTableData] = useState(defaultValue);

  useEffect(() => {
    props.designation
      ? setTableData(props.designation)
      : setTableData(defaultValue);
  }, [props]);

  const detailsHandler = (data) => () => {};

  const headerColumn = useMemo(() => PaymentTypeColumnData, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
  } = useTable(
    {
      columns: headerColumn,

      data: tableData,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <s.showSize
          style={{
            marginBottom: "10px",
            color: mainThemeColor,
            fontWeight: 600,
          }}
        >
          Rows per page :
          <select
            style={{
              width: "50px",
              padding: "3px",
              marginLeft: "20px",
              color: mainThemeColor,
              fontWeight: 600,
            }}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 15, 20].map((pageSize, index) => (
              <option key={index} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </s.showSize>
        <div>
          <Tooltip title="Add designation" aria-label="add">
            <IconButton onClick={props.handleOpenAddDesignation}>
              <AddIcon style={{ color: mainThemeColor }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <s.table {...getTableProps()}>
        <s.thead>
          {headerGroups.map((headerGroup, index) => (
            <s.tr key={index} {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <s.th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={id}
                >
                  <s.span style={{ textAlign: "center" }}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon style={{ fontSize: "12px" }} />
                      ) : (
                        <ArrowUpwardIcon style={{ fontSize: "12px" }} />
                      )
                    ) : (
                      <ImportExportIcon style={{ fontSize: "12px" }} />
                    )}
                  </s.span>
                </s.th>
              ))}
              {/* <s.th style={{ textAlign: "center", width: "fit-content" }}>
                ফাইল
              </s.th> */}
              <s.th style={{ textAlign: "center", width: "150px" }}>
                Action
              </s.th>
            </s.tr>
          ))}
        </s.thead>

        {props && props.designation ? (
          <s.tbody {...getTableBodyProps()}>
            {page?.map((row, index) => {
              prepareRow(row);
              return (
                <s.tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <s.td
                        key={index}
                        onClick={detailsHandler({ row })}
                        //   style={{ cursor: "pointer" }}
                      >
                        {cell.render("Cell")}
                      </s.td>
                    );
                  })}

                  <s.td>
                    <s.actionCon>
                      <Tooltip title="Edit" aria-label="Edit">
                        <IconButton
                          onClick={props.handleOpenEditDesignationModal({
                            row,
                          })}
                        >
                          <EditIcon style={{ color: mainThemeColor }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Remove" aria-label="remove">
                        <IconButton
                          onClick={props.handleOpenRemoveDesignationModal({
                            row,
                          })}
                        >
                          <RemoveCircleIcon style={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </s.actionCon>
                  </s.td>
                </s.tr>
              );
            })}
          </s.tbody>
        ) : null}
      </s.table>

      {props && props.designation ? null : (
        <div
          style={{
            color: "gray",
            border: "1px solid #F8F8F8",
            height: "200px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ margin: "auto" }}> No Data Found</span>
        </div>
      )}

      <s.buttonCon style={{ marginTop: "25px" }}>
        <span style={{ color: lightThemeColor }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* <span style={{ color: lightThemeColor }}>
          ।। Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{
              color: mainThemeColor,
              marginLeft: "10px",
              marginRight: "10px",
              outlineColor: mainThemeColor,
              paddingLeft:"20px"
            }}
          />
        </span> */}
        <s.navButton
          style={{
            background: !canPreviousPage ? "gray" : mainThemeColor,
            color: "#FFFFFF",
            padding: "5px 10px",
          }}
          onClick={() => gotoPage(0)}
        >
          {"<<"}
        </s.navButton>
        <s.navButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            background: !canPreviousPage ? "gray" : mainThemeColor,
            color: "#FFFFFF",
            padding: "5px 10px",
          }}
        >
          Previous
        </s.navButton>
        <s.navButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            background: !canNextPage ? "gray" : mainThemeColor,
            color: "#FFFFFF",
            padding: "5px 10px",
          }}
        >
          Next
        </s.navButton>
        <s.navButton
          style={{
            background: !canNextPage ? "gray" : mainThemeColor,
            color: "#FFFFFF",
            padding: "5px 10px",
          }}
          onClick={() => gotoPage(pageCount - 1)}
        >
          {">>"}
        </s.navButton>
      </s.buttonCon>
    </>
  );
};

export default PaymentTypeTable;
