import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { product } from "../Redux/selector.jsx";
import CreatePurchaseItem from "../Redux/PurchaseSlice.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
const columns = [
  { name: "", uid: "checkbox" }, // Thêm cột cho checkbox
  { name: "Varient", uid: "varient" },
  { name: "Name", uid: "name" },
  { name: "Quanlity", uid: "quanlity" },
  { name: "Price", uid: "price" },
];
const data = [
  {
    varient: "M/red",
    name: "T-Shirt",
    quanlity: 10,
    price: 100000,
  },
];

const Purchar = () => {
    const dispatch=useDispatch()
  const id =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const Product = useSelector(product);
  const [color, setcolor] = useState([]);
  const [color1, setcolor1] = useState({});
  const [basePrice, setbasePrice] = useState("");
  const [quanlity, setquanlity] = useState("");
  const [loading, setloading] = useState(false);
  const hanldclickadd = async() => {
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
        }
        else{
            await dispatch(CreatePurchaseItem({
                product:dataProduct[0].product_id,
                version_name:dataProduct[0].name,
                quantity_in_stock:2
                // tổng số lượng của các product,
            }))
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
          <FontAwesomeIcon icon={faShop} className="pr-3" />
          Import Product
        </div>
        <div className="flex flex-row h-full gap-2 mr-5 items-center">
          <Button
            radius="full"
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
                        color1.color ? color1.variants[0].quantity_in_stock : ""
                      }
                      className={
                        "bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"
                      }
                      type="text"
                      label={
                        <span className="pb-8  inline-block">
                          Stock in Store
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
                      placeholder="Enter your Quantity"
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
          <div className="flex w-[400px] flex-col gap-3">
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
                {data.map((el, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox isSelected={false} />
                    </TableCell>
                    <TableCell>{el.varient}</TableCell>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.quanlity}</TableCell>
                    <TableCell>{el.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <button>Create Purchase Item</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchar;
