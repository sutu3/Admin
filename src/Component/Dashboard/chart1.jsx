import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Sales: 400, pv: 240, amt: 240 },
  { name: 'Feb', Sales: 300, pv: 139, amt: 221 },
  { name: 'Mar', Sales: 200, pv: 980, amt: 229 },
  { name: 'Apr', Sales: 278, pv: 390, amt: 200 },
  { name: 'May', Sales: 189, pv: 480, amt: 218 },
  { name: 'Jun', Sales: 239, pv: 380, amt: 250 },
  { name: 'Jul', Sales: 349, pv: 430, amt: 210 },
];

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
  return (
    <Card style={{  background: 'linear-gradient(135deg, #39406d, #1c2037)', borderRadius: '20px' }} className={`w-[700px] h-[300px]`}>
      <CardHeader>
        <div style={{ color: '#ffffff', fontWeight: 'bold' }}>Biểu Đồ Thống Kê</div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
