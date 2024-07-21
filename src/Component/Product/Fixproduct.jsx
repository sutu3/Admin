// import {
//   Button,
//   Checkbox,
//   Pagination,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
//   Textarea,
// } from "@nextui-org/react";
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PurchaseOrder } from "../Redux/selector";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { ImportPurchase } from "../Redux/PurchaseSlice";
// const columns = [
//   { name: "", uid: "checkbox" },
//   { name: "ID", uid: "idItem" },
//   { name: "Name", uid: "name" },
//   { name: "Quantity", uid: "quantity" },
//   { name: "Price", uid: "price" },
//   { name: "Size", uid: "size" },
//   { name: "Color", uid: "color" },
//   { name: "Quantity_real", uid: "quantity_real" },
//   { name: "Percentage", uid: "Percentage" },
//   { name: "Price_sale", uid: "price_sale" },
// ];
// const Fixproduct = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading,setloading]=useState(false)
//   const [number, setnumber] = useState(1);
//   const [selected, setselected] = useState([]);
//   const [quantity, setquantity] = useState("");
//   const [price, setprice] = useState("");
//   const location =
//     useLocation().pathname.split("/")[
//       useLocation().pathname.split("/").length - 1
//     ];
//   const Order = useSelector(PurchaseOrder).find(
//     (el) => el.purchase_orders_id == location
//   );
//   const [list, setlist] = useState(
//     Order.status == "Receive"
//       ? Order.purchaseorderitem.map((el) => ({
//           purchase_order_items_id: el.purchase_order_items_id,
//           version_name: el.version_name,
//           quantity: el.quantity,
//           purchase_price: el.purchase_price,
//           sizeEnum: el.sizeEnum,
//           color: el.color,
//           quantity_real: el.quantity_real,
//           Percentage: 0,
//           price_real: 0,
//           variant: el.variant,
//           productID: el.productID,
//           productVersion: el.productVersion,
//         }))
//       : Order.purchaseorderitem.map((el) => ({
//           purchase_order_items_id: el.purchase_order_items_id,
//           version_name: el.version_name,
//           quantity: el.quantity,
//           purchase_price: el.purchase_price,
//           sizeEnum: el.sizeEnum,
//           color: el.color,
//           quantity_real: 0,
//           Percentage: 0,
//           price_real: 0,
//           variant: el.variant,
//           productID: el.productID,
//           productVersion: el.productVersion,
//         }))
//   );

