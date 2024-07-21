import {
  Button,
  Checkbox,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faPlus,faPercent,
  faTrash,faFileImport,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { product, PurchaseOrder } from "../Redux/selector";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ImportPurchase } from "../Redux/PurchaseSlice";
import { faCheckCircle, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ChevronDownIcon } from "../Custumer/ChevronIcon";
import { ProductFecth } from "../Redux/ProductSlice";
const columns = [
  { name: "", uid: "checkbox" },
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
const Fixproduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [number, setnumber] = useState(1);
  const Product = useSelector(product);
  const [selected, setselected] = useState([]);
  console.log(selected);
  const [value, setvalue] = useState("");
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const Order = useSelector(PurchaseOrder).find(
    (el) => el.purchase_orders_id == location
  );
  const [list, setlist] = useState(
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
  const handleClickFull = () => {
    const arr = list.map((el) =>
      selected.includes(el.purchase_order_items_id)
        ? { ...el, quantity_real: el.quantity }
        : el
    );
    setlist(arr);
  };
  
const handleClickpercent = () => {
  const arr = list.map((el) => {
    if (selected.includes(el.purchase_order_items_id)) {
      const parsedValue = parseFloat(value);
      if (parsedValue > 0 && parsedValue < 100) {
        const newPriceReal = el.purchase_price + (el.purchase_price * parsedValue) / 100;
        return { ...el, Percentage: parsedValue, price_real: (newPriceReal) };
      } else {
        setTimeout(() => {
          toast.info("Phần trăm tiền lời không hợp lệ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }, 500);
        return el;
      }
    }
    return el;
  });
  setvalue('');
  setlist(arr);
};
  const handleClickupdateQuantity = () => {
  const arr = list.map((el) => {
    if (selected.includes(el.purchase_order_items_id)) {
      if (el.quantity >= parseInt(value)) {
        return { ...el, quantity_real: parseInt(value) };
      } else {
        setTimeout(() => {
          toast.info("Số lượng không hợp lệ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }, 500);
        return el;
      }
    }
    return el;
  });

  setvalue('');
  setlist(arr);
};
  const onClear = React.useCallback(() => {
    setvalue("");
    // setPage(1);
  }, []);
  // setlist(arr1)
  const handleImport = async () => {
    setloading(true);
    await dispatch(ImportPurchase({ data: list, id: location }));
    await dispatch(ProductFecth())
    setloading(false);
    navigate("/Product/Import");
    setTimeout(() => {
      toast.success("Action Change Complete", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }, 500);
  };
  return (
    <div className="w-[1200px] h-full flex flex-row">
      <div className="w-[100%] h-full flex flex-col">
        <div className="w-full flex flex-row">
          <div className="flex flex-row gap-2 ml-4">
            <Button
              onClick={() => {
                const arr = Order.purchaseorderitem.map(
                  (el) => el.purchase_order_items_id
                );
                if (selected.length == 0) {
                  setselected(arr);
                } else {
                  setselected([]);
                }
              }}
            >
              Select All
            </Button>
            <div>
          {loading ? (
            <Button
              aria-label="Loading Button"
              isLoading
              className="bg-blue-500 text-white font-bold"
              color="secondary"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              Loading
            </Button>
          ) : (
            Order.status != "Receive"&&<Button
              aria-label="Action Order Delivery"
              color="primary"
              className="border-[2px] border-green-400 bg-green-200 text-green-500"
              onPress={handleImport}
            >
              Confirm
            </Button>
            
          )}
        </div>
          </div>
        </div>
        <div>
          <Table
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  classNames={{
                    cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl ",
                  }}
                  color="secondary"
                  // className="text-blue-500 border-slate-400 rounded-md"
                  page={number}
                  total={Math.ceil(Order.purchaseorderitem.length / 5)}
                  onChange={(page) => setnumber(page)}
                />
              </div>
            }
            classNames={{
              //table: "border-[2px] border-slate-300 rounded-lg",
              thead: "bg-slate-200 rounded-t-lg",
              tbody: "rounded-b-lg",
              //td: "border-b-[2px] border-slate-200 p-3",
            }}
            aria-label="Example table with custom cells"
            color={"secondary"}
            topContent={
              Order.status == "Receive"?<div></div>:
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                  <Input
                    isClearable
                    type="number"
                    className="w-full sm:max-w-[44%] border-[2px] border-slate-200 rounded-md"
                    placeholder="Enter Value ..."
                    startContent={<FontAwesomeIcon icon={faFileImport} />}
                    value={value}
                    onClear={() => onClear()}
                    onValueChange={setvalue}
                  />
                  <div className="flex gap-3">
                    <Button
                      endContent={<FontAwesomeIcon icon={faCheckCircle} />}
                      onPress={handleClickFull}
                      variant="flat"
                      className="border-[2px] border-slate-400"
                    >
                      Full Quantity
                    </Button>

                    <Button
                      endContent={<FontAwesomeIcon icon={faPenToSquare} />}
                      variant="flat"
                      onPress={handleClickupdateQuantity}
                      className="border-[2px] border-slate-400"
                    >
                      Update Quantity
                    </Button>
                    <Button
                      color="primary"
                      endContent={<FontAwesomeIcon icon={faPercent} />}
                      onPress={handleClickpercent}
                      className="border-[2px] border-slate-400"
                    >
                      percent profit
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-400 text-small">
                    Total {list.length} users
                  </span>
                </div>
              </div>
            }
            selectionMode="single"
            defaultSelectedKeys={["2"]}
            // className="bg-white shadow-md rounded-md w-full border-[2px] border-slate-300"
          >
            <TableHeader
              columns={columns}
              className="w-full flex flex-row justify-center"
            >
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="text-[#71717a] bg-[#f4f4f5] p-3 text-center"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {list
                .slice((number - 1) * 5, (number - 1) * 5 + 5)
                .map((el, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-blue-50 duration-150 transition ease-in-out"
                    onClick={() => {
                      const isExist = selected.find(
                        (el1) => el1 === el.purchase_order_items_id
                      );
                      if (isExist) {
                        const arr = selected.filter(
                          (el1) => el1 != el.purchase_order_items_id
                        );
                        setselected(arr);
                      } else {
                        setselected([...selected, el.purchase_order_items_id]);
                      }
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        isSelected={selected.find(
                          (el1) => el1 === el.purchase_order_items_id
                        )} // Update this as needed
                      />
                    </TableCell>
                    <TableCell>
                      <User
                        avatarProps={{ radius: "lg", src: el.avatar }}
                        description={
                          <div className="text-md">{el.version_name}</div>
                        }
                        name={el.productID}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row w-full items-center font-bold">
                        {el.sizeEnum}
                        <div
                          style={{ backgroundColor: el.color }}
                          className="ml-1 rounded-lg w-8 h-5"
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.quantity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <FontAwesomeIcon icon={faArrowRightToBracket} />;
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex text-blue-400">
                        {el.quantity_real}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.purchase_price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className=" justify-end w-full -translate-x-10 flex">
                        {el.Percentage}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <FontAwesomeIcon icon={faEquals} />
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex text-green-400">
                        {el.price_real}
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

export default Fixproduct;
