import React from "react";

/* Menu Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import MailIcon from "@mui/icons-material/Mail";
import CommentIcon from "@mui/icons-material/Comment";

import GradingIcon from "@mui/icons-material/Grading";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import PaymentIcon from "@mui/icons-material/Payment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { FaBloggerB } from "react-icons/fa";
import { GoProject } from "react-icons/go";

export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    to: "/",
    onActive: "",
  },

  {
    icon: <PaymentIcon />,
    title: "Member payable",
    onActive: "memberpayable",
    items: [
      {
        title: "Payable List",
        to: "/memberpayable",
        onActive: "memberpayable",
      },
      {
        title: "Create Payable",
        to: "/memberpayable/addpayable",
        onActive: "addpayable",
      },
    ],
  },

  {
    icon: <RequestPageIcon />,
    title: "Payout Request",
    to: "/payoutrequest",
    onActive: "payoutrequest",
  },

  {
    icon: <GradingIcon />,
    title: "Projects",
    onActive: "projects",
    items: [
      {
        title: "All Projects",
        to: "/projects/allprojects",
        onActive: "allprojects",
      },
      {
        title: "Create Project",
        to: "/projects/createproject",
        onActive: "createproject",
      },
    ],
  },

  {
    icon: <PeopleIcon />,
    title: "Members",
    onActive: "members",
    items: [
      {
        title: "All Members",
        to: "/members/allmembers",
        onActive: "allmembers",
      },
      {
        title: "Create Member",
        to: "/members/createmember",
        onActive: "createmember",
      },
    ],
  },

  {
    icon: <AdminPanelSettingsIcon />,
    title: "Admins",
    onActive: "admins",
    items: [
      {
        title: "All Admins",
        to: "/admins/alladmins",
        onActive: "alladmins",
      },
      {
        title: "Create Admin",
        to: "/admins/createadmin",
        onActive: "createadmin",
      },
    ],
  },

  {
    icon: <SettingsIcon />,
    title: "Settings",
    onActive: "settings",
    items: [
      {
        title: "Payment Settings",
        to: "/settings/memberpayment",
        onActive: "memberpayment",
      },
      {
        title: "Admin Settings",
        to: "/settings/adminsettings",
        onActive: "adminsettings",
      },
      // {
      //   title: "System Settings",
      //   to: "/settings/systemsettings",
      //   onActive: "systemsettings",
      // },
    ],
  },
];

// {
//   icon: <FaBloggerB style={{fontSize:"22px"}} />,
//   title: "Blogs",
//   onActive: "blogs",
//   items: [
//     {
//       title: "All Blogs",
//       to: "/blogs/",
//       onActive: "blogs",
//     },
//     {
//       title: "Create Blog",
//       to: "/blogs/createblog",
//       onActive: "createblog",
//     },
//   ],
// },
