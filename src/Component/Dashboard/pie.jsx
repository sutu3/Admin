import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Statisticalgtype } from "../Redux/selector";
import { useSelector } from "react-redux";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = () => {
  const type = useSelector(Statisticalgtype);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        const data1 = Object.entries(type[new Date().toISOString().split("T")[0]]).map(
          (el) => ({ name: el[0], value: el[1].totalMoney })
        );
        setdata(data1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistical();
  }, []);
  return (
    <PieChart
      width={300}
      height={250}
    >
      <Pie
        data={data}
        cx={150}
        cy={250/2}
        className=""
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        cornerRadius={15} // Tạo độ bo tròn cho các phần, giá trị 5 cho góc bo tròn
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} className="" fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
      
        layout="vertical"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{
          
    display: "flex",
    flexDirection: "column", // Hiển thị theo chiều dọc
    alignItems: "center",// Khoảng cách với biểu đồ
    fontSize: "12px",
    fontFamily: "Arial",
    fontWeight: "normal",
    color: "#333",
    marginTop: "0px",
    marginLeft:"100px",
  }}
      />
    </PieChart>
  );
};

export default Piechart;