import React, { useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Checkbox, Button, Pagination, Spinner, User, CircularProgress } from "@nextui-org/react";
import { EditIcon } from "./EditIcon.jsx";
import { DeleteIcon } from "./DeleteIcon.jsx";
import { EyeIcon } from "./EyeIcon.jsx";
import { Plus } from "./plus.jsx";
import Modal from "../Modal/index.jsx";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function App({ setnumber, products, number, columns, setSelected, selected }) {

  
  const loadingState = products.length === 0 ? "loading" : "idle";

  const handleSelectAll = () => {
    const allValues = products.map(product => product.id.toString());
    console.log(allValues);
    setSelected(allValues);
  };

  const handleCheckboxChange = (id) => {
    console.log(id)
    setSelected(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };


  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "NameProduct":
        return (
          <User
            avatarProps={{radius: "lg", src: product.avatar}}
            description={product.name}
            name={product.id}
          >
            {product.name}
          </User>
        );
      case "state":
        return (
          <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "quantity":
        return (
          <CircularProgress
      size="lg"
      value={(product.quantity/300)*100}
      color="success"
      className={`${(product.quantity/300)*100<25?"text-red-400":(product.quantity/300)*100>=25 &&(product.quantity/300)*100<75?"text-yellow-400":"text-green-400"}`}
      showValueLabel={true}
    />
        );  
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" className="border-yellow-400 rounded-2xl border-2 text-yellow-500">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 text-yellow-500">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit product" className="border-blue-400 rounded-2xl border-2 text-blue-500">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 text-blue-500">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product" className="border-red-400 rounded-2xl border-2 text-red-500">
              <span className="text-lg text-danger cursor-pointer active:opacity-50 text-red-500">
                <Modal
                  contentButton={<DeleteIcon />}
                  title={"Delete Product"}
                  style={"bg-red-300 w-[10px] p-0 m-0"}
                  content={"Bạn Có Muốn Xác Nhận xóa Sản Phẩm Với Id:01 Tên:Product1 Không?"}
                />
              </span>
            </Tooltip>
          </div>
        );
        case "Plus":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Import" className="hover:bg-orange-300 hover:text-white border-orange-300 rounded-2xl border-2 text-orange-300">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 text-orange-300">
                <Plus />
              </span>
            </Tooltip>
          </div>
        );
      case "checkbox":
        return (
          <Checkbox
            isSelected={selected.includes(product.id.toString())}
            onChange={() => handleCheckboxChange(product.id.toString())}
          />
        );
      default:
        return cellValue;
    }
  }, [selected]);

  const itemsPerPage = 7;
  const startIndex = (number - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <Button onPress={handleSelectAll} className="mb-4 items-start flex">
        Select All
      </Button>
      <Table bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            className="text-blue-500 border-slate-400 rounded-md"
            page={number}
            total={Math.ceil(products.length / 7)}
            onChange={(page) => setnumber(page)}
          />
        </div>
      } aria-label="Example table with custom cells" className="border-2 shadow-lg border-slate-500 rounded-lg">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="text-[#71717a] bg-[#f4f4f5] p-3">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {paginatedProducts.map((product) => (
            <TableRow
              key={product.id}
              className={`border-b-[3px] border-slate-300 cursor-pointer`}
            >
              {columns.map((column) => (
                <TableCell key={column.uid}>{renderCell(product, column.uid)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
