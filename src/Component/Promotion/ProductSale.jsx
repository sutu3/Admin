import React from "react";
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
  Card,
  CardHeader,
  CardFooter,
  Progress,
} from "@nextui-org/react";
import {VerticalDotsIcon} from "../Custumer/VerticalDotsIcon";
import {ChevronDownIcon} from "../Custumer/ChevronIcon.jsx";
import { capitalize } from "../Custumer/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faBagShopping, faHouse, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Sale } from "../Redux/selector.jsx";
import { useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Title", uid: "title", sortable: true},
  {name: "Percent", uid: "Percent", sortable: true},
  {name: "Quantity", uid: "quantity", sortable: true},
  {name: "Date_start", uid: "Date_start"},
  {name: "Date_end", uid: "Date_end"},
  {name: "", uid: "next"},
//   {name: "STATUS", uid: "status", sortable: true},
//   {name: "ACTIONS", uid: "actions"},
];
// id:el.discount_id,
//     title:el.title,
//     Percent:el.percent,
//     quantity:el.saleDiscount.reduce((acc,el)=>acc+el.quantity,0),
//     Date_start:el.date_start,
//     Date_end:el.date_end
const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];



const INITIAL_VISIBLE_COLUMNS = ["name","next","Percent","quantity","Date_start","Date_end","title", "role", "status", "actions"];

const ProductSale=()=> {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const sale=useSelector(Sale)
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const productSale=sale.find((el)=>el.discount_id==location)
  console.log(productSale)
  const users=sale.map((el)=>({
    id:el.discount_id,
    title:el.title,
    Percent:el.percent*100+'%',
    quantity:el.saleDiscount.reduce((acc,el)=>acc+el.quantity,0),
    Date_start:el.date_start.split('T')[0],
    Date_end:el.date_end.split('T')[0],
    next:<Link to={`/promotion/${el.discount_id}`}><FontAwesomeIcon icon={faAnglesRight} /> </Link> 
  }))
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.title),
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
            avatarProps={{radius: "full", size: "sm", src: user.avatar}}
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
            <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
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
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
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
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <div>
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
        <BreadcrumbItem>All Promotion</BreadcrumbItem>

      </Breadcrumbs>
      <div className="w-full flex flex-col items-start">
        <div className="text-3xl font-bold">Promotion</div>
        <div className="font-bold font-serif mt-3">At a glance</div>
        
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
    </div>
    
  );
}
export default ProductSale;


