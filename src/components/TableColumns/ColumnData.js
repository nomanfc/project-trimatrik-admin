import moment from "moment";

//projects table//
export const ProjectColumnData = [
  {
    Header: "Project Name",
    accessor: "project_name",
  },
  {
    Header: "Registration Fee",
    accessor: "registration_fee",
  },
  {
    Header: "Total Share",
    accessor: "total_share",
  },
  {
    Header: "Total Member",
    accessor: "total_member",
  },

  {
    Header: "Created By",
    accessor: "created_by",
  },

  {
    Header: "Created At",
    accessor: (d) => moment(`${d.created_at}`).format("ll"),
  },
];

//project members table//
export const ProjectMemberColumnData = [
  {
    Header: "Member Name",
    accessor: "member_name",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Share Amount",
    accessor: "share_amount",
  },

  {
    Header: "Added At",
    accessor: (d) => moment(`${d.created_at}`).format("ll"),
  },
];

//member table//
export const MemberColumnData = [
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Member No.",
    accessor: "member_no",
  },

  {
    Header: "Cadre",
    accessor: "cadre",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },

  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Due month count",
    accessor: (d) => d.due_month_count,
  },
  {
    Header: "Due Monthly Fee",
    accessor: (d) => (d.due_monthly_fee !== null ? d.due_monthly_fee : 0),
  },
  {
    Header: "Verified by",
    accessor: "verifier",
  },
];

//admin table//
export const AdminColumnData = [
  {
    Header: "Name",
    accessor: `name`,
  },
  {
    Header: "Designation",
    accessor: "designation",
  },

  {
    Header: "User Name",
    accessor: "admin_user_name",
  },

  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Status",
    accessor: (d) => (d.is_active === 1 ? "Active" : "Inactive"),
  },
];

//designation table//
export const DesignationColumnData = [
  {
    Header: "Designation",
    accessor: `value`,
  },
];

//cadre type table//
export const CadreColumnData = [
  {
    Header: "Cadre Type",
    accessor: `value`,
  },
];

//payment type table//
export const PaymentTypeColumnData = [
  {
    Header: "Payment Type",
    accessor: `value`,
  },

  {
    Header: "Purpose",
    accessor: `purpose`,
  },
];

//payment request table//
export const PayOutRequestColumnData = [
  {
    Header: "Member Name",
    accessor: "member_name",
  },

  {
    Header: "Title",
    accessor: `title`,
  },

  {
    Header: "Payment Type",
    accessor: `payment_type`,
  },

  {
    Header: "Amount Payable",
    accessor: "amount_payable",
  },

  {
    Header: "Created At",
    accessor: (d) => moment(`${d.created_at}`).format("lll"),
  },

  {
    Header: "Verified By",
    accessor: "verified_by",
  },
];

//payable table//
export const MemberPayableColumnData = [
  {
    Header: "Member Name",
    accessor: "member_name",
  },

  {
    Header: "Title",
    accessor: `title`,
  },

  {
    Header: "Amount Payable",
    accessor: "amount_payable",
  },

  {
    Header: "Late Fine",
    accessor: "late_fine",
  },

  {
    Header: "Paid At",
    accessor: (d) =>
      d.paid_at ? moment(`${d.paid_at}`).format("lll") : "Not paid yet",
  },

  {
    Header: "Created At",
    accessor: (d) => moment(`${d.created_at}`).format("lll"),
  },
];

//Member Payable//
export const DashPayableColumnData = [
  {
    Header: "Member Name",
    accessor: "member_name",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Created at",
    accessor: (d) => moment(`${d.created_at}`).format("ll"),
  },
];

// export const ProjectColumnData = [
//   {
//     Header: "Name",
//     accessor: (d) => `${d.first_name} ${d.last_name}`,
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Phone",
//     accessor: "phone",
//   },

//   {
//     Header: "Created at",
//     accessor: (d) => moment(`${d.created_at}`).format("llll"),
//   },

//   {
//     Header: "Status",
//     accessor: (d) => `${d.status === "1" || d.status === 1 ? "One" : "Zero"}`,
//   },
// ];
