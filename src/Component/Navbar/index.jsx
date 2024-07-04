import { Link,useLocation } from "react-router-dom";
import React, { useState } from "react";
import {
  faClipboardList,
  faHouseChimneyUser,
  faTag,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faCartFlatbed,faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

const data = [
  {
    content: "Dashboard",
    link: '/Dashboard',
    icon: faHouseChimneyUser,
    flat:false
  },
  {
    content: "Product",
    link: "/Product/Add",
    icon: faShirt,
    flat:false
  },
  {
    content: "Category",
    link: "/",
    icon: faClipboardList,
    flat:false
  },
  {
    content: "Order",
    link: "/order",
    icon: faCartFlatbed,
    flat:true,
    message:4
  },
  {
    content: "Customer",
    link: "/custumer",
    icon: faUser,
    flat:false
  },
  {
    content: "Promotion",
    link: "/",
    icon:faTag,
    flat:false
  },
  {
    content: "Employee",
    link: "/",
    icon: faUserTie,
    flat:false
  },
];

const Index = () => {
    const location = useLocation();
    console.log(location.pathname.split('/')[1])
    const [index1, setindex] = useState(data.findIndex((el)=>el.link.includes(location.pathname.split('/')[1])));
  return (
    <div className="w-[95%] h-full gap-4 m-auto flex flex-col mt-5">
    <div className="flex flex-row w-full font-bold justify-center gap-5 pb-2 border-b-2 border-blue-300">
        <FontAwesomeIcon icon={faCubesStacked} size="2xl" style={{color: "#74C0FC",}} />
        <div>ADMIN SETTING</div>
    </div>
      {data.map((el, index) => (
        <Link
          key={index}
          to={el.link}
          className="w-full h-fit"
          onClick={() => {
            setindex(index);
          }}
        >
          <div
            className={`${
              index === index1 ? "bg-white shadow-lg border-[2px]" : "bg-transparent"
            } transition duration-300 ease-out rounded-lg border-slate-200 bg-cover bg-center m-auto w-[90%] h-14 flex flex-row justify-start p-3 items-center bg-blue-200`}
          >
            <div
              className={` w-10 h-10 p-1 rounded-md ${
                index === index1 ? "bg-[#646cff] shadow-md" : "bg-transparent"
              } transition duration-300 justify-center items-center flex ease-out`}
            >
            {el.flat==true?<Badge content={el.message} color="primary" className="bg-blue-300 border-2 border-white">
        <FontAwesomeIcon
                size="xl"
                style={index === index1 ? { color: "#ffffff" } : { color: "#646cff" }}
                icon={el.icon}
              />
      </Badge>: <FontAwesomeIcon
                size="xl"
                style={index === index1 ? { color: "#ffffff" } : { color: "#646cff" }}
                icon={el.icon}
              />}
              
            </div>
            <div className="ml-3">{el.content}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;

