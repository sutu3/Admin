import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Checkbox, Button } from "@nextui-org/react";
import { EditIcon } from "./EditIcon.jsx";
import { DeleteIcon } from "./DeleteIcon.jsx";
import { EyeIcon } from "./EyeIcon.jsx";
import Modal from "../Modal/index.jsx"
const columns = [
  { name: "", uid: "checkbox" },  // Thêm cột cho checkbox
  { name: "ID", uid: "id" },
  { name: "Type of Product", uid: "typeOfProduct" },
  { name: "Name", uid: "name" },
  { name: "State", uid: "state" },
  { name: "Material", uid: "materialProduct" },
  { name: "Created At", uid: "createdAt" },
  { name: "Updated At", uid: "updatedAt" },
  { name: "Updated By", uid: "userUpdate" },
  { name: "ACTIONS", uid: "actions" }
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function App({ products, number }) {
  const [selected, setSelected] = useState([]);

  const handleSelectAll = () => {
    const allValues = products.map(product => product.id.toString());
    console.log(allValues)
    setSelected(allValues);
  };

  const handleCheckboxChange = (id) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{product.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
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
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 text-blue-500 ">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product" className="border-red-400 rounded-2xl border-2 text-red-500">
              <span className="text-lg text-danger cursor-pointer active:opacity-50 text-red-500 ">
                <Modal
              contentButton={<DeleteIcon />}
              title={"Delete Product"}
               style={"bg-red-300 w-[10px] p-0 m-0"}
              content={
                "Bạn Có Muốn Xác Nhận xóa Sản Phẩm Với Id:01 Tên:Product1 Không?"
              }
            />
                
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
      <Table aria-label="Example table with custom cells" className="border-2 border-slate-500 rounded-lg">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="bg-slate-400 p-3">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow key={product.id}>
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
