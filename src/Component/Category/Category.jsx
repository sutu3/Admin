import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
  Calendar,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import InventoryPage from "./Inventory";
import { product, Sale, Quantity, Inventory } from "../Redux/selector.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../Custumer/Utils.jsx";
import { ChevronDownIcon } from "../Custumer/ChevronIcon.jsx";
import { parseDate } from "@internationalized/date";
import { toast } from "react-toastify";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { Tooltip } from "devextreme-react";
//import { Calendar } from "devextreme-react";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Type", uid: "type", sortable: true },
  { name: "Gender", uid: "gender" },
  { name: "Quantity", uid: "quantity", sortable: true },
];

const statusOptions = [
  { name: "Áo_thun", uid: "Áo_thun" },
  { name: "Áo_sơ_mi", uid: "Áo_sơ_mi" },
  { name: "Áo_polo", uid: "Áo_polo" },
  { name: "Áo_khoát", uid: "Áo_khoát" },
  { name: "Áo_tanktop", uid: "Áo_tanktop" },
  { name: "Áo_thể_thao", uid: "Áo_thể_thao" },
  { name: "Áo_tay_dài", uid: "Áo_tay_dài" },
  { name: "Quần_short", uid: "Quần_short" },
  { name: "Quần_jeans", uid: "Quần_jeans" },
  { name: "Quần_dài", uid: "Quần_dài" },
  { name: "Quần_thể_thao", uid: "Quần_thể_thao" },
];
const INITIAL_VISIBLE_COLUMNS = ["id", "type", "gender", "name", "quantity"];
const Category = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  let [value, setValue] = React.useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  console.log(typeof value);
  const inventory = useSelector(Inventory);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const quantity = useSelector(Quantity);
  const Product = useSelector(product);
  const inventoryDate = inventory[value.toString()];
  console.log(inventory)
  const filterProduct =!inventoryDate?[]: Object.entries(inventoryDate).map((el) => ({
    time: el[0],
    data: el[1],
  }))
  const users = Product.map((el) => ({
    id: el.product_id,
    name: el.name,
    type: el.type,
    gender: el.gender,
    quantity: quantity[el.product_id]
      ? Object.entries(quantity[el.product_id]).reduce(
          (acc, el) => acc + el[1],
          0
        )
      : 0,
    avatar: el.imagesMap[0].image_urlString,
  }));
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(users.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.type.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.type)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="border-[2px] border-slate-300 rounded-xl w-[300px]"
            classNames={{
              base: "w-full ",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div>
            <div className="flex gap-3">
              <Dropdown backdrop="blur">
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="sm"
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          aria-labelledby="submit-label"
          isCompact
          showControls
          showShadow
          color="primary"
          classNames={{
            cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl ",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <div className="w-[1350px] h-full  m-auto flex flex-col mt-4 gap-5">
        <Breadcrumbs
          aria-labelledby="submit-label"
          isDisabled
          radius="lg"
          variant="solid"
          className="bg-[#f4f4f5] w-fit rounded-2xl"
        >
          <BreadcrumbItem>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#c5c6c9" }} />
          </BreadcrumbItem>
          <BreadcrumbItem>All Promotion</BreadcrumbItem>
          <BreadcrumbItem>Add new Promotion</BreadcrumbItem>
        </Breadcrumbs>

        <div className="w-full h-full flex flex-row gap-5">
          <div className="w-[60%] h-full">
            <Table
              aria-label="Example table with custom cells, pagination and sorting"
              isHeaderSticky
              selectionBehavior="toggle"
              bottomContent={bottomContent}
              bottomContentPlacement="outside"
              selectionMode="multiple"
              onRowAction={(key) => alert(`Opening item ${key}...`)}
              classNames={{
                //table: "border-[2px] border-slate-300 rounded-lg",
                thead: "bg-slate-200 rounded-t-lg",
                tbody: "rounded-b-lg",
                //td: "border-b-[2px] border-slate-200 p-3",
              }}
              selectedKeys={selectedKeys}
              sortDescriptor={sortDescriptor}
              topContent={topContent}
              topContentPlacement="outside"
              onSelectionChange={setSelectedKeys}
              onSortChange={setSortDescriptor}
            >
              <TableHeader columns={headerColumns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    allowsSorting={column.sortable}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
            <Calendar
              aria-label="Date (Controlled)"
              value={value}
              showMonthAndYearPickers
              onChange={setValue}
              className="shadow-slate-300 bg-slate-100 w-[250px] h-fit shadow-inner rounded-md "
                classNames={{
                  calendar:
                    "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner",
                  input:
                    " rounded-md border border-slate-300 focus:border-slate-500",
                }}
            />
        </div>
        <div className="w-[70%] h-full flex flex-row">
          <div className="w-full h-full">
            <div className="h-full flex justify-center items-center">
              <InventoryPage data={filterProduct} />
            </div>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};
export default Category;
