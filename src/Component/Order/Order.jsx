import {
  faBagShopping,
  faChevronDown,
  faHouse,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Orders, custumer } from "../Redux/selector";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { capitalize } from "../Custumer/Utils";
import { ChevronDownIcon } from "../Custumer/ChevronIcon";
import { Link } from "react-router-dom";
const statusColorMap = {
  Prepare: "#f5f7ff",
  Pending: "#f7910b",
  Shipping: "#1db6d8",
  Completed: "#0b9351",
  Cancel: "#f04438",
};
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "Create_At", uid: "CreateDate" },
  { name: "Shipping_At", uid: "shipping_at" },
  { name: "Address", uid: "shipping_to" },
  { name: "Lines", uid: "Lines" },
  { name: "Total_Amount", uid: "total_amount" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
];
const statusOptions = [
  { name: "Prepare", uid: "Prepare" },
  { name: "Pending", uid: "Pending" },
  { name: "Shipping", uid: "Shipping" },
  { name: "Completed", uid: "Completed" },
  { name: "Cancel", uid: "Cancel" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "Dropdownole", "status", "actions"];
const Order = () => {
  const orders = useSelector(Orders);
  const Customers = useSelector(custumer);
  const users = orders.map((el) => {
    const data = Customers.find((el1) => el1.account_id == el.account);
    if (data) {
      return {
        id: el.orders_id,
        name: data.username,
        email: data.email,
        CreateDate: el.created_at ? el.created_at.split("T")[0] : "--",
        shipping_at: el.shipping_at ? el.shipping_at.split("T")[0] : "--",
        shipping_to: el.addressorder ? el.addressorder : "--" ,
        Lines: el.orderItems.length,
        total_amount: el.total_amount,
        status: el.status,
        avatar: data.avatarString
          ? data.avatarString
          : "https://www.freeiconspng.com/thumbs/account-icon/account-icon-8.png",
      };
    }
  });
  console.log(orders);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
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

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User  aria-labelledby="submit-label"
            avatarProps={{ radius: "lg", src: user.avatar }}
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
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
            <Link to={`Item/${user.id}`} className="text-slate-300">
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            <div
              style={{ backgroundColor: statusColorMap[user.status] }}
              className="rounded-lg p-1"
            >
              {cellValue}
            </div>
          </Chip>
              </Link>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown  aria-labelledby="submit-label" backdrop="blur">
              <DropdownTrigger  aria-labelledby="submit-label" >
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
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

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input  aria-labelledby="submit-label"
            isClearable
            className="w-full sm:max-w-[44%] border-2 border-slate-400 rounded-xl"
            placeholder="Search by name..."
            startContent={
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#d3e1f8" }}
              />
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown backdrop="blur"  aria-labelledby="submit-label">
              <DropdownTrigger  aria-labelledby="submit-label" className="hidden sm:flex">
                <Button
                  endContent={<FontAwesomeIcon icon={faChevronDown} />}
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
            <Dropdown backdrop="blur"  aria-labelledby="submit-label">
              <DropdownTrigger  aria-labelledby="submit-label" className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize font-bold">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination  aria-labelledby="submit-label"
          isCompact
          showControls
          showShadow
          color="primary"
          classNames={{cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl "}}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
  return (
    <div className="w-[1350px] h-full  m-auto flex flex-col mt-4">
      <Breadcrumbs  aria-labelledby="submit-label"
        isDisabled
        radius="lg"
        variant="solid"
        className="bg-[#f4f4f5] w-fit rounded-2xl"
      >
        <BreadcrumbItem>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#c5c6c9" }} />
        </BreadcrumbItem>
        <BreadcrumbItem>All Order</BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full flex flex-col items-start">
        <div className="text-3xl font-bold">Sales orders</div>
        <div className="font-bold font-serif mt-3">At a glance</div>
        <div className="flex flex-row w-full gap-2 justify-center mt-5 mb-10">
          <Card  aria-labelledby="submit-label"
            className={`w-[400px] border-2 bg-white text-black border-slate-200 rounded-xl p-2 shadow-lg`}
          >
            <CardHeader className="flex gap-3 justify-between h-[60px]"  aria-labelledby="submit-label">
              <div className="flex flex-col">
                <div className="text-xs items-start flex font-[500] text-slate-500">
                  Complete orders
                </div>
                <p className="text-sm text-slate-800 font-mono flex text-default-500 justify-start ">
                  <div className="flex flex-col items-start">
                    <p className="text-2xl font-bold flex justify-start ">
                      $11,720,00
                    </p>
                  </div>
                </p>
              </div>
              <FontAwesomeIcon
                icon={faBagShopping}
                className={` p-2 rounded-lg`}
                size="lg"
                style={{ color: "black" }}
              />
            </CardHeader>
            <CardFooter>
              <Progress
               aria-labelledby="submit-label"
                label={
                  <div className="text-xs text-slate-300">10 of 38 records</div>
                }
                size="sm"
                value={4000}
                maxValue={10000}
                showValueLabel={true}
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-blue-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
              />
            </CardFooter>
          </Card>
          <Card
            className={`w-[400px] border-2 bg-white text-black border-slate-200 rounded-xl p-2 shadow-lg`}
          >
            <CardHeader className="flex gap-3 justify-between h-[60px]">
              <div className="flex flex-col">
                <div className="text-xs items-start flex font-[500]  text-blue-400">
                  Complete orders
                </div>
                <p className="text-sm text-slate-800 font-mono flex text-default-500 justify-start ">
                  <div className="flex flex-col items-start">
                    <p className="text-2xl font-bold flex justify-start text-blue-800">
                      $11,720,00
                    </p>
                  </div>
                </p>
              </div>
              <FontAwesomeIcon
                icon={faBagShopping}
                className={` p-2 rounded-lg`}
                size="lg"
                style={{ color: "black" }}
              />
            </CardHeader>
            <CardFooter>
              <Progress
               aria-labelledby="submit-label"
                label={
                  <div className="text-xs text-slate-300">10 of 38 records</div>
                }
                size="sm"
                value={4000}
                maxValue={10000}
                showValueLabel={true}
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-blue-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
              />
            </CardFooter>
          </Card>
            <Card
            className={`w-[400px] border-2 bg-white text-black border-slate-200 rounded-xl p-2 shadow-lg`}
          >
            <CardHeader className="flex gap-3 justify-between h-[60px]">
              <div className="flex flex-col">
                <div className="text-xs items-start flex font-[500] text-green-500">
                  Complete orders
                </div>
                <p className="text-sm text-slate-800 font-mono flex text-default-500 justify-start ">
                  <div className="flex flex-col items-start">
                    <p className="text-2xl font-bold flex justify-start text-green-800">
                      $11,720,00
                    </p>
                  </div>
                </p>
              </div>
              <FontAwesomeIcon
                icon={faBagShopping}
                className={` p-2 rounded-lg`}
                size="lg"
                style={{ color: "black" }}
              />
            </CardHeader>
            <CardFooter>
              <Progress
               aria-labelledby="submit-label"
                label={
                  <div className="text-xs text-slate-300">10 of 38 records</div>
                }
                size="sm"
                value={4000}
                maxValue={10000}
                showValueLabel={true}
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-blue-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          selectionBehavior="replace"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
    table: "border-[2px] border-slate-300 rounded-lg",
    thead: "bg-slate-200 rounded-t-lg",
    tbody: "rounded-b-lg",
    td: "border-b-[2px] border-slate-200 p-3"
  }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
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
                  <TableCell>
                  {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Order;
