import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";
import React from "react";
const sublinks = [
  {
    page: "HOME",
    links: [
      { label: "payment", icon: <FaCreditCard />, url: "/products" },
      { label: "terminal", icon: <FaCreditCard />, url: "/products" },
      { label: "connect", icon: <FaCreditCard />, url: "/products" },
    ],
  },
  {
    page: "view CUSTOMERS",
    links: [
      { label: "plugins", icon: <FaBook />, url: "/customers" },
      { label: "libraries", icon: <FaBook />, url: "/customers" },
      { label: "help", icon: <FaBook />, url: "/customers" },
      { label: "billing", icon: <FaBook />, url: "/customers" },
    ],
  },
  {
    page: "view trasactions",
    links: [
      { label: "about", icon: <FaBriefcase />, url: "/products" },
      { label: "customers", icon: <FaBriefcase />, url: "/products" },
    ],
  },
];

export default sublinks;
