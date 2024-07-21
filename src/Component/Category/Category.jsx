import React, { useState } from "react";
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
  Breadcrumbs,
  BreadcrumbItem,
  Calendar,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../Custumer/VerticalDotsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import InventoryPage from "./Inventory";
import { product, Sale, Quantity, Inventory } from "../Redux/selector.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../Custumer/Utils.jsx";
import { ChevronDownIcon } from "../Custumer/ChevronIcon.jsx";
import { parseDate } from "@internationalized/date";
import { toast } from "react-toastify";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { Tooltip } from "devextreme-react";
import Test from './Test.jsx'
//import { Calendar } from "devextreme-react";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Type", uid: "type", sortable: true },
  { name: "Gender", uid: "gender" },
  { name: "Quantity", uid: "quantity", sortable: true },
];

const statusOptions = [
  { name: "Áo_thun", uid: "Áo_thun" },
  { name: "Áo_sơ_mi", uid: "Áo_sơ_mi" },
  { name: "Áo_polo", uid: "Áo_polo" },
  { name: "Áo_khoát", uid: "Áo_khoát" },
  { name: "Áo_tanktop", uid: "Áo_tanktop" },
  { name: "Áo_thể_thao", uid: "Áo_thể_thao" },
  { name: "Áo_tay_dài", uid: "Áo_tay_dài" },
  { name: "Quần_short", uid: "Quần_short" },
  { name: "Quần_jeans", uid: "Quần_jeans" },
  { name: "Quần_dài", uid: "Quần_dài" },
  { name: "Quần_thể_thao", uid: "Quần_thể_thao" },
];
const Category = () => {
  let [value, setValue] = React.useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  
  return (
    <div>
      <div className="w-[1350px] h-full  m-auto flex flex-col mt-4 gap-5">
      
        <Breadcrumbs
          aria-labelledby="submit-label"
          isDisabled
          radius="lg"
          variant="solid"
          className="bg-[#f4f4f5] w-fit rounded-2xl"
        >
          <BreadcrumbItem>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#c5c6c9" }} />
          </BreadcrumbItem>
          <BreadcrumbItem>All Promotion</BreadcrumbItem>
          <BreadcrumbItem>Add new Promotion</BreadcrumbItem>
        </Breadcrumbs>

        <div className="w-full h-full flex flex-row gap-5">
          <Test value={value}/>
          <div className=" h-[500px] w-[400px] flex justify-center items-center">
            <Calendar
              aria-label="Date (Controlled)"
              value={value}
              showMonthAndYearPickers
              onChange={setValue}
              className="shadow-slate-300 bg-slate-100 w-[250px] h-fit shadow-inner rounded-md "
                classNames={{
                  calendar:
                    "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner",
                  input:
                    " rounded-md border border-slate-300 focus:border-slate-500",
                }}
            />
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-row">
          <div className="w-full h-full">
            <div className="h-full flex justify-center items-center">
              {/* <InventoryPage data={filterProduct} /> */}
              
            </div>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};
export default Category;
