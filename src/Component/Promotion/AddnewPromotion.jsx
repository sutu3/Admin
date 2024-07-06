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
  DateRangePicker,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faArrowDown,
  faArrowUp,
  faBagShopping,
  faHeading,
  faHouse,
  faMagnifyingGlass,
  faPercent,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { product, Sale, Quantity } from "../Redux/selector.jsx";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../Custumer/Utils.jsx";
import { ChevronDownIcon } from "../Custumer/ChevronIcon.jsx";
import { parseDate } from "@internationalized/date";
import { CreateSale } from "../Redux/SalesSlice.jsx";
import { toast } from "react-toastify";
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
const columns1 = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ID_Varient", uid: "idVarient", sortable: true },
  { name: "Size", uid: "size", sortable: true },
  { name: "Color", uid: "color" },
  { name: "sale_price", uid: "sale_price", sortable: true },
  { name: "sale_discount", uid: "sale_discount", sortable: true },
  { name: "DateStart", uid: "DateStart" },
    { name: "DateEnd", uid: "DateEnd" },
  { name: "Profit", uid: "profit" },
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

const Promotion = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [ProductSale, setProductSale] = useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [value, setValue] = React.useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });
  console.log(value);
  const [DateStart,setDateState]=useState('');
  const [DateEnd,setDateEnd]=useState('');
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [percent, setpercent] = useState(0);
  const [title, setTitle] = useState("");
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const quantity = useSelector(Quantity);
  console.log(Object.entries(quantity[1]));
  const Product = useSelector(product);
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
const [page1, setPage1] = React.useState(1);
  const pages =Math.ceil(users.length / rowsPerPage) ;
  const pages1=Math.ceil(ProductSale.length / rowsPerPage)
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
    []
  );

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

        <div className="w-full h-full flex flex-row">
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
          <div className="w-[40%] h-full ">
            <div className="w-[80%] gap-4 m-auto flex flex-col rounded-xl shadow-inner justify-center items-center">
              <h2>Add New Promotion</h2>
              <Input
                isClearable
                className="border-[2px] border-slate-300 rounded-xl w-[300px]"
                classNames={{
                  base: "w-full ",
                  inputWrapper: "border-1",
                }}
                placeholder="Enter Title"
                size="sm"
                startContent={<FontAwesomeIcon icon={faHeading} />}
                value={title}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onValueChange={setTitle}
              />
              <Input
                isClearable
                className="border-[2px] border-slate-300 rounded-xl w-[300px]"
                classNames={{
                  base: "w-full ",
                  inputWrapper: "border-1",
                }}
                placeholder="Enter discount."
                size="sm"
                startContent={<FontAwesomeIcon icon={faPercent} />}
                value={percent}
                variant="bordered"
                type="Number"
                onClear={() => setFilterValue("")}
                onValueChange={setpercent}
              />
              <DateRangePicker
                label="Select Order Date "
                onBlur={"lg"}
                value={value}
                onChange={setValue}
                className="shadow-slate-300 bg-slate-100 w-[250px] shadow-inner rounded-md "
                classNames={{
                  calendar:
                    "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner",
                  input:
                    " rounded-md border border-slate-300 focus:border-slate-500",
                }}
              />
              <Button
                onPress={() => {
                    console.log((value.end.day+'').length)
                    if(title!='' && percent!=0&& Array.from(selectedKeys).length!=0)
                    {

                    const start=`${value.start.year}-${(value.start.month+'').length==1?'0'+value.start.month:value.start.month}-${(value.start.day+'').length==1?'0'+value.start.day:value.start.day}`
                  const end=`${value.end.year}-${(value.end.month+'').length==1?'0'+value.end.month:value.end.month}-${(value.end.day+'').length==1?'0'+value.end.day:value.end.day}`
                  const arr = Product.flatMap((el) => {
                    if (
                      Array.from(selectedKeys).some(
                        (el5) => parseInt(el5) == el.product_id
                      )
                    ) {
                      return el.productVersion.flatMap((el1) =>
                        el1.variants.map((el2) => ({
                          id: el2.sales.id,
                          sale_price: el2.sales.sale_price,
                          sale_discount:
                            el2.sales.sale_base_price -
                            el2.sales.sale_base_price * parseFloat(percent),
                          color: el2.color,
                          size: el2.size,
                          idVarient: el2.sales.variant_id,
                          DateStart:start,
                          DateEnd:end,
                          profit:
                            el2.sales.sale_base_price -
                            el2.sales.sale_base_price * parseFloat(percent) -
                            el2.sales.sale_price,
                        }))
                      );
                    } else {
                      return [];
                    }
                  });
                  setProductSale(arr);
                  
                  setDateState(start)
                  setDateEnd(end)
                    }
                    else{
                        toast.info(
          `Has Value empty`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
                    }
                }}
              >
                Add New Product
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
        <div className="flex justify-end"><Button onClick={async()=>{
            await dispatch(CreateSale({
                title:title,
                percent:percent,
                list:ProductSale,
                date_start:DateStart,
                date_end:DateEnd,
            }))
            navigate('/promotion')
            toast.success(`Action Complete`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

        }} className="w-[200px] " >Create Discount</Button></div>
        
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
              td: "border-b-[2px] border-slate-200 p-3",
            }}
            bottomContent={<Pagination
          aria-labelledby="submit-label"
          isCompact
          showControls
          showShadow
          color="primary"
          classNames={{
            cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl ",
          }}
          page={page1}
          total={pages1}
          onChange={setPage1}
        />}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {columns1.map((el) => (
                <TableColumn
                  key={el.uid}
                  align={el.uid === "actions" ? "center" : "start"}
                  allowsSorting={el.sortable}
                >
                  {el.name}
                </TableColumn>
              ))}
              {/* {(column1) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )} */}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
              {ProductSale.slice(parseInt((page1-1)*rowsPerPage),parseInt((page1-1)*rowsPerPage+rowsPerPage) ).map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.idVarient}</TableCell>
                  <TableCell>{el.size}</TableCell>
                  <TableCell>
                    <div
                      style={{ backgroundColor: el.color }}
                      className="w-10 h-5 rounded-lg"
                    ></div>
                  </TableCell>
                  <TableCell>{el.sale_price}</TableCell>
                  <TableCell>{el.sale_discount}</TableCell>
                  <TableCell>{el.DateStart}</TableCell>
                  <TableCell>{el.DateEnd}</TableCell>
                  <TableCell>
                    <div
                      className={`${
                        el.profit < 0 ? "text-[#f37474]" : "text-[#59fbd6]"
                      } flex flex-row gap-4`}
                    >
                      {el.profit > 0 ? (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          rotation={45}
                          style={{ color: "#63E6BE" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          rotation={45}
                          style={{ color: "#f63b5e" }}
                        />
                      )}
                      {el.profit}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Promotion;
