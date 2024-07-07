import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PurchaseOrder } from '../Redux/selector';
import { Checkbox, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Date from '../Date/index'
import { useNavigate } from 'react-router-dom';
const columns = [
  { name: "", uid: "checkbox" },
  { name: "Id Order", uid: "id" },
  { name: "Created At", uid: "createdAt" },
  { name: "Status", uid: "status" },
   { name: "Received Date", uid: "receivedDate" },
  { name: "Total Amount", uid: "total_amount" },
];

const ImportProduct = () => {
  const navigate=useNavigate()
  const Order = useSelector(PurchaseOrder);
  const [number,setnumber]=useState(1)
  console.log(Order);

  return (
    <div className='w-[1250px] h-full -translate-x-10 flex flex-row gap-5'>
      <div className='w-[70%]'>
        <div className='w-full'>
          <Table bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            className="text-blue-500 border-slate-400 rounded-md"
            page={number}
            total={Math.ceil(Order.length / 7)}
            onChange={(page) => setnumber(page)}
          />
        </div>
      } aria-label="Example table with custom cells"
            color={"secondary"}
            selectionMode="single"
            defaultSelectedKeys={["2"]}
            className="bg-white shadow-md rounded-md w-full border-[2px] border-slate-300"
          >
            <TableHeader columns={columns} className='w-full flex flex-row justify-center'>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="text-[#71717a] bg-[#f4f4f5] p-3 text-center"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {Order.slice((number - 1) *7,(number - 1) *7 + 7).reverse().map((el, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-blue-100"
                  onClick={() => {navigate(`/Product/Import/${el.purchase_orders_id}`)}}
                >
                  <TableCell>
                    <Checkbox
                      isSelected={false} // Update this as needed
                    />
                  </TableCell>
                  <TableCell>
                    <div className='p-2 justify-center flex'>{el.purchase_orders_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className='p-2 justify-center flex'>{el.order_date.split('T')[0] + ' At ' + el.order_date.split('T')[1]}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`p-1 justify-center rounded-xl flex border-2 ${el.status === 'Prepare' ? 'bg-[#FFF9C4] border-[#7e7629] text-[#7e7629]' : el.status === 'Shipping' ? 'bg-[#BBDEFB] border-[#1f4a6e] text-[#1f4a6e]' : el.status === 'Receive' ? 'bg-[#C8E6C9] border-[#145017] text-[#145017]' : el.status === 'Cancel' ? 'bg-[#FFCDD2] border-[#b71c1c] text-[#b71c1c]' : ''}`}>{el.status}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`p-1 justify-center rounded-xl flex border-2 `}>{el.status}</div>
                  </TableCell>
                  <TableCell>
                    <div className='p-2 justify-center flex'>{el.total_amount}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <Date/>
      </div>
    </div>
  );
};

export default ImportProduct;
