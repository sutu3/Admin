// ChartComponent.js
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Statisticalgender } from "../Redux/selector";
import { useSelector } from "react-redux";

// Helper function to get the start of the current week
const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(start.setDate(diff));
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return [year, month, day].join('-');
};

const ChartComponent = ({value}) => {
  const [gender, setGender] = useState([]);
  const data2 = useSelector(Statisticalgender);

  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        const startOfWeek = getStartOfWeek(value);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const data1 = Object.entries(data2).map((el) => ({
          date: el[0],
          nam: el[1]["Nam"] ? el[1]["Nam"].totalMoney : 0,
          nu: el[1]["Nữ"] ? el[1]["Nữ"].totalMoney : 0,
          unisex: el[1]["Unisex"] ? el[1]["Unisex"].totalMoney : 0,
        }));

        const weeklyData = daysOfWeek.map((day, index) => {
          const currentDate = new Date(startOfWeek);
          currentDate.setDate(startOfWeek.getDate() + index);
          const formattedDate = formatDate(currentDate);
          
          const dayData = data1.find((item) => item.date === formattedDate) || {
            nam: 0,
            nu: 0,
            unisex: 0,
          };
          return {
            name: day,
            nam: dayData.nam,
            nu: dayData.nu,
            unisex: dayData.unisex,
          };
        });

        setGender(weeklyData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatistical();
  }, [data2,value]);

  return (
    <Card className="w-[600px] ">
      <CardBody>
        <ResponsiveContainer
          width="100%"
          height={300}
          className={"bg-[#363d68] p-2 rounded-2xl"}
        >
          <LineChart data={gender}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="nam"
              stroke="#8884d8"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="nu"
              stroke="#82ca9d"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="unisex"
              stroke="#f7941d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default ChartComponent;