//   // setlist(arr1)
//   const handleImport = async () => {
//     setloading(true);
//     await dispatch(ImportPurchase({ data: list, id: location }));
//     setloading(false)
//     navigate("/Product/Import");
//     setTimeout(() => {
//       toast.success("Action Change Complete", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//       });
//     }, 500);
//   };
//   return (
//     <div className="w-[1250px] h-full flex flex-row">
//       <div className="w-[80%] h-full flex flex-col">
//         <div className="w-full flex flex-row">
//           <div>
//             <Button
//               onClick={() => {
//                 const arr = Order.purchaseorderitem.map(
//                   (el) => el.purchase_order_items_id
//                 );
//                 if (selected.length == 0) {
//                   setselected(arr);
//                 } else {
//                   setselected([]);
//                 }
//               }}
//             >
//               Select All
//             </Button>
//           </div>
//         </div>
//         <div>
//           <Table
//             bottomContent={
//               <div className="flex w-full justify-center">
//                 <Pagination
//                   isCompact
//                   showControls
//                   showShadow
//                   color="secondary"
//                   className="text-blue-500 border-slate-400 rounded-md"
//                   page={number}
//                   total={Math.ceil(Order.purchaseorderitem.length / 7)}
//                   onChange={(page) => setnumber(page)}
//                 />
//               </div>
//             }
//             aria-label="Example table with custom cells"
//             color={"secondary"}
//             selectionMode="single"
//             defaultSelectedKeys={["2"]}
//             className="bg-white shadow-md rounded-md w-full border-[2px] border-slate-300"
//           >
//             <TableHeader
//               columns={columns}
//               className="w-full flex flex-row justify-center"
//             >
//               {(column) => (
//                 <TableColumn
//                   key={column.uid}
//                   align={column.uid === "actions" ? "center" : "start"}
//                   className="text-[#71717a] bg-[#f4f4f5] p-3 text-center"
//                 >
//                   {column.name}
//                 </TableColumn>
//               )}
//             </TableHeader>
//             <TableBody>
//               {list
//                 .slice((number - 1) * 7, (number - 1) * 7 + 7)
//                 .map((el, index) => (
//                   <TableRow
//                     key={index}
//                     className="hover:bg-blue-100"
//                     onClick={() => {
//                       const isExist = selected.find(
//                         (el1) => el1 === el.purchase_order_items_id
//                       );
//                       if (isExist) {
//                         const arr = selected.filter(
//                           (el1) => el1 != el.purchase_order_items_id
//                         );
//                         setselected(arr);
//                       } else {
//                         setselected([...selected, el.purchase_order_items_id]);
//                       }
//                     }}
//                   >
//                     <TableCell>
//                       <Checkbox
//                         isSelected={selected.find(
//                           (el1) => el1 === el.purchase_order_items_id
//                         )} // Update this as needed
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.purchase_order_items_id}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.version_name}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.quantity}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.purchase_price}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.sizeEnum}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div
//                         className="p-2 justify-center flex w-16 h-10 rounded-xl"
//                         style={{ backgroundColor: el.color }}
//                       ></div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.quantity_real}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.Percentage}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="p-2 justify-center flex">
//                         {el.price_real}
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       <div className="w-[20%] flex flex-col h-full gap-4">
//         <div>
//           <Textarea
//             onChange={(e) => {
//               setquantity(e.target.value);
//             }}
//             value={quantity}
//             labelPlacement="outside"
//             placeholder="Enter Quantity real"
//             className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
//           />
//           <Button
//             onClick={() => {
//               if (parseInt(quantity) == quantity || quantity === "100%") {
//                 if (parseInt(quantity) > 0) {
//                   const arr = list.map((el) => {
//                     if (selected.includes(el.purchase_order_items_id)) {
//                       if (el.quantity < quantity && quantity !== "100%") {
//                         setTimeout(() => {
//                           toast.error(
//                             `Quantity_real of ${el.purchase_order_items_id} is illegal`,
//                             {
//                               position: "top-right",
//                               autoClose: 2000,
//                               hideProgressBar: false,
//                               closeOnClick: true,
//                               pauseOnHover: false,
//                               draggable: true,
//                               progress: undefined,
//                             }
//                           );
//                         }, 500);
//                         return el;
//                       } else {
//                         return {
//                           ...el,
//                           quantity_real:
//                             quantity === "100%" ? el.quantity : quantity,
//                         };
//                       }
//                     }
//                     return el;
//                   });
//                   setlist(arr);
//                   setquantity("");
//                 } else {
//                   setTimeout(() => {
//                     toast.info(`Quantity_real is illegal`, {
//                       position: "top-right",
//                       autoClose: 2000,
//                       hideProgressBar: false,
//                       closeOnClick: true,
//                       pauseOnHover: false,
//                       draggable: true,
//                       progress: undefined,
//                     });
//                   }, 500);
//                 }
//               } else {
//                 setTimeout(() => {
//                   toast.info(`Enter quantity_real number`, {
//                     position: "top-right",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                   });
//                 }, 500);
//               }
//             }}
//           >
//             Update Quantity real
//           </Button>
//         </div>
//         <div>
//           <Textarea
//             onChange={(e) => {
//               setprice(e.target.value);
//             }}
//             value={price}
//             labelPlacement="outside"
//             placeholder="Enter your Percentage Price"
//             className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
//           />
//           <Button
//             onClick={() => {
//               const priceInt = parseInt(price);
//               if (price != "") {
//                 if (priceInt >= 0 && priceInt <= 100) {
//                   const arr = list.map((el) => {
//                     if (selected.includes(el.purchase_order_items_id)) {
//                       console.log(el.quantity_real);
//                       if (el.quantity_real != 0) {
//                         return {
//                           ...el,
//                           Percentage: price,
//                           price_real:
//                             el.purchase_price * (parseInt(price) / 100) +
//                             el.purchase_price,
//                         };
//                       } else {
//                         setTimeout(() => {
//                           toast.info(`Percentage price is illegal`, {
//                             position: "top-right",
//                             autoClose: 2000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: false,
//                             draggable: true,
//                             progress: undefined,
//                           });
//                         }, 500);
//                         return el;
//                       }
//                     }
//                     return el;
//                   });
//                   setlist(arr);
//                   setquantity("");
//                 } else {
//                   setTimeout(() => {
//                     toast.info(`Percentage price is illegal`, {
//                       position: "top-right",
//                       autoClose: 2000,
//                       hideProgressBar: false,
//                       closeOnClick: true,
//                       pauseOnHover: false,
//                       draggable: true,
//                       progress: undefined,
//                     });
//                   }, 500);
//                 }
//               } else {
//                 setTimeout(() => {
//                   toast.info(`Enter a valid percentage price`, {
//                     position: "top-right",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                   });
//                 }, 500);
//               }
//             }}
//           >
//             Select Price Sale
//           </Button>
//         </div>
//         <div>
//         {loading ? (
//                 <Button
//                   aria-label="Loading Button"
//                   isLoading
//                   className="bg-blue-500 text-white font-bold"
//                   color="secondary"
//                   spinner={
//                     <svg
//                       className="animate-spin h-5 w-5 text-current"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                   }
//                 >
//                   Loading
//                 </Button>
//               ) : (
//                 <Button
//                   aria-label="Action Order Delivery"
//                   color="primary"
//                   className="border-[2px] border-green-400 bg-green-200 text-green-500"
//                   onPress={handleImport}
//                 >
//                   Confirm
//                 </Button>
//               )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Fixproduct;
import React, { useState, useCallback } from "react";
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
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { ChevronDownIcon } from "../Custumer/ChevronIcon";
import { capitalize } from "../Custumer/Utils";
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { product, PurchaseOrder } from "../Redux/selector";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
const columns = [
  // { name: "", uid: "btn" },
  { name: "NAME", uid: "version_name", sortable: true },
  { name: "Style", uid: "style", sortable: true },
  { name: "Quantity", uid: "quantity", sortable: true },
  { name: "", uid: "icon" },
  { name: "Quant_Real", uid: "quantity_real", sortable: true },
  { name: "Price", uid: "purchase_price", sortable: true },
  { name: "Percentage", uid: "Percentage" },
  { name: "", uid: "iconPrice" },
  { name: "Price_Real", uid: "price_real", sortable: true },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "version_name",
  "btn",
  "iconPrice",
  "price_real",
  "Percentage",
  "purchase_price",
  "quantity",
  "icon",
  "quantity_real",
  "style",
  "role",
  "status",
  "actions",
];

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [newArray, setnewArray] = useState(new Array());
  console.log(selectedKeys);
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

  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const Order = useSelector(PurchaseOrder).find(
    (el) => el.purchase_orders_id == location
  );

  const Product = useSelector(product);
  const [users, setuser] = useState(
    Order.status == "Receive"
      ? Order.purchaseorderitem.map((el) => ({
          purchase_order_items_id: el.purchase_order_items_id,
          version_name: el.version_name,
          quantity: el.quantity,
          purchase_price: el.purchase_price,
          sizeEnum: el.sizeEnum,
          avatar: Product.find((el1) => el1.product_id == el.productID)
            .imagesMap[0].image_urlString,
          color: el.color,
          flat: false,
          quantity_real: el.quantity_real,
          Percentage:
            parseFloat(
              (el.purchase_price_sale - el.purchase_price) / el.purchase_price
            ) *
              100 +
            "%",
          price_real: el.purchase_price_sale,
          variant: el.variant,
          productID: el.productID,
          productVersion: el.productVersion,
        }))
      : Order.purchaseorderitem.map((el) => ({
          purchase_order_items_id: el.purchase_order_items_id,
          version_name: el.version_name,
          quantity: el.quantity,
          purchase_price: el.purchase_price,
          sizeEnum: el.sizeEnum,
          avatar: Product.find((el1) => el1.product_id == el.productID)
            .imagesMap[0].image_urlString,
          color: el.color,
          quantity_real: 0,
          flat: false,
          Percentage: 0,
          price_real: 0,
          variant: el.variant,
          productID: el.productID,
          productVersion: el.productVersion,
        }))
  );
  const handleChange = (key) => {
    setSelectedKeys(key);
    if (key == "all") {
      const arr = users.map((user) => user.purchase_order_items_id);

      setnewArray(arr);
    } else {
      const arr=Array.from(key).map((el)=>parseInt(el))
      console.log(arr);
      setnewArray(arr);
      console.log(newArray)
    }
    console.log(Array.from(key));
  };
  const handleClickFull = () => {
    console.log(newArray)
    const arr = users.map((el) =>
      newArray.includes(el.purchase_order_items_id)
        ? {
            ...el,
            quantity_real: el.quantity,
          }
        : el
    );
    console.log(arr)
    setuser(arr)
  };
  console.log(selectedKeys);
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

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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

  const renderCell = useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "version_name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={<div className="text-md">{cellValue}</div>}
              name={user.productID}
            />
          );
        case "style":
          return (
            <div className="flex flex-row w-full items-center font-bold">
              {user.sizeEnum}/
              <div
                style={{ backgroundColor: user.color }}
                className="ml-1 rounded-lg w-8 h-5"
              ></div>
            </div>
          );
        case "quantity_real":
          return (
            <div className="flex justify-start text-blue-300">{cellValue}</div>
          );
        case "price_real":
          return (
            <div className="flex justify-start text-green-300">
              {cellValue.toLocaleString("vi-VN")} vnđ
            </div>
          );
        case "icon":
          return <FontAwesomeIcon icon={faArrowRightToBracket} />;
        case "iconPrice":
          return <FontAwesomeIcon icon={faEquals} />;
        case "purchase_price":
          return <div>{cellValue.toLocaleString("vi-VN")} vnđ</div>;
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
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [selectedKeys]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              endContent={<FontAwesomeIcon icon={faCheckCircle} />}
              onPress={handleClickFull}
              variant="flat"
            >
              Full
            </Button>

            <Button
              endContent={<ChevronDownIcon className="text-small" />}
              variant="flat"
            >
              Columns
            </Button>
            <Button
              color="primary"
              endContent={<FontAwesomeIcon icon={faPlus} />}
            >
              Add New
            </Button>
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

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
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
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        //table: "border-[2px] border-slate-300 rounded-lg",
        thead: "bg-slate-200 rounded-t-lg",
        tbody: "rounded-b-lg",
        //td: "border-b-[2px] border-slate-200 p-3",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={handleChange}
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
          <TableRow key={item.purchase_order_items_id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey, item.purchase_order_items_id)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
