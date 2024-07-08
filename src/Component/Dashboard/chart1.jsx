import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { Statistical } from "../Redux/selector.jsx";

// Custom bar shape for rounded corners
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

// Custom tooltip
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

const Example = ({value}) => {
  const [statistical, setStatistical] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useSelector(Statistical);

  useEffect(() => {
    const fetchStatistical = async () => {
      try {
        const startOfWeek = getStartOfWeek(value);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const daysOfWeek = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];

        // Filter and map data for the current week
        const salesData = daysOfWeek.map((day, index) => {
          const currentDate = new Date(startOfWeek);
          currentDate.setDate(startOfWeek.getDate() + index);
          const formattedDate = formatDate(currentDate);

          const daySales = Object.entries(data)
            .flatMap(el => Object.entries(el[1]).flatMap(el2 =>
              el2[1].map(el3 => ({
                date: el[0],
                name: el2[0],
                money: el3.money,
                quantity: el3.quantity,
                sizeColor: el3.sizeColor,
              }))
            ))
            .filter(item => item.date === formattedDate)
            .reduce((acc, item) => acc + item.money, 0);

          return { name: day, Sales: daySales };
        });

        setStatistical(salesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistical();
  }, [data,value]);

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

