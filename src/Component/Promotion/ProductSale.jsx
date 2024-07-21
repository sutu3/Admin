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
  Card,
  CardHeader,
  CardFooter,
  Progress,
  CardBody,
  Tooltip,
} from "@nextui-org/react";
import {VerticalDotsIcon} from "../Custumer/VerticalDotsIcon";
import {ChevronDownIcon} from "../Custumer/ChevronIcon.jsx";
import { capitalize } from "../Custumer/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faArrowDown, faArrowUp, faBagShopping, faHouse, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Sale,product } from "../Redux/selector.jsx";
import { useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "Type", uid: "type"},
  {name: "Percent", uid: "percent"},
  {name: "Quantity", uid: "quantity", sortable: true},
  {name: "Gender", uid: "gender"},
];
const columns1 = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Price_Base", uid: "priceBase"},
  // {name: "Price", uid: "price"},
  {name: "Price_Sale", uid: "priceSale"},
  {name: "Size", uid: "size"},
  {name: "Color", uid: "color"},
  {name: "Quantity", uid: "quantity"},
  {name: "Total_Money", uid: "totalMoney"},
  {name: "Profit", uid: "profit"},
];
const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];
const INITIAL_VISIBLE_COLUMNS = ["name","type","percent","quantity","gender","id","next","Percent","quantity","Date_start","Date_end","title", "role", "status", "actions"];
const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      fill={fill} 
      x={x} 
      y={y} 
      width={width} 
      height={height} 
      radius={[10, 10, 0, 0]} 
    />
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0)',
        color: '#ffffff',
        borderRadius: '5px',
        padding: '5px',
      }}>
        <p style={{ margin: 0 }} className='bg-white text-slate-600 p-2 rounded-xl'>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
