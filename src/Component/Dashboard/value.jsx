import React from "react";
import Card from "./card.jsx";
import Chart from "./chart2.jsx";
import Chart1 from './chart1.jsx'
import Table from "./table.jsx";
import Pie from "./pie.jsx";
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
import {
  faBagShopping,
  faBarsStaggered,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
const value = () => {
  return (
    <div className=" w-[95%]  h-full flex flex-col gap-1">
    <div className=" w-full h-full flex flex-row gap-3">
    <div  className=" w-full h-full flex flex-col gap-3">
        <div className="flex flex-row w-full gap-5 justify-around">
        <Card
          text={"white"}
          number={180}
          value={65}
          icon={faBarsStaggered}
          content={"Total Money"}
          bg={"slate-900"}
          color={"bg-slate-200"}
        />
        <Card
          text={"[#e2d7ff]"}
          number={120}
          value={62}
          icon={faBagShopping}
          content={"Total Orders Today"}
          bg={"[#fcfcfc]"}
          color={"bg-[#e2d7ff]"}
        />
        <Card
          text={"slate-700"}
          number={240}
          value={80}
          icon={faUsers}
          content={"Total Client Today"}
          bg={"[#fcfcfc]"}
          color={"bg-slate-200"}
        />
        <Card
          text={"[#e2d7ff]"}
          number={140}
          value={85}
          icon={faBagShopping}
          content={"Total Money Today"}
          bg={"[#fcfcfc]"}
          color={"bg-[#2d9bda]"}
        />
      </div>
    </div>
    </div>
    <div className="w-[95%] h-full flex flex-row gap-2 justify-between items-center m-auto">
      <div>
        <Chart1 />
      </div>
      <div>
        <Chart />
      </div>
    </div>
    <div className="w-full h-full flex flex-row gap-5 justify-between">
        <div className="w-[700px]">
          <Table rows={topSellingProducts} columns={columns1} />
        </div>
        <div>
          <Pie />
        </div>
      </div>
    </div>
  );
};

export default value;
