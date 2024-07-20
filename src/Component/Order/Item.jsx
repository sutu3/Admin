import {
  faFlagUsa,
  faHouse,
  faReplyAll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Infor, Orders, custumer, product } from "../Redux/selector";
import PregresUI from "./index";
import { useDispatch } from "react-redux";
import { ChangeOrderStatus } from "../Redux/OrderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustumerSlice, { checkPermosion } from "../Redux/CustummerSlice";
import useWebSocket from "./UseWebSocket";
const statusColorMap = {
  Prepare: "#f5f7ff",
  Pending: "#fdefe6",
  Shipping: "#1db6d8",
  Completed: "#86efac",
  Cancel: "#fff3f5",
};

const Item = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const infor=useSelector(Infor)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
    const order = useSelector(Orders).find((el) => el.orders_id == location);
    const [loading,setLoading]=useState(false)
    const customer = useSelector(custumer).find(
      (el) => el.account_id == order.account
    );
    const Product = useSelector(product);
//     order.orderItems.map((el) => {
//   const filteredProducts = Product.find((el1) =>
//     el1.productVersion.filter((el2) => el2.productVersion_id == el.productVersion)
//   ).imagesMap[0].image_urlString

//   console.log(filteredProducts);
// });
  const handleCancle=async ()=>{
    setLoading(true)
     dispatch(ChangeOrderStatus({
        username: infor.username,
          id: order.orders_id,
          status: 'Cancel',
          account_id: order.account
    }))
    setLoading(false)
    setTimeout(()=>{
      toast.success(`Action Completed`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
    },500)
  }
  const handleClickChange=async ()=>{
    setLoading(true)
     dispatch(ChangeOrderStatus({
        username: infor.username,
          id: order.orders_id,
          status: order.status === "Pending" ? "Shipping" : "Completed",
    }))
    setLoading(false)
    setTimeout(()=>{
      toast.success(`Action Completed`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
    },500)
  }
  return (
    <div className="w-[1350px] h-full flex flex-col  m-auto mt-10 ml-14" aria-labelledby="submit-label">
      <div className="flex flex-col items-start">
        <Button onClick={()=>navigate("/order")} className="border-[2px] border-slate-400">
          <Chip  aria-labelledby="submit-label"
            startContent={<FontAwesomeIcon onClick={navigate('/order')} icon={faReplyAll} />} 
          >
            Back
          </Chip>
        </Button>
        <div className=" flex flex-row w-full gap-6 mb-5">
          <div className="text-3xl font-bold font-serif">Order Details</div>
          <div>
            <Breadcrumbs
              isDisabled
              radius="lg"
              variant="solid"
              className="bg-[#f4f4f5] w-fit rounded-2xl"
            >
              <BreadcrumbItem>
                <FontAwesomeIcon icon={faHouse} style={{ color: "#c5c6c9" }} />
              </BreadcrumbItem>
              <BreadcrumbItem>All Order</BreadcrumbItem>
              <BreadcrumbItem>Order {location}</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row gap-5">
        <div className="w-[65%] h-full flex flex-col gap-5">
          <div className="w-full h-full border-[2px] border-slate-300 shadow-lg rounded-md p-5">
            <div className="w-full flex flex-row justify-between">
              <div className="text-xl font-[700]">
                Order No: <span className="text-[#f6708e]">{location}</span>
              </div>
              <div className="text-[#f63b5e] text-2xl font-bold font-mono">
                Monas Cloth
              </div>
              <div
                className=" text-slate-400 p-1 pl-2 pr-2 rounded-md"
                style={{ backgroundColor: statusColorMap[order.status] }}
              >
                {order.status}
              </div>
            </div>
            <div className="w-full h-full flex flex-row justify-between  pt-7 pb-7 text-start">
              <div className="w-1/4 flex flex-col">
                <div className="font-[500] text-slate-400 text-sm">
                  Order Created at
                </div>
                <div className="w-full flex flex-col  font-[500] text-slate-600">
                  <div>{order.created_at.split("T")[0]} </div>
                  <div>At {order.created_at.split("T")[1]}</div>
                </div>
              </div>
              <div className="w-1/4 flex flex-col">
                <div className="font-[500] text-slate-400 text-sm">Name</div>
                <div className="w-full flex flex-col  font-[500] text-slate-600">
                  <div>{customer.username} </div>
                </div>
              </div>
              <div className="w-1/4 flex flex-col">
                <div className="font-[500] text-slate-400 text-sm">Email</div>
                <div className="w-full flex flex-col  font-[500] text-slate-600">
                  <div>{customer.email} </div>
                </div>
              </div>
              <div className="w-1/4 flex flex-col">
                <div className="font-[500] text-slate-400 text-sm">
                  Contract To
                </div>
                <div className="w-full flex flex-col  font-[500] text-slate-600">
                  <div>{customer.phoneNumber} </div>
                </div>
              </div>
            </div>
            <div className="border-[2px] border-slate-300 rounded-lg w-[90%] h-full flex flex-row bg-[#fff3f5] justify-between m-auto  p-5 text-start">
              <div className="w-1/2 h-full flex flex-col gap-3">
                <div className="font-[500] text-slate-400 text-sm">
                  Delivery Address
                </div>
                <div className="w-full flex flex-row gap-3">
                  <div className="font-[500] text-slate-600 ">Name:</div>
                  <div className="w-full flex flex-col  font-[500] text-slate-600">
                    <div>{customer.username} </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-3">
                  <div className="w-full flex flex-col  font-[500] text-slate-600">
                    <div>
                      {order.addressorder
                        ? order.addressorder
                        : "1806/127 đường Huỳnh Tấn Phát, thị trấn Nhà Bè, huyện Nhà Bè (TP HCM)"}{" "}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-3">
                  <div className="font-[500] text-slate-600 ">Call:</div>
                  <div className="w-full flex flex-col  font-[500] text-slate-600">
                    <div>{customer.phoneNumber} </div>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  width={250}
                  alt="NextUI hero Image"
                  radius="lg"
                  className="rounded-2xl w-[150px]"
                  src={
                    customer.avatarString
                      ? customer.avatarString
                      : "https://www.freeiconspng.com/thumbs/account-icon/account-icon-8.png"
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full border-[2px] border-slate-300 shadow-lg rounded-md p-5 ">
            <div className="flex flex-row justify-between border-b-[2px] border-slate-300 pb-2">
              <div className="text-2xl text-[#379aff]">{location}</div>
              <div
                className=" text-slate-400 p-1 pl-2 pr-2 rounded-md"
                style={{ backgroundColor: statusColorMap[order.status] }}
              >
                {order.status}
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <ScrollShadow hideScrollBar  aria-labelledby="submit-label" className="w-full max-h-80 ">
                {order.orderItems.map((el,index) => (
                  <div key={index} className="w-full items-center justify-between flex flex-row p-2 border-b-[2px] border-slate-300">
                    <User
                     aria-labelledby="submit-label"
                      avatarProps={{
                        radius: "lg",
                        src: Product.find((el1) =>
    el1.product_id === el.productID
  )?Product.find((el1) =>
    el1.product_id === el.productID
  ).imagesMap[0].image_urlString:'',
                      }}
                      description={
                        <div className="flex flex-row w-full gap-1">
                          <div>{el.size}</div>
                          <div>/</div>
                          <div
                            style={{ backgroundColor: el.color }}
                            className="font-bold w-10 h-5 rounded-md"
                          >
                            {}
                          </div>
                        </div>
                      }
                      name={<div className="font-bold">{el.product_name}</div>}
                    >
                      {el.color}
                    </User>
                    <div className="w-[200px] flex flex-row gap-1">
                      <div className="font-[600] text-[#379aff]">
                        {el.product_price}
                      </div>
                      <div className="text-xs items-start flex items-start h-full">
                        vnd
                      </div>
                      <div>X{el.quantity}</div>
                    </div>
                    <div className="flex flex-row gap-1 font-[600] text-[#379aff]">
                      {el.product_price * el.quantity} vnd
                    </div>
                  </div>
                ))}
              </ScrollShadow>
            </div>
            <div className="w-full h-full flex flex-col items-end mt-10">
              <div className="w-1/2 h-full flex flex-row justify-between">
                <div className="text-slate-500 font-mono text-lg">ToTal</div>
                <div className="font-bold text-xl">{order.total_amount}vnd</div>
              </div>
              <div className={`w-1/2 flex flex-row gap-3 mt-10 items-end justify-end ${(order.status != "Completed" && order.status != "Cancel")?'':'hidden'}`}>
                <Button  aria-labelledby="submit-label" className="text-[#f63b5e]" onClick={async () => {
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
                    id: 6,
                  })
                );
                result.payload
                  ? handleCancle()
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
              }}>Cancel</Button>
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
              <Button  aria-labelledby="submit-label" className="bg-[#0181ff] text-white"
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
                    id: 6,
                  })
                );
                result.payload
                  ? handleClickChange()
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
                >
                  Change State
                </Button>
            )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] h-full ">
          {order.status != "Completed" && order.status != "Cancel" ? (
            <div className="gap-3 flex flex-row w-full h-full">
              <PregresUI
                step={[
                  { label: "1", value: order.shipping_at ? 100 : 0 },
                  { label: "2", value: order.complete_at ? 100 : 0 },
                  { label: "3", value: order.complete_at ? 100 : 0 },
                ]}
              />
              <div className="w-[90px] h-full flex flex-col gap-[70px] mt-3">
                <div className="font-mono text-sm">Prepare</div>
                <div className="font-mono text-sm">Shipping</div>
                <div className="font-mono text-sm">Complete</div>
              </div>
            </div>
          ) : (
            <div className="border-[2px] border-slate-200 rounded-lg gap-5 shadow-md flex flex-col w-full p-5 pl-10 pr-10">
              <div className="w-full flex flex-row justify-between pt-3 pb-3 border-b-[2px] border-slate-400">
                <div className="font-[500] text-slate-400">Order Date:</div>
                <div className="font-[500] pr-20  flex items-end justify-end">
                  {order.created_at.split("T")[0]}
                </div>
              </div>
              <div className="w-full flex flex-row justify-between pt-3 pb-3 border-b-[2px] border-slate-400">
                <div className="font-[500] text-slate-400">
                  Shipping Country:
                </div>
                <div className="font-[500] pr-20  flex items-end justify-end">
                  <Chip
                    startContent={
                      <FontAwesomeIcon
                        icon={faFlagUsa}
                        style={{ color: "#74C0FC" }}
                      />
                    }
                  >
                    VietNamese
                  </Chip>
                </div>
              </div>
              <div className="w-full flex flex-row justify-between pt-3 pb-3 border-b-[2px] border-slate-400">
                <div className="font-[500] text-slate-400">
                  Shipping address:
                </div>
                <div className="font-[500] pr-20 flex items-end justify-end">
                  {order.addressorder ? order.addressorder : "--"}
                </div>
              </div>
              <div className="w-full flex flex-row justify-between pt-3 pb-3 border-b-[2px] border-slate-400">
                <div className="font-[500] text-slate-400">
                  Shipping Status:
                </div>
                <div className="font-[500] pr-20  flex items-end justify-end">
                  Shipped
                </div>
              </div>
              <div className="w-full flex flex-row justify-between pt-3 pb-3">
                <div className="font-[500] text-slate-400">Order Status:</div>
                <div
                  className=" text-slate-400 mr-20 p-1 pl-2 rounded-md"
                  style={{ backgroundColor: statusColorMap[order.status] }}
                >
                  {order.status}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
