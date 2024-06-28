import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { product, purchaseitem, PurchaseOrder } from "../Redux/selector.jsx";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import PurchaseSlice, {
  DeletePurchaseItem,
  PurchaseItem1,
  UpdateQuality,
} from "../Redux/PurchaseSlice.jsx";
import { faShop } from "@fortawesome/free-solid-svg-icons";
const columns = [
  { name: "", uid: "checkbox" }, // Thêm cột cho checkbox
  { name: "Varient", uid: "varient" },
  { name: "Name", uid: "name" },
  { name: "Quanlity", uid: "quanlity" },
  { name: "Price", uid: "price" },
];

const Purchar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OrderPurchase = useSelector(PurchaseOrder);
  const OrderPrepare = OrderPurchase.filter((el) => el.status == "Prepare");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const list =
    OrderPrepare.length != 0
      ? OrderPrepare[0].purchaseorderitem.filter((el) => el.productID == id)
      : [];
  console.log(list);
  const Item = useSelector(purchaseitem).find((el) => el.productid == id);
  const item = Item ? Item.details : [];
  const Product = useSelector(product);
  const [color, setcolor] = useState([]);
  const [color1, setcolor1] = useState({});
  const [selected, setSelected] = useState([]);
  const [basePrice, setbasePrice] = useState("");
  const [quanlity, setquanlity] = useState("");
  console.log(quanlity);
  const [loading, setloading] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const handleDelete = async () => {
    setloading2(true);
    selected.map(async(el)=>{
      await dispatch(DeletePurchaseItem(el));
    })
    setSelected([])
    setloading2(false)
    onclose();
  };
  const handleOpen=()=>{
    if (selected.length != 0) {
                onOpen();
              } else {
                toast.error("Please select product", {
                  position: "top-right",
                  autoClose: 1500, // Close after 1 second
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              }
  }
  const hanldclickadd = async () => {
    setloading(true);
    if (color.length == 0) {
      setloading(false);
      toast.info("You Must be choose Size to create purchase", {
        position: "top-right",
        autoClose: 2000, // Close after 1 second
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (!color1.color) {
        setloading(false);
        toast.info("You Must be choose Color to create purchase", {
          position: "top-right",
          autoClose: 2000, // Close after 1 second
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (quanlity == "" && basePrice == "") {
          setloading(false);
          toast.error("Has Value undefined", {
            position: "top-right",
            autoClose: 1500, // Close after 1 second
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          const data = dataProduct[0].categories.find(
            (el1) => el1.sizeEnum == arr && el1.color == color1.color
          );
          console.log(data);
          const index = list.findIndex(
            (el) => el.color == data.color && el.sizeEnum == data.sizeEnum
          );
          console.log(index);
          if (index == -1) {
            setloading(true);
            await dispatch(
              PurchaseItem1({
                product: dataProduct[0].product_id,
                version_name: dataProduct[0].name,
                price_base: dataProduct[0].categories.find(
                  (el1) => el1.sizeEnum == arr && el1.color == color1.color
                ).price_base,
                quanlity_in_stock:
                  list.reduce((acc, el) => {
                    return acc + el.quantity;
                  }, 0) + parseInt(quanlity),
                colorid: dataProduct[0].categories.find(
                  (el1) => el1.sizeEnum == arr && el1.color == color1.color
                ).catetoryColor,
                sizeid: dataProduct[0].categories.find(
                  (el1) => el1.sizeEnum == arr && el1.color == color1.color
                ).catetorySize,
                quanlity: quanlity,
              })
            );
            setloading(false);
            toast.success(
              `Product ${dataProduct[0].name} Size ${arr}/${color1.color} has been Create`,
              {
                position: "top-right",
                autoClose: 1500, // Close after 1 second
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );
            setloading(false);
          } else {
            const item1 = list[index];
            console.log(item1);
            setloading(false);

            await dispatch(
              UpdateQuality({
                productVersion: item1.productVersion,
                version_name: item1.version_name,
                colorID: dataProduct[0].categories.find(
                  (el1) => el1.sizeEnum == arr && el1.color == color1.color
                ).catetoryColor,
                sizeID: dataProduct[0].categories.find(
                  (el1) => el1.sizeEnum == arr && el1.color == color1.color
                ).catetorySize,
                quantity_in_stock:
                  list.reduce((acc, el) => {
                    return acc + el.quantity;
                  }, 0) + parseInt(quanlity - item1.quantity),
                product: item1.productID,
                purchase_order_items_id: item1.purchase_order_items_id,
                quantity: quanlity,
                purchase_price: item1.purchase_price,
                purchaseOrder: item1.purchaseOrder,
                variant: item1.variant,
              })
            );
            setloading(true);
            toast.success(
              `Product ${dataProduct[0].name} Size ${arr}/${color1.color} has been Update quanlity`,
              {
                position: "top-right",
                autoClose: 1500, // Close after 1 second
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );

            setloading(false);
          }
        }
      }
    }
  };
  const dataProduct = Product.filter((el) => el.product_id == id);
  const [arr, setArr] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full h-[50px] flex flex-row justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FontAwesomeIcon
            icon={faShop}
            onClick={() => {
              navigate("/Product/Add");
            }}
            className="pr-3 hover:text-[#74c0fc] transition duration-200 ease-in-out"
          />
          Import Product
        </div>
        <div className="flex flex-row h-full gap-2 mr-5 items-center">
          <Button
            radius="full"
            onPress={handleOpen}
            className={`shadow-lg bg-white text-red-400 border-[3px] border-red-400 hover:text-white hover:bg-red-400 hover:border-white text-sm`}
          >
            Delete Import
          </Button>
          {loading ? (
            <Button
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
              onPress={hanldclickadd}
              radius="full"
              className={`shadow-lg bg-white text-green-400 border-[3px] border-green-400 hover:text-white hover:bg-green-400 hover:border-white text-sm`}
            >
              Add Import
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-row w-[800px] h-full ">
        <div className=" w-[90%] bg-transparent h-full p-5 flex flex-col gap-5">
          <div className="bg-[#f9f9f9] p-5 w-full h-full flex flex-col rounded-md shadow-md">
            <div className="font-bold text-lg mb-2 flex justify-start">
              General Information
            </div>
            <div className="mb-4">
              <div className="text-left text-[#616264] font-mono">
                Name Product
              </div>
              <Textarea
                isDisabled
                labelPlacement="outside"
                placeholder="Enter your description"
                defaultValue={dataProduct[0].name}
                value={dataProduct[0].name}
                className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <div className="text-left text-[#616264] font-mono">
                Description Product
              </div>
              <Textarea
                isDisabled
                labelPlacement="outside"
                placeholder="Enter your description"
                defaultValue={dataProduct[0].description}
                value={dataProduct[0].description}
                className="w-full text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-1/2">
                <div className="font-semibold justify-start flex w-full">
                  Size
                </div>
                <div className="text-xs font-[400] text-[#8d8f92] justify-start flex w-full">
                  Pink Available Size
                </div>
                <div className="flex flex-row gap-3">
                  {dataProduct[0].sizes.map((el, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        console.log(el.colors[0].color);
                        setcolor(el.colors);
                        setcolor1({});
                        setbasePrice("");
                        setquanlity("");
                        setArr(el.size);
                      }}
                      className={`w-14 h-12 ${
                        arr == el.size
                          ? "border-0 bg-green-300 text-white"
                          : "outline-none bg-[#ededed]"
                      } active::outline-none rounded`}
                    >
                      {el.size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-1/2">
                <div className="font-semibold justify-start flex w-full">
                  Gender
                </div>
                <div className="text-xs font-[400] text-[#8d8f92] justify-start flex w-full">
                  Available Gender
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <button
                      disabled
                      className={` ${
                        dataProduct[0].gender === "Nam"
                          ? "bg-[#86efac] text-white"
                          : " border-2 border-slate-300"
                      }  w-14 h-12 flex justify-center`}
                    >
                      Nam
                    </button>
                  </div>
                  <div>
                    <button
                      disabled
                      className={`${
                        dataProduct[0].gender === "Nữ"
                          ? "bg-[#86efac] text-white"
                          : "border-2 border-slate-300"
                      } w-14 h-12 flex justify-center`}
                    >
                      Nữ
                    </button>
                  </div>
                  <div>
                    <button
                      disabled
                      className={`${
                        dataProduct[0].gender === "Unisex"
                          ? "bg-[#86efac] text-white"
                          : " border-2 border-slate-300"
                      } w-14 h-12 flex justify-center`}
                    >
                      Khác
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {color != "" && (
            <div className="bg-[#f9f9f9] p-5 w-full h-full flex flex-col rounded-md shadow-md">
              <div className="font-bold text-lg mb-2 flex justify-between w-full">
                <div>Pricing and Stock</div>
                <div className="w-1/2 flex flex-row gap-3 ">
                  {color.map((el, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        console.log(el);
                        setcolor1(el);
                      }}
                      className={`w-10 h-10 text-xs flex items-center bg-[${el.color}]`}
                      style={{ backgroundColor: el.color }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-5">
                <div className=" w-full flex flex-row gap-3 justify-between">
                  <div>
                    <Input
                      value={
                        color1.color
                          ? dataProduct[0].categories.find(
                              (el1) =>
                                el1.sizeEnum == arr && el1.color == color1.color
                            ).price_base
                          : 0
                      }
                      //const price=dataProduct.categories.map((el)=>el.color1==color&& el.sizeEnum && el.price_base)
                      onChange={(e) => {
                        setbasePrice(e.target.value);
                      }}
                      className={
                        "bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"
                      }
                      type="text"
                      label={
                        <span className="pb-8  inline-block">Base Pricing</span>
                      }
                      placeholder="Your Pricing"
                    />
                  </div>
                  <div>
                    <Input
                      disabled
                      value={
                        color1.color ? color1.variants[0].quanlity_in_stock : ""
                      }
                      className={
                        "bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"
                      }
                      type="text"
                      label={
                        <span className="pb-8  inline-block">
                          Stock in Store /300
                        </span>
                      }
                      placeholder="your Stock in Store"
                    />
                  </div>
                </div>
                <div className=" w-full h-full flex flex-row gap-3 justify-between">
                  <div>
                    <Input
                      value={quanlity}
                      onChange={(e) => {
                        setquanlity(e.target.value);
                      }}
                      className={
                        "bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"
                      }
                      type="text"
                      label={
                        <span className="pb-8  inline-block">Quanlity</span>
                      }
                      placeholder="Enter your quanlity"
                    />
                  </div>
                  <div className="h-full w-full items-center justify-center">
                    <div>Giá của sản phẩm</div>
                    <div>
                      {parseInt(basePrice) && parseInt(quanlity)
                        ? parseInt(basePrice) * parseInt(quanlity)
                        : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-[#f9f9f9] p-5 w-full h-full justify-between flex flex-col rounded-md shadow-md">
          <div className="flex w-[500px] flex-col gap-3">
            <Button
              onPress={() => {
                if (list.length != 0) {
                  const arr1 = list.map((el) => el.purchase_order_items_id);
                  setSelected(arr1);
                }
              }}
              radius="lg"
              className={`border-2 p-2 border-[#5eb2f6] bg-[#FFFFFF] font-mono w-28 hover:border-white text-[#1A202C] text-sm hover:text-white  hover:bg-[#88c1ff]`}
            >
              Select All
            </Button>
            <Table
              color={"secondary"}
              selectionMode="single"
              defaultSelectedKeys={["2"]}
              aria-label="Example static collection table"
              className="bg-white shadow-md rounded-md border-[2px] border-slate-300"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    className="text-[#71717a] bg-[#f4f4f5] p-3"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {list.map((el, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-blue-100"
                    onClick={() => {
                      const colors = dataProduct[0].sizes.filter(
                        (el1) => el1.size === el.sizeEnum
                      );
                      const color = colors[0].colors.filter(
                        (el1) => el1.color == el.color
                      );
                      console.log(color);
                      setcolor(colors[0].colors);
                      setcolor1(color[0]);
                      setbasePrice(el.purchase_price);
                      setquanlity(el.quantity);
                      setArr(el.sizeEnum);
                      if (selected.includes(el.purchase_order_items_id)) {
                        setSelected(
                          selected.filter(
                            (el1) => el1 != el.purchase_order_items_id
                          )
                        );
                      } else {
                        setSelected([...selected, el.purchase_order_items_id]);
                      }
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        isSelected={selected.includes(
                          el.purchase_order_items_id
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      {el.sizeEnum}/{el.color}
                    </TableCell>
                    <TableCell>{dataProduct[0].name}</TableCell>
                    <TableCell>{el.quantity}</TableCell>
                    <TableCell>{el.purchase_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose} // Use onClose to close the modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="bg-white border-[2px] rounded-xl border-slate-500">
          <ModalHeader className="flex flex-col gap-1">
            Do you want to delete Item
          </ModalHeader>
          <ModalBody>
            <div>
              {list.map(
                (el) =>
                  selected.includes(el.purchase_order_items_id) && (
                    <div
                      key={el.purchase_order_items_id}
                      className="border-b-2 border-slate-300"
                    >
                      <p>Name: {el.nameProduct}</p>
                      <p> id: {el.purchase_order_items_id}</p>
                      <p>
                        size/Color: {el.sizeEnum}/{el.color}
                      </p>
                      <p>quantity: {el.quantity}</p>
                    </div>
                  )
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              className="border-[2px] border-red-400 text-red-500 bg-white"
              onPress={onClose}
            >
              Close
            </Button>
            {loading2 ? (
              <Button
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
                color="primary"
                className="border-[2px] border-green-400 bg-green-200 text-green-500"
                onPress={handleDelete}
              >
                DELETE ALL
              </Button>
            )}
            {/* <ToastContainer /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Purchar;
