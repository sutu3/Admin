import React from "react";
import Table from "./table.jsx";
import Pie from "./pie.jsx";
const rows = [
  {
    key: "1",
    orderId: "ORD001",
    username: "Tony Reichert",
    location: "New York",
    amount: "$500",
    date: "2023-06-22",
    state: "Delivered",
  },
  {
    key: "2",
    orderId: "ORD002",
    username: "Zoey Lang",
    location: "San Francisco",
    amount: "$700",
    date: "2023-06-23",
    state: "Pending",
  },
  {
    key: "3",
    orderId: "ORD003",
    username: "Jane Fisher",
    location: "Los Angeles",
    amount: "$300",
    date: "2023-06-24",
    state: "Shipped",
  },
  {
    key: "4",
    orderId: "ORD004",
    username: "William Howard",
    location: "Chicago",
    amount: "$450",
    date: "2023-06-25",
    state: "Cancelled",
  },
];

const columns = [
  {
    key: "orderId",
    label: "ORDER ID",
  },
  {
    key: "username",
    label: "USERNAME",
  },
  {
    key: "location",
    label: "LOCATION",
  },
  {
    key: "amount",
    label: "AMOUNT",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "state",
    label: "STATE",
  },
];
const topSellingProducts = [
  {
    key: "1",
    productName: "Product A",
    category: "Electronics",
    sales: 150,
    revenue: "$15,000",
  },
  {
    key: "2",
    productName: "Product B",
    category: "Clothing",
    sales: 120,
    revenue: "$12,000",
  },
  {
    key: "3",
    productName: "Product C",
    category: "Home Appliances",
    sales: 100,
    revenue: "$10,000",
  },
  {
    key: "4",
    productName: "Product D",
    category: "Furniture",
    sales: 90,
    revenue: "$9,000",
  },
];

const columns1 = [
  {
    key: "productName",
    label: "Product Name",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "sales",
    label: "Total Sales",
  },
  {
    key: "revenue",
    label: "Total Revenue",
  },
];

const chart = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-between items-center">
      <div className="w-full h-full flex flex-row gap-5 justify-between">
        <div className="w-[700px]">
          <Table rows={topSellingProducts} columns={columns1} />
        </div>
        <div>
          <Pie />
        </div>
      </div>
      <div className="w-full h-full flex flex-row gap-5 justify-between">
        <div className="w-[80%] m-auto">
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default chart;
