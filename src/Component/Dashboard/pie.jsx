import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Statisticalgtype } from "../Redux/selector";
import { useSelector } from "react-redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = ({ value }) => {
  const type = useSelector(Statisticalgtype);
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(true); // Trạng thái để kiểm tra dữ liệu có tồn tại hay không
  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        const dateData = type[value];
        if (dateData) {
          const data1 = Object.entries(dateData).map(
            (el) => ({ name: el[0], value: el[1].totalMoney })
          );
          setData(data1);
          setHasData(true);
        } else {
          setData([]);
          setHasData(false); // Cập nhật trạng thái nếu không có dữ liệu
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistical();
  }, [value, type]);

  return (
    <ResponsiveContainer width="40%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          cornerRadius={15}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "12px",
            fontFamily: "Arial",
            fontWeight: "normal",
            color: "#333",
            marginTop: "0px",
            marginLeft: "100px",
          }}
        />
        {!hasData && (
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            No data available for the selected date
          </text>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Piechart;
