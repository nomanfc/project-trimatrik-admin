import React, { useState, useEffect, useMemo } from "react";
import Router, { withRouter, useRouter } from "next/router";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArticleIcon from "@mui/icons-material/Article";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { useTable, useSortBy, usePagination } from "react-table";
import { PayOutRequestColumnData } from "../../components/TableColumns/ColumnData";
import { lightThemeColor, mainThemeColor } from "../../constants/constant";

import * as s from "../../components/Styles/TableStyles";

const defaultValue = [
  {
    title: "No Data",
    category: "No Data",
    bid_count: "No Data",
    max_bid: "No Data",
    bid_ends_in_second: "No Data",
  },
];

const Table = (props) => {
  const [tableData, setTableData] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    props.row ? setTableData(props.row) : setTableData(defaultValue);
  }, [props]);

  const headerColumn = useMemo(() => PayOutRequestColumnData, []);

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
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <s.showSize
        style={{
          marginBottom: "30px",
          color: mainThemeColor,
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "fit-content" }}>
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
            {[10, 25, 50].map((pageSize, index) => (
              <option key={index} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", width: "200px" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.age}
              label="Filter by"
              onChange={props.handleChange}
            >
              <MenuItem value={0}>All Requests</MenuItem>
              <MenuItem value={1}>Approved Requests</MenuItem>
              <MenuItem value={2}>Disapproved Requests</MenuItem>
              <MenuItem value={3}>Pending Requests</MenuItem>
            </Select>
          </FormControl>
        </div>
      </s.showSize>

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
                Payment proof
              </s.th>

              <s.th style={{ textAlign: "center", width: "150px" }}>
                Action
              </s.th>
            </s.tr>
          ))}
        </s.thead>

        {props && props.row ? (
          <s.tbody {...getTableBodyProps()}>
            {page?.map((row, index) => {
              prepareRow(row);
              return (
                <s.tr
                  {...row.getRowProps()}
                  key={index}
                  row={row.original.due_month_count}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <s.td
                        key={index}
                        style={{
                          color:
                            cell.column.Header === "Due Month/Months"
                              ? cell.value > 0
                                ? ""
                                : ""
                              : cell.column.Header === "Due amount"
                              ? cell.value > 0
                                ? ""
                                : ""
                              : cell.value === "Due"
                              ? ""
                              : cell.value === "No Due" || cell.value === 0
                              ? ""
                              : "",
                        }}
                      >
                        {cell.render("Cell")}
                      </s.td>
                    );
                  })}
                  <s.td>
                    <s.actionCon>
                      <Tooltip title="Download Copy" aria-label="Download Copy">
                        <IconButton>
                          <DownloadForOfflineIcon
                            style={{ color: mainThemeColor }}
                          />
                        </IconButton>
                      </Tooltip>
                    </s.actionCon>
                  </s.td>

                  <s.td>
                    <s.actionCon>
                      <Tooltip title="Veriy" aria-label="Verify">
                        <IconButton
                          disabled={
                            row.original.is_verified === 1 ||
                            row.original.is_verified === 0
                              ? true
                              : false
                          }
                          onClick={props.handleApproveModal({ row })}
                        >
                          <CheckCircleIcon
                            style={{
                              color:
                                row.original.is_verified === 1 ||
                                row.original.is_verified === 0
                                  ? "gray"
                                  : mainThemeColor,
                            }}
                          />
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

      {props && props.row ? null : (
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

export default Table;
