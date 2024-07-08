// ChartComponent.js
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Statisticalgender } from '../Redux/selector';
import { useSelector } from 'react-redux';


const ChartComponent = () => {
 const [gender, setgender] = useState([]);
 const data2=useSelector(Statisticalgender)
 console.log(data2)
  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        // Giả sử data là kết quả từ API
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const data1=Object.entries(data2).map((el)=>({
    date:el[0],
    nam:el[1]['Nam']?el[1]['Nam'].totalMoney:0,
    nu:el[1]['Nữ']?el[1]['Nữ'].totalMoney:0,
    unisex:el[1]['Unisex']?el[1]['Unisex'].totalMoney:0
  }))
  const data=daysOfWeek.map((el)=>({
    name:el,
    nam:data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el))?data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el)).nam:0 ,
    nu:data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el))?data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el)).nu:0,
    unisex:data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el))?data1.find(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el)).unisex:0,
  }))
        setgender(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatistical();
  }, [data2]);

  //console.log(data1)
  // const data2=daysOfWeek.map((el)=>({
  //   name:el,
  //   nam:data1.filter(item => new Date(item.date).getDay() === daysOfWeek.indexOf(el)).nam
  // }))
  //console.log(data2)
  return (
    <Card className='w-[600px] '>
      <CardBody>
        <ResponsiveContainer width="100%" height={300} className={"bg-[#363d68] p-2 rounded-2xl"}>
          <LineChart data={gender}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="nam" stroke="#8884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="nu" stroke="#82ca9d" strokeWidth={3} />
            <Line type="monotone" dataKey="unisex" stroke="#f7941d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default ChartComponent;
