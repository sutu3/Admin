import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Giả sử bạn có dữ liệu về đơn hàng thành công và thất bại
const orderData = [
  { name: 'Thành công', value: 120 }, // Số lượng đơn hàng thành công
  { name: 'Thất bại', value: 30 }, // Số lượng đơn hàng thất bại
];

const COLORS = ['#0088FE', '#FF8042']; // Màu cho thành công và thất bại

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    return (
     <div className='w-full flex flex-col justify-center items-center'>
        <div className='translate-y-3 font-bold'>Tỷ Lệ Giao Hàng </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={400}>
              <Pie
                data={orderData} // Sử dụng dữ liệu đơn hàng
                cx={200} // Trung tâm biểu đồ
                cy={200}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={10}
                dataKey="value"
              >
                {orderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip /> {/* Thêm Tooltip */}
            </PieChart>
          </div>
          
          <div className='w-full flex flex-row justify-center gap-5'>
            <div className='w-full flex flex-row gap-3'><div className='bg-[#0088FE] w-5 h-5'></div> <div>Thành Công</div></div>
            <div className='w-full flex flex-row gap-3'><div className='bg-[#FF8042] w-5 h-5'></div> <div>Đã Hủy</div></div>
          </div>
     </div>
    );
  }
}