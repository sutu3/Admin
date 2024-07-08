import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { product, Size,Infor } from "../Redux/selector";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { HexColorPicker } from "react-colorful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faWrench } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "recharts";
import { EditIcon } from "./EditIcon";
import { GetProduct, UpdateCategories, UpdateCategoriesPriceORDelete } from "../Redux/ProductSlice";
import { toast } from "react-toastify";
import CustumerSlice, { checkPermosion } from "../Redux/CustummerSlice";
import { useNavigate } from "react-router-dom";
const columns1 = [
  { name: "Size", uid: "size" },
  { name: "Color", uid: "color" },
  { name: "Price", uid: "price" },
  { name: "Action", uid: "action" },
];
const columns2 = [
  { name: "", uid: "checkbox" },
  { name: "Size", uid: "size" },
  { name: "Color", uid: "color" },
  { name: "Price", uid: "price" },
  { name: "Action", uid: "action" },
];
const UpdateProduct = () => {
  const navigate = useNavigate();
  const infor=useSelector(Infor)
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [flat,setflat]=useState(false);
  const location = useLocation().pathname.split("/").pop();
  const size1 = useSelector(Size);
  const Product = useSelector(product).find((el) => el.product_id == location);
  const [btnsize, setsize] = useState([]);
  const [btn, setbtn] = useState([]);
  const [color, setcolor] = useState("");
  const [number, setnumber] = useState(1);
  const [number1, setnumber1] = useState(1);
  const [list, setlist] = useState([]);
  const [price, setprice] = useState("");
  const [select, setselected] = useState([]);
  const [categories, setcategories] = useState({});

const handleActionClick = async () => {
    console.log(flat);
    setLoading(true);
    
    try {
        if (flat) {
            await dispatch(
                UpdateCategoriesPriceORDelete({
                    category_id: categories.category_id,
                    price_base: categories.price_base,
                    catetoryProduct: location,
                    isdelete: false,
                    catetoryColor: categories.catetoryColor,
                    catetorySize: categories.catetorySize,
                })
            );
        } else {
            await dispatch(
                UpdateCategoriesPriceORDelete({
                    category_id: categories.category_id,
                    price_base: categories.price_base,
                    catetoryProduct: location,
                    isdelete: true,
                    catetoryColor: categories.catetoryColor,
                    catetorySize: categories.catetorySize,
                })
            );
        }
        await dispatch(GetProduct(location))
        setLoading(false);
        onClose();
        
        toast.success("Action completed successfully!", {
            position: "top-right",
            autoClose: 2000, // Close after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    } catch (error) {
        setLoading(false);
        console.error("An error occurred:", error);
        toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
};

  const handleSelectionChangeSize = (selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    // Lọc và gom màu sắc theo kích thước
    const filteredData = list.reduce((acc, el) => {
      const existing = acc.find((item) => item.size === el.size);
      if (existing) {
        existing.colors.push(el.color);
      } else {
        acc.push({ size: el.size, colors: [el.color] });
      }
      return acc;
    }, []);

    // Tạo mảng mới từ selectedArray và kết hợp với color hiện tại nếu tồn tại
    const arr = selectedArray.map((el) => {
      const existingSize = filteredData.find((el1) => el1.size === el);
      if (existingSize) {
        return {
          size: el,
          color: existingSize.colors,
          price: existingSize.price,
        };
      } else {
        return { size: el, color: [], price: "" };
      }
    });

    // Tạo newlist để cập nhật state
    const newlist = arr.flatMap((el) =>
      el.color.map((el1) => ({
        size: el.size,
        color: el1,
        price: el.price,
      }))
    );

    setlist(newlist);
    setsize(arr);
  };


  return (
    <div className="w-[1250px] h-full -translate-x-10 flex flex-col gap-4">
      <div className="w-full flex  flex-row-reverse gap-4 justify-between">
        {Product.categories && (
          <div className="w-[50%] ">
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
                    total={Math.ceil(Product.categories.length / 3)}
                    onChange={(page) => setnumber(page)}
                  />
                </div>
              }
              color={"secondary"}
              selectionMode="single"
              defaultSelectedKeys={["2"]}
              aria-label="Example static collection table"
              className="bg-white shadow-md rounded-md border-[2px] border-slate-300"
            >
              <TableHeader columns={columns1}>
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
                {Product.categories
                  .slice((number - 1) * 3, (number - 1) * 3 + 3)
                  .map((el, index) => (
                    <TableRow key={index} className="hover:bg-blue-100">
                      <TableCell>{el.sizeEnum}</TableCell>

                      <TableCell>
                        <div
                          className="w-20 h-12 rounded-xl"
                          style={{ backgroundColor: el.color }}
                        ></div>
                      </TableCell>
                      <TableCell>{el.price_base}</TableCell>
                      <TableCell>
                        <div className="flex flex-row gap-3">
                          <FontAwesomeIcon
                          onClick={() => {
                              setcategories(el);
                              setflat(false);
                              onOpen(); // Gọi hàm onOpen()
                            }}
                            icon={faTrashCan}
                            style={{ color: "#e52e2e" }}
                          />
                          <FontAwesomeIcon
                            onClick={() => {
                              setcategories(el);
                              setflat(true);
                              onOpen(); // Gọi hàm onOpen()
                            }}
                            icon={faWrench}
                            style={{ color: "#63E6BE" }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="w-[40%] h-full flex flex-row gap-4 justify-start items-start">
          <Card className="py-4 h-full w-[450px] bg-slate-100 rounded-2xl ">
            <CardHeader className="pb-3 pt-2  w-full  flex-col items-start">
              <Image
                alt="Card background"
                className="w-[450px] h-52 rounded-xl m-auto flex justify-center items-center"
                src={Product.imagesMap[0].image_urlString}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-tiny uppercase font-bold w-[80%]">
                {Product.name}
              </p>
              <small className="text-default-500">Type: {Product.type}</small>
              <h4 className="font-bold text-large">
                Chất liệu: {Product.materialProduct}
              </h4>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between font-mono text-2xl mt-20">
        <div>Add New Varient</div>
        <div>
          <Button
          onClick={async () => {
                const check = await dispatch(
                    checkPermosion({
                      account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                      id: 8,
                    })
                  );
                  if(check)
                  {
                    const result = await dispatch(
                  checkPermosion({
                    account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                    id: 2,
                  })
                );
                result.payload
                  ?
                  await dispatch(
                UpdateCategories({ data: list, idproduct: location })
              )
                  : toast.info(`Your Permission Is Not Enough Affect`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                    navigate('/Product/Add')
                  }
                else{
                  localStorage.removeItem('login')
                  dispatch(CustumerSlice.actions.changeState(false))
                  window.location.reload();
                }
              }}
            
          >
            Update Product
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-row-reverse gap-5">
        <div className="w-[50%] flex flex-col gap-3">
          <div className="w-full flex flex-row justify-between">
            <div>
              <Button
                onClick={() => {
                  if (select.length != 0) {
                    setselected([]);
                  } else {
                    setselected(list);
                  }
                }}
              >
                Select All
              </Button>
            </div>
            <div className="w-[50%] flex flex-row gap-3">
              <div>
                <Textarea
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                  value={price}
                  labelPlacement="outside"
                  placeholder="Enter your price"
                  className="w-[200px] h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                />
              </div>
              <div>
                <Button
                  onPress={() => {
                    const arr = list.map((el) =>
                      select.includes(el) ? { ...el, price: price } : el
                    );
                    setlist(arr);
                  }}
                >
                  Confirm
                </Button>
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
                    color="secondary"
                    className="text-blue-500 border-slate-400 rounded-md"
                    page={number1}
                    total={Math.ceil(list.length / 3)}
                    onChange={(page) => setnumber1(page)}
                  />
                </div>
              }
              color={"secondary"}
              selectionMode="single"
              defaultSelectedKeys={["2"]}
              aria-label="Example static collection table"
              className="bg-white shadow-md rounded-md border-[2px] border-slate-300"
            >
              <TableHeader columns={columns2}>
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
                {list
                  .slice((number1 - 1) * 3, (number1 - 1) * 3 + 3)
                  .map((el, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-blue-100"
                      onClick={() => {
                        const check = select.findIndex(
                          (el1) => el1.color == el.color && el1.size == el.size
                        );
                        if (check != -1) {
                          const arr = select.filter(
                            (_, index) => index != check
                          );
                          setselected(arr);
                        } else {
                          setselected([...select, el]);
                        }
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          isSelected={
                            !!select.find(
                              (el1) =>
                                el1.color === el.color && el1.size === el.size
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {size1.find((el1) => el1.size_id == el.size).size_name}
                      </TableCell>

                      <TableCell>
                        <div
                          className="w-20 h-12 rounded-xl"
                          style={{ backgroundColor: el.color }}
                        ></div>
                      </TableCell>
                      <TableCell>{el.price}</TableCell>
                      <TableCell>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ color: "#e52e2e" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-[50%] flex flex-row border-[2px] border-slate-400 bg-slate-200 gap-4 p-2 rounded-xl shadow-lg">
          <div className="bg-[#f5f7fa] w-[60%] h-[400px] flex flex-col shadow-inner shadow-slate-300 rounded-lg">
            <div className="p-2 font-mono text-xl font-bold mb-2">
              Product Color
            </div>
            <div className="flex flex-col gap-4">
              <div className=" flex flex-row w-full p-2">
                <input
                  type="text"
                  id=""
                  className="p-1 w-[180px] rounded-lg border-2 border-slate-200"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => {
                    setcolor(e.target.value);
                  }}
                />
                <div
                  className="w-40 rounded-lg flex m-auto "
                  style={{
                    backgroundColor: color,
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  Color: {color}
                </div>
              </div>
              <HexColorPicker
                color={color}
                className="flex justify-center w-full translate-x-20"
                onChange={setcolor}
              />
            </div>
            <div className="mt-3">
              <Button
                onClick={async () => {
                  const updatedSizes = btnsize.map((el) => {
                    if (btn.includes(el.size)) {
                      if (!el.color.includes(color)) {
                        return { ...el, color: [...el.color, color] };
                      }
                    }
                    return el;
                  });

                  const newlist = updatedSizes.flatMap((el) =>
                    el.color.map((el1) => ({
                      size: el.size,
                      color: el1,
                      price: el.price,
                    }))
                  );
                  await setlist(newlist);
                  await setsize(updatedSizes);
                }}
                className="w-56 font-[600] border-[#83a3ff] border-dashed border-2 text-[#83a3ff] bg-white"
              >
                Add Color
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 items-start">
            <div className="p-2 font-mono text-xl font-bold mb-2">
              Product Size
            </div>
            <div>
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="capitalize w-40 border-2 border-slate-300"
                  >
                    Choose Size
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Multiple selection example"
                  variant="flat"
                  closeOnSelect={false}
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={btnsize.map((el) => el.size)}
                  onSelectionChange={handleSelectionChangeSize}
                >
                  {size1.map((el) => (
                    <DropdownItem key={el.size_id} value={el.size_id}>
                      {el.size_name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className=" flex flex-row gap-3 w-52 flex-wrap">
              {btnsize.map((el) => (
                <Button
                  key={el.size}
                  onClick={() => {
                    if (btn.findIndex((el1) => el1 === el.size) === -1) {
                      const arr = [...btn, el.size];
                      setbtn(arr);
                    } else {
                      const arr = btn.filter((el1) => el1 !== el.size);
                      setbtn(arr);
                    }
                  }}
                  className={`${
                    btn.findIndex((el1) => el1 == el.size) != -1
                      ? "bg-[#edeefa] text-[#717ddd] border-[#717ddd]"
                      : "text-black border-slate-300"
                  } border-[2px]`}
                >
                  {size1.find((el1) => el1.size_id == el.size).size_name}
                </Button>
              ))}
            </div>
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
            {flat?'Update Price Product':'Delete Categories Product'}
          </ModalHeader>
          <ModalBody>
            {flat?<div>
                <p>Infor</p>
                <div className="w-full flex flex-row gap-4">
                <div>Size: {categories.sizeEnum}</div>
                <div>Color: {categories.color}</div>
                <div>Price: {categories.price_base}</div> 
                </div>
                <div>
                     <Textarea
                  onChange={(e) => {
                    setcategories({...categories,price_base:e.target.value});
                  }}
                  value={categories.price_base}
                  labelPlacement="outside"
                  placeholder="Enter your price"
                  className="w-[200px] h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                />
                </div>
            </div>:<div>
                <p>Do You want to Delete: </p>
                <div className="w-full flex flex-row gap-4">
                <div>Size: {categories.sizeEnum}</div>
                <div>Color: {categories.color}</div>
                <div>Price: {categories.price_base}</div> 
                </div>
            </div>}
            
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
                color="primary"
                className="border-[2px] border-green-400 bg-green-200 text-green-500"
                 onPress={handleActionClick}
              >
                Action
              </Button>
            )}
            {/* <ToastContainer /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateProduct;
