import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import TableProduct from "./tableProduct.jsx";
import Select from "../SelectInput/indext";
import { useSelector, useDispatch } from "react-redux";
import { product, PurchaseOrder, Quantity, Infor } from "../Redux/selector.jsx";
import InputFind from "./Input.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faReplyAll,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import { ChangeStatusToShipping } from "../Redux/PurchaseSlice.jsx";
import { toast } from "react-toastify";
import CustumerSlice, { checkPermosion } from "../Redux/CustummerSlice.jsx";
const columns = [
  // Thêm cột cho checkbox
  { name: "Product", uid: "NameProduct" },
  { name: "Gender", uid: "gender" },
  { name: "Type", uid: "typeOfProduct" },
  { name: "Material", uid: "material" },
  { name: "Quantity", uid: "quantity" },
  { name: "Plus", uid: "Plus" },
  { name: "Fix", uid: "Fix" },
];
const columns1 = [
  // Thêm cột cho checkbox
  { name: "", uid: "checkbox" },
  { name: "Name", uid: "name" },
  { name: "Size", uid: "size" },
  { name: "Color", uid: "color" },
  { name: "Quantity", uid: "quantityItem" },
  { name: "Price", uid: "price" },
  { name: "Action", uid: "Fix" },
];
const AddProduct = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const infor = useSelector(Infor);
  const quantity = useSelector(Quantity);
  const OrderPurchase = useSelector(PurchaseOrder);
  console.log(OrderPurchase);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OrderPrepare = OrderPurchase.filter((el) => el.status == "Prepare");
  const list =
    OrderPrepare.length != 0 ? OrderPrepare[0].purchaseorderitem : [];
  console.log(OrderPrepare);
  const Product = useSelector(product);
  const [selected, setSelected] = useState([]);
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [loading2, setloading2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const handleConfirm = async () => {
    if (list.length != 0) {
      setloading2(true);
      await dispatch(ChangeStatusToShipping(OrderPrepare));
      setloading2(false);
      onClose();
    } else {
      toast.info(`Enter Your Item Purchase`, {
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
  return (
    <div className="w-[1300px] h-full flex flex-col -translate-x-10">
      <div className="w-full h-[200px] flex flex-row justify-around ">
        <div className="w-full h-full flex flex-row">
          <div>
            <Select
              value={value2}
              setValue={setValue2}
              content={"Type"}
              data={["Áo Khoát Nam", "Áo Thun", "Quần Đùi", "Quân Jear"]}
            />
          </div>
          <div>
            <Select
              value={value3}
              setValue={setValue3}
              content={"Gender"}
              data={["Nam", "Nữ", "Unisex"]}
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-row gap-5 justify-end pr-6 items-center">
          <div>
            <InputFind />
          </div>
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
                    id: 1,
                  })
                );
                result.payload
                  ? navigate('/Product/Addnewproduct')
                  : toast.info(`Your Permission Is Not Enough Affect`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                else{
                  localStorage.removeItem('login')
                  dispatch(CustumerSlice.actions.changeState(false))
                  window.location.reload();
                }
              }}
             
                aria-label="Action Order Delivery"
                radius="full"
                className={`shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500 text-white`}
              >
                + Add New Product
              </Button>
          </div>
        </div>
      </div>
      <div className=" w-full h-full gap-4 flex flex-row">
        <div className="h-[450px] -translate-y-10 w-[70%]">
          <TableProduct
            setnumber={setCurrentPage}
            selected={selected}
            setSelected={setSelected}
            columns={columns}
            products={Product.map((el) => ({
              id: el.product_id,
              typeOfProduct: el.type,
              name: el.name,
              gender: el.gender,
              material: el.materialProduct,
              avatar:
                el.imagesMap.length != 0 ? el.imagesMap[0].image_urlString : "",
              quantity: quantity[el.product_id]
                ? Object.entries(quantity[el.product_id]).reduce(
                    (acc, el) => acc + el[1],
                    0
                  )
                : 0,
            }))}
            number={currentPage}
          />
        </div>
        <div className=" h-full w-[50%] flex flex-col gap-3">
          <div className="w-full flex flex-row justify-between">
            <Button
              aria-label="Action Order Delivery"
              endContent={<FontAwesomeIcon icon={faReplyAll} />}
              className="border-2 border-[#5eb2f6] bg-[#FFFFFF] font-mono hover:border-white text-[#1A202C] text-sm hover:text-white  hover:bg-[#88c1ff]"
            >
              Select All
            </Button>
            <Button
              aria-label="Action Order Delivery"
              onClick={async () => {
                const check = await dispatch(
                    checkPermosion({
                      account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                      id: 8,
                    })
                  );
                  if(check.payload)
                  {
                    const result = await dispatch(
                  checkPermosion({
                    account_id: infor.account_id, // Bạn cần đảm bảo biến 'infor' đã được khai báo và có giá trị hợp lệ
                    id: 10,
                  })
                );
                result.payload
                  ? onOpen()
                  : toast.info(`Your Permission Is Not Enough Affect`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                else{
                  localStorage.removeItem('login')
                  dispatch(CustumerSlice.actions.changeState(false))
                  window.location.reload();
                }
              }}
              startContent={
                list.length != 0
                  ? OrderPrepare[0].purchaseorderitem.reduce(
                      (acc, el) => acc + el.purchase_price * el.quantity,
                      0
                    )
                  : 0
              }
              endContent={<FontAwesomeIcon icon={faTruck} />}
              className="hover:bg-[#63E6BE] text-[#63E6BE]  hover:text-white font-mono w-40"
              //onPress={onOpen}
            >
              confirm
            </Button>
            <Button
              aria-label="Action Order Delivery"
              endContent={<FontAwesomeIcon icon={faDeleteLeft} />}
              className="border-2 border-[#f6615e] bg-[#FFFFFF] font-mono hover:border-white text-[#1A202C] text-sm hover:text-white hover:bg-[#ff8888]"
            >
              Delete
            </Button>
          </div>
          <div className="w-full">
            <TableProduct
              setnumber={setCurrentPage1}
              selected={selected}
              setSelected={setSelected}
              columns={columns1}
              products={list.map((el) => ({
                productid: el.productID,
                id: el.purchase_order_items_id,
                name: el.nameProduct,
                size: el.sizeEnum,
                color: el.color,
                quantityItem: el.quantity,
                price: el.purchase_price,
              }))}
              number={currentPage1}
            />
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
              Do you want to Confirm Purchase Order{" "}
              {`${OrderPrepare.purchase_orders_id}`}
            </ModalHeader>
            <ModalBody>
              <div>Click the Button And your Order will Delivery</div>
            </ModalBody>
            <ModalFooter>
              <Button
                aria-label="Close Button"
                color="danger"
                variant="light"
                className="border-[2px] border-red-400 text-red-500 bg-white"
                onPress={onClose}
              >
                Close
              </Button>
              {loading2 ? (
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
                  onPress={handleConfirm}
                >
                  Action
                </Button>
              )}
              {/* <ToastContainer /> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AddProduct;
