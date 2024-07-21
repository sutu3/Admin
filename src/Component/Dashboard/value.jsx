import React, { useEffect, useState } from "react";
import Card from "./card.jsx";
import Chart from "./chart2.jsx";
import Chart1 from "./chart1.jsx";
import Pie from "./pie.jsx";
import {
  faBagShopping,
  faBarsStaggered,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Statistical, Orders, custumer } from "../Redux/selector.jsx";
import {
  Calendar,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

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
  const [accont, setaccount] = useState([]);
  const [error, setError] = useState(null);
  const [value, setvalue] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const data = useSelector(Statistical);
  const order = useSelector(Orders);
  const Custumer = useSelector(custumer);
   const today = new Date(value);
   console.log(today.toISOString().split('T')[0])
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        // Giả sử data là kết quả từ API
        //const today = new Date().toISOString().split("T")[0];
        const statisticalData = Object.entries(data[value] || {})
          .flatMap((el) =>
            el[1].map((el1) => ({
              name: el[0],
              money: el1.money,
              quantity: el1.quantity,
              sizeColor: el1.sizeColor,
            }))
          )
          .sort((el1, el2) => el2.quantity - el1.quantity);
        setStatistical(statisticalData);
        setaccount(Custumer);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistical();
  }, [data, accont,value]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="w-[1400px] h-full flex flex-col mt-5 translate-x-6 gap-5">
    <div className="w-full justify-center flex font-serif text-xl">Thông Kê Doanh Thu Ngày <div className="font-bold pl-3">{today.toISOString().split('T')[0]}</div> </div>
      <div className="w-[100%] flex flex-row  justify-around gap-2">
        <div className="w-[70%] h-full flex flex-col gap-3 ">
          <div className="w-[100%] flex flex-row items-center justify-around p-2  rounded-2xl shadow-inner shadow-slate-500 ">
            <Chart value={value}/>
            <Calendar
              aria-label="Date (Controlled)"
              value={value}
              showMonthAndYearPickers
              onChange={setvalue}
              className="shadow-slate-300 bg-slate-100 w-fit h-fit shadow-inner rounded-md "
              classNames={{
                calendar:
                  "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner ",
                input:
                  " rounded-md border border-slate-300 focus:border-slate-500",
              }}
            />
          </div>
          <div className="w-[100%] flex flex-row justify-around items-center p-2  rounded-2xl shadow-inner shadow-slate-500 ">
            <Chart1 value={value}/>
            <Pie value={value}/>
          </div>
        </div>
        <div className="w-fit p-2 h-full rounded-2xl shadow-inner shadow-slate-500 flex gap-5 flex-col ">
          <Card
            text={"white"}
            number={((Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.money, 0))-(Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.quantity*el.baseMoney, 0))).toLocaleString("vi-VN") + " vnd"}
            value={(((Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.money, 0))-(Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.quantity*el.baseMoney, 0)))/((Object.entries(data[yesterday.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.money, 0))-(Object.entries(data[yesterday.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.quantity*el.baseMoney, 0))))*100}
            icon={faBarsStaggered}
            content={"Total Money"}
            bg={"[#363d68]"}
            color={"bg-slate-200"}
          />
          <Card
            text={"[#e2d7ff]"}
            number={
              order.filter(
                (el) =>
                  el.status != "Prepare" &&
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                    today.toISOString().split('T')[0]
              ).length
            }
            value={
              (order.filter(
                (el) =>
                  el.status != "Prepare" &&
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                    today.toISOString().split('T')[0]
              ).length /
                order.filter(
                (el) =>
                  el.status != "Prepare" &&
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                    yesterday.toISOString().split('T')[0]
              ).length) *
              100
            }
            icon={faBagShopping}
            content={"Total Orders Today"}
            bg={"[#fcfcfc]"}
            color={"bg-[#e2d7ff]"}
          />
          <Card
            text={"slate-700"}
            number={
              accont.filter(
                (el) =>
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                  today.toISOString().split("T")[0]
              ).length
            }
            value={(accont.filter(
                (el) =>
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                  today.toISOString().split("T")[0]
              ).length/accont.filter(
                (el) =>
                  new Date(new Date(el.created_at).getTime() - (new Date(el.created_at).getTimezoneOffset() * 60000)).toISOString().split('T')[0] ==
                  yesterday.toISOString().split("T")[0]
              ).length)*100}
            icon={faUsers}
            content={"Total Client Today"}
            bg={"[#fcfcfc]"}
            color={"bg-slate-200"}
          />
          <Card
            text={"[#e2d7ff]"}
            number={
              Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.money, 0)
                .toLocaleString("vi-VN") + " vnd"
            }
            value={
              (Object.entries(data[today.toISOString().split("T")[0]] || {})
                .flatMap((el) =>
                  el[1].map((el1) => ({
                    name: el[0],
                    money: el1.money,
                    quantity: el1.quantity,
                    sizeColor: el1.sizeColor,
                    baseMoney:el1.baseMoney,
                  }))
                )
                .reduce((acc, el) => acc + el.money, 0) /
                Object.entries(data[yesterday] || {})
                  .flatMap((el) =>
                    el[1].map((el1) => ({
                      name: el[0],
                      money: el1.money,
                      quantity: el1.quantity,
                      sizeColor: el1.sizeColor,
                      baseMoney:el1.baseMoney,
                    }))
                  )
                  .reduce((acc, el) => acc + el.money, 0)) *
              100
            }
            icon={faBagShopping}
            content={"Total Money Today"}
            bg={"[#fcfcfc]"}
            color={"bg-[#2d9bda]"}
          />
        </div>
      </div>
        <div className="w-[98%] mt-10 mb-10 p-5 flex flex-row  justify-between gap-2 m-auto  rounded-2xl shadow-inner shadow-slate-500">
        <div className="w-[200px] h-full text-md justify-center items-center font-mono mt-10 translate-x-5">
          Top Các Sản phẩm bán chạy Trong ngày {value.toString()}
        </div>
        <Table
          aria-label="Example table with dynamic content"
          classNames={{
            table:
              "border-[2px] rounded-2xl shadow-inner shadow-slate-500 rounded-xl",
            thead: "bg-slate-200",
            tbody: "rounded-b-lg",
            td: "border-b-[2px] ",
          }}
        >
          <TableHeader>
            {columns1.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {statistical.slice(0, 5).map((row, index) => (
              <TableRow key={index}>
                {columns1.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Value;
