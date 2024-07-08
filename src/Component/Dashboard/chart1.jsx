import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { Statistical } from "../Redux/selector.jsx";

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle 
      fill={fill} 
      x={x} 
      y={y} 
      width={width} 
      height={height} 
      radius={[10, 10, 0, 0]} 
    />
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0)',
        color: '#ffffff',
        borderRadius: '5px',
        padding: '5px',
      }}>
        <p style={{ margin: 0 }} className='bg-white text-slate-600 p-2 rounded-xl'>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Example = () => {
  const [statistical, setStatistical] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useSelector(Statistical);

  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        // Giả sử data là kết quả từ API
        const today = new Date().toISOString().split('T')[0];
        const rawData = data[today] || {};

        // Chuẩn bị dữ liệu cho biểu đồ
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const salesData = daysOfWeek.map(day => ({
          name: day,
          Sales: Object.entries(data).flatMap((el)=>
         Object.entries(el[1]).flatMap((el2)=>el2[1].flatMap((el3)=>({
          date:el[0],
            name: el2[0],
            money: el3.money,
            quantity: el3.quantity,
            sizeColor: el3.sizeColor,
         }))))
            .filter(item => new Date(item.date).getDay() === daysOfWeek.indexOf(day))
            .reduce((acc, item) => acc + item.money, 0)
        }));

        setStatistical(salesData);
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

  return (
    <Card style={{ background: 'linear-gradient(135deg, #39406d, #1c2037)', borderRadius: '20px' }} className="w-[580px] h-[300px] translate-x-7">
      <CardHeader>
        <div style={{ color: '#ffffff', fontWeight: 'bold' }}>Biểu Đồ Thống Kê</div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer>
          <BarChart data={statistical} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0)' }} />
            <Legend />
            <Bar dataKey="Sales" fill="#ffffff" shape={<CustomBar />} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default Example;
