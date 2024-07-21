import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { BackgroundColor } from "devextreme-react/cjs/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "devextreme-react";

export default function Inventory( data ) {
  console.log(data.data);
const users =!data?[]: data.data.flatMap((el) =>
  el.data.map((el1) => ({
    Time:el.time.split('T')[1],
    idInventory:el1.idInventory,
    IDVariant: el1.idVariant,
    IDproduct: el1.idproduct,
    sizeColor: el1.sizeColor,
    amount: el1.amount,
    icon: (el1.reason === 'Giao hàng thành công'||el1.reason ==='Đang_giao_hàng')?true:false,
    change_amount: el1.change_amount,
    reason: el1.reason,
  }))
).reverse();
  const groupedData = users.reduce((acc, curr) => {
  if (!acc[curr.IDVariant]) {
    acc[curr.IDVariant] = [];
  }
  acc[curr.IDVariant].push(curr);
  return acc;
}, {});
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "sizeColor":
        return (
          <div className="flex flex-row">
            <div>{cellValue.split("/")[0]}/</div>
            <div
              style={{ BackgroundColor: cellValue.split("/")[1] }}
              className="w-8 h-5 rounded-xl"
            ></div>
          </div>
        );
        case "icon":
        return (
          <div className="flex flex-row gap-3">
            <FontAwesomeIcon icon={faStore} style={{color: "#74C0FC",}} />
            {cellValue?<FontAwesomeIcon icon={faArrowRight} style={{color: "#f63b5e",}} />:<FontAwesomeIcon icon={faArrowLeft} style={{color: "#63E6BE",}} />}
          </div>
        );
      case "amount":
        return <div>{cellValue}</div>;
      case "change_amount":
        return <div className={`${user.icon?'text-[#f63b5e]':'text-[#63E6BE]'}`}>{cellValue}</div>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.team}
            </p>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-col translate-x-20"> 
    <Table
      aria-label="Example table with client side pagination"
       classNames={{
                //table: "border-[2px] border-slate-300 rounded-lg",
                thead: "bg-slate-200 rounded-t-lg",
                tbody: "rounded-b-lg",
                //td: "border-b-[2px] border-slate-200 p-3",
              }}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="Time">Time</TableColumn>
        <TableColumn key="IDVariant">IDVariant</TableColumn>
        <TableColumn key="IDproduct">IDproduct</TableColumn>
        <TableColumn key="sizeColor">size/Color</TableColumn>
        <TableColumn key="amount">amount</TableColumn>
        <TableColumn key="icon"></TableColumn>
        <TableColumn key="change_amount">change_amount</TableColumn>
        <TableColumn key="reason">reason</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.idInventory}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
     {/* <InventoryChart/> */}
    </div>
   
  );
}
