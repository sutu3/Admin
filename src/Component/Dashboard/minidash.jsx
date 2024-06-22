import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
const data = [
  {
    content: "Value",
    link: 'Value',
    icon: faHouseChimneyUser,
  },
  {
    content: "Chart",
    link: "Chart",
    icon: faChartSimple,
  },
];
export default function App() {
    const [index1,setindex]=useState(0)
  return (
    <div className="w-[1200px] h-full flex flex-col gap-4">
     <div className="flex m-auto w-[250px]">
    <Navbar className="m-auto mt-2 backdrop-blur-lg w-full sticky border-2 border-slate-300 rounded-3xl ">
      <NavbarContent className="hidden sm:flex gap-4 z-30 pl-5 pr-5 justify-center overflow-hidden" justify="center">
      {data.map((el,index)=><NavbarItem key={index} onClick={()=>{setindex(index)}}>
          <Link  to={el.link} className={` flex flex-row gap-2 w-[90px] ${index==index1?'bg-blue-200':""} transition duration-200 ease-out h-full p-3 rounded-[10px] `}>
            <div><FontAwesomeIcon icon={el.icon} style={{color: "#3dabff",}} /></div>
            <div>{el.content}</div>
          </Link>
        </NavbarItem>)}
      </NavbarContent>
    </Navbar></div>
    <div className="w-full"><Outlet/></div>
    </div>
  );
}
