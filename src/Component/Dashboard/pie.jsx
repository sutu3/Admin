import { Card, CardBody, CardFooter, Chip, CircularProgress } from '@nextui-org/react';
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
     <Card className="w-[400px] h-[310px] rounded-2xl border-none bg-gradient-to-br  from-blue-500 to-fuchsia-500">
      <CardBody className="justify-center items-center pb-0">
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          Tỷ Lệ Giao Hàng Thành Công
        </Chip>
      </CardFooter>
        <CircularProgress
          classNames={{
            svg: "w-72 h-64 drop-shadow-md ",
            indicator: "stroke-white ",
            track: "stroke-white/10 ",
            value: "text-3xl font-semibold text-black",
          }}
          value={70}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      
    </Card>
    );
  }
}