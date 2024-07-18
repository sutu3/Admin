import {
  Button,
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PurchaseOrder } from "../Redux/selector";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ImportPurchase } from "../Redux/PurchaseSlice";
const columns = [
  { name: "", uid: "checkbox" },
  { name: "ID", uid: "idItem" },
  { name: "Name", uid: "name" },
  { name: "Quantity", uid: "quantity" },
  { name: "Price", uid: "price" },
  { name: "Size", uid: "size" },
  { name: "Color", uid: "color" },
  { name: "Quantity_real", uid: "quantity_real" },
  { name: "Percentage", uid: "Percentage" },
  { name: "Price_sale", uid: "price_sale" },
];
const Fixproduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setloading]=useState(false)
  const [number, setnumber] = useState(1);
  const [selected, setselected] = useState([]);
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
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
          color: el.color,
          quantity_real: el.quantity_real,
          Percentage: 0,
          price_real: 0,
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
          color: el.color,
          quantity_real: 0,
          Percentage: 0,
          price_real: 0,
          variant: el.variant,
          productID: el.productID,
          productVersion: el.productVersion,
        }))
  );

  // setlist(arr1)
  const handleImport = async () => {
    setloading(true);
    await dispatch(ImportPurchase({ data: list, id: location }));
    setloading(false)
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
    <div className="w-[1250px] h-full flex flex-row">
      <div className="w-[80%] h-full flex flex-col">
        <div className="w-full flex flex-row">
          <div>
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
                  color="secondary"
                  className="text-blue-500 border-slate-400 rounded-md"
                  page={number}
                  total={Math.ceil(Order.purchaseorderitem.length / 7)}
                  onChange={(page) => setnumber(page)}
                />
              </div>
            }
            aria-label="Example table with custom cells"
            color={"secondary"}
            selectionMode="single"
            defaultSelectedKeys={["2"]}
            className="bg-white shadow-md rounded-md w-full border-[2px] border-slate-300"
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
                .slice((number - 1) * 7, (number - 1) * 7 + 7)
                .map((el, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-blue-100"
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
                      <div className="p-2 justify-center flex">
                        {el.purchase_order_items_id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.version_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.quantity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.purchase_price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.sizeEnum}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="p-2 justify-center flex w-16 h-10 rounded-xl"
                        style={{ backgroundColor: el.color }}
                      ></div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.quantity_real}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.Percentage}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2 justify-center flex">
                        {el.price_real}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-[20%] flex flex-col h-full gap-4">
        <div>
          <Textarea
            onChange={(e) => {
              setquantity(e.target.value);
            }}
            value={quantity}
            labelPlacement="outside"
            placeholder="Enter Quantity real"
            className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
          />
          <Button
            onClick={() => {
              if (parseInt(quantity) == quantity || quantity === "100%") {
                if (parseInt(quantity) > 0) {
                  const arr = list.map((el) => {
                    if (selected.includes(el.purchase_order_items_id)) {
                      if (el.quantity < quantity && quantity !== "100%") {
                        setTimeout(() => {
                          toast.error(
                            `Quantity_real of ${el.purchase_order_items_id} is illegal`,
                            {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                            }
                          );
                        }, 500);
                        return el;
                      } else {
                        return {
                          ...el,
                          quantity_real:
                            quantity === "100%" ? el.quantity : quantity,
                        };
                      }
                    }
                    return el;
                  });
                  setlist(arr);
                  setquantity("");
                } else {
                  setTimeout(() => {
                    toast.info(`Quantity_real is illegal`, {
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
                setTimeout(() => {
                  toast.info(`Enter quantity_real number`, {
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
            }}
          >
            Update Quantity real
          </Button>
        </div>
        <div>
          <Textarea
            onChange={(e) => {
              setprice(e.target.value);
            }}
            value={price}
            labelPlacement="outside"
            placeholder="Enter your Percentage Price"
            className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
          />
          <Button
            onClick={() => {
              const priceInt = parseInt(price);
              if (price != "") {
                if (priceInt >= 0 && priceInt <= 100) {
                  const arr = list.map((el) => {
                    if (selected.includes(el.purchase_order_items_id)) {
                      console.log(el.quantity_real);
                      if (el.quantity_real != 0) {
                        return {
                          ...el,
                          Percentage: price,
                          price_real:
                            el.purchase_price * (parseInt(price) / 100) +
                            el.purchase_price,
                        };
                      } else {
                        setTimeout(() => {
                          toast.info(`Percentage price is illegal`, {
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
                  setlist(arr);
                  setquantity("");
                } else {
                  setTimeout(() => {
                    toast.info(`Percentage price is illegal`, {
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
                setTimeout(() => {
                  toast.info(`Enter a valid percentage price`, {
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
            }}
          >
            Select Price Sale
          </Button>
        </div>
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
                <Button
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
  );
};

export default Fixproduct;