const ProductSale=()=> {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [key,setkey]=useState(-1)
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const sale=useSelector(Sale)
  const Product=useSelector(product)
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const productSale=sale.find((el)=>el.discount_id==location)
  const users=productSale.productShow.map((el)=>({
    id:el.product_id,
    name:el.name,
    type:el.type,
    percent:productSale.percent,
    quantity:sale.find((el1)=>el1.discount_id==location).saleDiscount.reduce((acc,el2)=>{
  if (!acc[el2.productID]) {
    acc[el2.productID] = 0;
  }
  acc[el2.productID] += el2.quantity;
  // Return the updated accumulator
  return   acc;
}, {})[el.product_id],
    avatar:Product.find((el1)=>el1.product_id==el.product_id).imagesMap[0].image_urlString,
    gender:el.gender
  }))
  const user1=sale.find((el1)=>el1.discount_id==location).saleDiscount.map((el)=>el.productID==key?({
    id:el.productID,
    priceBase:el.priceBase,
    price:(el.priceBase+(el.priceBase*users.find((el2)=>el2.id==el.productID).percent)),
    priceSale:el.priceSale,
    color:el.color,
    size:el.size,
    quantity:el.quantity,
    totalMoney:el.totalMoney,
    profit:((el.priceSale-el.priceSale*productSale.percent)-el.priceBase)*el.quantity,
  }):null).filter((el)=>el!=null)
  console.log(user1)
  const data=productSale.productShow.map((el)=>({
    name:el.name,
    Sales:sale.find((el1)=>el1.discount_id==location).saleDiscount.reduce((acc,el2)=>{
  // If there's no entry in acc for the product_id yet, create a new entry
  if (!acc[el2.productID]) {
    acc[el2.productID] = 0;
  }
  // Add the quantity to the existing entry for the product_id
  acc[el2.productID] += el2.totalMoney;
  // Return the updated accumulator
  return   acc;
}, {})[el.product_id]
  }))
  const data01=productSale.productShow.map((el)=>({
    name:Product.find((el1)=>el1.product_id==el.product_id).name,
    value:sale.find((el1)=>el1.discount_id==location).saleDiscount.reduce((acc,el2)=>{
  // If there's no entry in acc for the product_id yet, create a new entry
  if (!acc[el2.productID]) {
    acc[el2.productID] = 0;
  }
  // Add the quantity to the existing entry for the product_id
  acc[el2.productID] += el2.quantity;
  // Return the updated accumulator
  return   acc;
}, {})[el.product_id]
  }))
  const data02=productSale.saleDiscount.map((el)=>({
    name:Product.find((el1)=>el1.product_id==el.productID).name,
    value:el.quantity
  }))
  console.log(sale.find((el1) => el1.discount_id == location).saleDiscount.reduce((acc, el2) => {
  // If there's no entry in acc for the product_id yet, create a new entry
  if (!acc[el2.productID]) {
    acc[el2.productID] = 0;
  }
  // Add the quantity to the existing entry for the product_id
  acc[el2.productID] += el2.quantity;
  // Return the updated accumulator
  return   acc;
}, {}))
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
          <User  aria-labelledby="submit-label"
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
          <div className="flex flex-col"  aria-labelledby="submit-label">
            <p className="text-bold text-small capitalize"  aria-labelledby="submit-label">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500"  aria-labelledby="submit-label">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip  aria-labelledby="submit-label"
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
          <div className="relative flex justify-end items-center gap-2"  aria-labelledby="submit-label">
            <Dropdown className="bg-background border-1 border-default-200"  aria-labelledby="submit-label">
              <DropdownTrigger  aria-labelledby="submit-label">
                <Button isIconOnly radius="full" size="sm" variant="light"  aria-labelledby="submit-label">
                  <VerticalDotsIcon className="text-default-400"  aria-labelledby="submit-label"/>
                </Button>
              </DropdownTrigger>
              <DropdownMenu  aria-labelledby="submit-label">
                <DropdownItem  aria-labelledby="submit-label">View</DropdownItem>
                <DropdownItem  aria-labelledby="submit-label">Edit</DropdownItem>
                <DropdownItem  aria-labelledby="submit-label">Delete</DropdownItem>
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
          <Input  aria-labelledby="submit-label"
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
        <div className="flex justify-between items-center"  aria-labelledby="submit-label">
          <span className="text-default-400 text-small"  aria-labelledby="submit-label">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small"  aria-labelledby="submit-label">
            Rows per page:
            <select  aria-labelledby="submit-label"
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
    <div className="w-[1350px] h-full translate-x-10 p-5">
<div className="w-full h-full  m-auto flex flex-col mt-4 gap-5">
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
        <BreadcrumbItem>Promition No:{productSale.discount_id}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full p-3 text-2xl font-mono text-left">TiTle: {productSale.title}</div>
      <div className="w-full flex flex-row items-start justify-between">
      <div className="w-1/2">
        <Card style={{  background: 'linear-gradient(135deg, #39406d, #1c2037)', borderRadius: '20px' }} className={`w-[700px] h-[300px]`}>
      <CardHeader>
        <div style={{ color: '#ffffff', fontWeight: 'bold' }}>Biểu Đồ Thống Kê</div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer className={"text-[12px]"}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0)' }} />
            <Legend />
            <Bar dataKey="Sales" fill="#ffffff" shape={<CustomBar />} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
      </div>
        <div className="w-1/2 flex justify-end">
          {/* <ResponsiveContainer width="100%" height="100%"> */}
         <PieChart width={500} height={300}>
    <Pie 
      data={data01} 
      dataKey="value" 
      cx="50%" 
      cy="50%" 
      outerRadius={80} 
      fill="#8884d8"
      className="w-[600px] h-[400px]" 
    />
    <Pie 
      data={data02} 
      dataKey="value" 
      cx="50%" 
      cy="50%" 
      innerRadius={90} 
      outerRadius={110} 
      fill="#82ca9d" 
      label 
    >
      {data02.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
      {/* </ResponsiveContainer> */}
        </div>
      </div>
      <div className=" w-full h-full flex flex-col">
      <div className="w-[100%] h-full">
      <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          onRowAction={(key) => setkey(key)}
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
      <div className="w-[100%] h-full">
      <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
                    selectionBehavior="replace"

          //onRowAction={(key) => setkey(key)}
          //bottomContent={bottomContent}
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
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
          {columns1.map((el)=>
          <TableColumn
                key={el.uid}
                align={el.uid === "actions" ? "center" : "start"}
                allowsSorting={el.sortable}
              >
                {el.name}
              </TableColumn>)}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
          {user1.map((el,index)=><TableRow key={index}>
                  <TableCell>
                    {el.id}
                  </TableCell>
                  <TableCell>
                    {el.priceBase}
                  </TableCell>
                  <TableCell>
                    {el.priceSale}
                  </TableCell>
                  <TableCell>
                    {el.size}
                  </TableCell>
                  <TableCell>
                    <div style={{backgroundColor:el.color}} className="w-10 h-5 rounded-lg"></div>
                  </TableCell>
                  <TableCell>
                    {el.quantity}
                  </TableCell>
                  <TableCell>
                    {el.totalMoney}
                  </TableCell>
                  <TableCell>
                  <div className={`${el.profit<0?'text-[#f37474]':'text-[#59fbd6]'} flex flex-row gap-4`}>
                    {el.profit>0?<FontAwesomeIcon icon={faArrowUp} rotation={45} style={{color: "#63E6BE",}} />:<FontAwesomeIcon icon={faArrowDown} rotation={45} style={{color: "#f63b5e",}} />}
                    {el.profit}
                  </div>
                  </TableCell>
              </TableRow>)}
           
          </TableBody>
        </Table>
      </div>  
      </div>
    </div>
    </div>
    
  );
}
export default ProductSale;


