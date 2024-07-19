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
  DatePicker,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { ChevronDownIcon } from "../Custumer/ChevronIcon";
import { capitalize } from "../Custumer/Utils";
import { PurchaseOrder, Infor } from "../Redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { parseDate } from "@internationalized/date";
import { useDispatch } from "react-redux";
import {
  ChangeStatecancle,
  ChangeStateCancleAnđUpatePrice,
} from "../Redux/PurchaseSlice";
import CustumerSlice, { checkPermosion } from "../Redux/CustummerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const columns = [
  { name: "Id Order", uid: "id" },
  { name: "Created At", uid: "createdAt" },
  { name: "Status", uid: "status" },
  { name: "Received Date", uid: "receivedDate" },
  { name: "Total Amount", uid: "total_amount" },
  { name: "", uid: "cancel" },
];
const statusOptions = [
  { name: "Prepare", uid: "Prepare" },
  { name: "Shipping", uid: "Shipping" },
  { name: "Receive", uid: "Receive" },
  { name: "Cancel", uid: "Cancel" },
];

const statusColorMap = {
  Prepare: "#f8f483",
  Shipping: "#0bd4ed",
  Receive: "#59fbd6",
  Cancel: "#f9556b",
};
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "id",
  "createdAt",
  "total_amount",
  "receivedDate",
  "role",
  "status",
  "actions",
  "cancel",
];

export default function ImportProduct() {
  // Khởi tạo state với giá trị hiện tại
  const [value, setValue] = React.useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [date, setdate] = useState("");
  const dispatch = useDispatch();
  const infor = useSelector(Infor);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const orderpurchase = useSelector(PurchaseOrder);
  const [page, setPage] = React.useState(1);
  const users = orderpurchase
    .filter((el) => el.order_date.split("T")[0].includes(date))
    .map((el) => ({
      id: el.purchase_orders_id,
      createdAt: `${el.order_date.split("T")[0]} /  ${
        el.order_date.split("T")[1]
      }`,
      status: el.status,
      receivedDate: el.order_update_date
        ? `${el.order_update_date.split("T")[0]} /  ${
            el.order_update_date.split("T")[1]
          }`
        : "--",
      total_amount: el.total_amount,
      cancel: el.status != "Receive" && el.status != "Cancel" ? true : false,
    }));
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
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
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
      case "total_amount":
        return <div>{cellValue.toLocaleString("vi-VN")} vnđ</div>;
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
            className=" text-slate-400 m-auto w-fit"
            style={{ backgroundColor: statusColorMap[user.status] }}
            classNames={{ base: "text-center" }}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "cancel":
        return (
          cellValue && (
            <Button
              onClick={async () => {
                await dispatch(
                  ChangeStateCancleAnđUpatePrice({
                    id: user.id,
                    total_amount: user.total_amount,
                  })
                );
              }}
              endContent={
                <FontAwesomeIcon icon={faTrash} style={{ color: "#e93574" }} />
              }
              className="border-[2px] border-[#f9556b] bg-red-200 text-slate-400"
              size="sm"
              variant="flat"
            >
              Remove
            </Button>
          )
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Dropdown>
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
          {date && (
            <Chip
              className="border-[2px] border-slate-400 rounded-xl p-3"
              endContent={
                <FontAwesomeIcon
                  onClick={() => {
                    setdate("");
                  }}
                  icon={faX}
                  style={{ color: "#f52e55" }}
                />
              }
            >
              {date}
            </Chip>
          )}

          <div className="flex gap-3">
            <DatePicker
              label="Date Filter"
              value={value}
              className="shadow-slate-300 bg-slate-100 w-[250px] h-fit shadow-inner rounded-md"
              classNames={{
                calendar:
                  "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner",
                input:
                  "rounded-md border border-slate-300 focus:border-slate-500",
              }}
              onChange={(newValue) => {
                console.log(value.toString());
                setValue(
                  parseDate(newValue.toDate().toISOString().split("T")[0])
                );
                setdate(newValue.toString());
              }}
            />
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
          showControls
          classNames={{
            cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl "
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
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
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={{
        //table: "border-[2px] border-slate-300 rounded-lg",
        thead: "bg-slate-200 rounded-t-lg",
        tbody: "rounded-b-lg",
        //td: "border-b-[2px] border-slate-200 p-3",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
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
          <TableRow
            key={item.id}
            className="hover:bg-slate-100 duration-200 transition ease-in-out"
            onClick={async () => {
              const check = await dispatch(
                checkPermosion({
                  account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                  id: 8,
                })
              );
              if (check) {
                const result = await dispatch(
                  checkPermosion({
                    account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                    id: 11,
                  })
                );
                if (result.payload) {
                  navigate(`/Product/Import/${item.id}`);
                } else {
                  navigate("/Product/Add");
                  setTimeout(() => {
                    toast.info(`Your Permission Is Not Enough Affect`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  }, 500);
                }
              } else {
                localStorage.removeItem("login");
                dispatch(CustumerSlice.actions.changeState(false));
                window.location.reload();
              }
            }}
          >
            {(columnKey) => (
              <TableCell >{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
