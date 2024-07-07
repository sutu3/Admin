import React, { useEffect, useState } from "react";
import Card from "./card.jsx";
import Chart from "./chart2.jsx";
import Chart1 from './chart1.jsx';
import Pie from "./pie.jsx";
import {
  faBagShopping,
  faBarsStaggered,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Statistical,Orders } from "../Redux/selector.jsx";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const columns1 = [
  {
    key: "name",
    label: "Product Name",
  },
  {
    key: "money",
    label: "Category",
  },
  {
    key: "sizeColor",
    label: "Total Revenue",
  },
  {
    key: "quantity",
    label: "Total Sales",
  },
];

const Value = () => {
  const [statistical, setStatistical] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useSelector(Statistical);
  const order = useSelector(Orders)
  console.log(order)
  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        // Giả sử data là kết quả từ API
        const today = new Date().toISOString().split('T')[0];
        const statisticalData = Object.entries(data[today] || {}).flatMap((el) =>
          el[1].map((el1) => ({
            
            name: el[0],
            money: el1.money,
            quantity: el1.quantity,
            sizeColor: el1.sizeColor
          }))
        ).sort((el1, el2) => el2.quantity - el1.quantity);
        setStatistical(statisticalData);
         
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistical();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const today = new Date();
  const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
  return (
    <div className="w-[1400px] h-full flex flex-row gap-1 mt-5 translate-x-6">
      <div className="w-[74%] h-full flex flex-col">
        <div className="w-full flex flex-row">
          <Chart />
          <Pie/>
        </div>
        <div className="w-full flex flex-row">
          <Chart1/>
        </div>
      </div>
      <div className="w-[26%] p-2 h-full rounded-2xl shadow-inner shadow-slate-500 flex gap-3 flex-col ">
        <Card
              text={"white"}
              number={180}
              value={65}
              icon={faBarsStaggered}
              content={"Total Money"}
              bg={"[#363d68]"}
              color={"bg-slate-200"}
            />
            <Card
              text={"[#e2d7ff]"}
              number={order.filter(
                          (el) =>
                            el.status != "Prepare" &&
                            new Date(el.created_at)
                              .toISOString()
                              .split("T")[0] ==
                              new Date().toISOString().split("T")[0]
                        ).length}
              value={((order.filter(
                          (el) =>
                            el.status != "Prepare" &&el.status != "Cancel" &&
                            new Date(el.created_at)
                              .toISOString()
                              .split("T")[0] ==
                              new Date().toISOString().split("T")[0]
                        ).length)/(order.filter(
                          (el) =>
                            el.status != "Prepare" &&el.status != "Cancel" &&
                            new Date(el.created_at)
                              .toISOString()
                              .split("T")[0] ==yesterday.toISOString().split("T")[0]
                        ).length))*100}
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
  );
};

export default Value;
