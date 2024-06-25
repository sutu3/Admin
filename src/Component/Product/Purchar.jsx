import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../Button/index";
import TableProduct from "./tableProduct.jsx";
import { Card, CardBody, CardFooter, Checkbox, Input, Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
const columns = [
  { name: "", uid: "checkbox" },  // Thêm cột cho checkbox
  { name: "Varient", uid: "varient" },
  { name: "Name", uid: "name" },
  { name: "Quanlity", uid: "quanlity" },
  { name: "Price", uid: "price" }
];
const data=[{
    varient: 'M/red',
    name: 'T-Shirt',
    quanlity: 10,
    price: 100000
}]
const size = ['M', 'S', 'L', 'XL'];
const color=['red','green','blue']
const Purchar = () => {
    const [arr, setArr] = useState("");
    console.log(arr);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="w-full h-[50px] flex flex-row justify-between">
                <div className="flex items-center gap-2 text-2xl font-bold">
                    <FontAwesomeIcon icon={faShop} className="pr-3"/>
                    Import Product
                </div>
                <div className="flex flex-row h-full gap-2 mr-5 items-center">
                    <Button
                        style="bg-white text-red-400 border-[3px] border-red-400 hover:text-white hover:bg-red-400 hover:border-white text-sm"
                        content="Delete Import"
                    />
                    <Button
                        style="bg-white text-green-400 border-[3px] border-green-400 hover:text-white hover:bg-green-400 hover:border-white text-sm"
                        content="Add Import"
                    />
                </div>
            </div>
            <div className="flex flex-row w-[800px] h-full ">
                <div className=" w-[90%] bg-transparent h-full p-5 flex flex-col gap-5">
                <div className="bg-[#f9f9f9] p-5 w-full h-full flex flex-col rounded-md shadow-md">
                    <div className="font-bold text-lg mb-2 flex justify-start">General Information</div>
                    <div className="mb-4">
                        <div className="text-left text-[#616264] font-mono">Name Product</div>
                        <Textarea
                            isDisabled
                            labelPlacement="outside"
                            placeholder="Enter your description"
                            defaultValue="Product A"
                            className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                        />
                    </div>
                    <div className="flex flex-col w-full mb-4">
                        <div className="text-left text-[#616264] font-mono">Description Product</div>
                        <Textarea
                            isDisabled
                            labelPlacement="outside"
                            placeholder="Enter your description"
                            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                            className="w-full text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-1/2">
                            <div className="font-semibold justify-start flex w-full">Size</div>
                            <div className="text-xs font-[400] text-[#8d8f92] justify-start flex w-full">Pink Available Size</div>
                        <div className="flex flex-row gap-3">
                            {size.map((el, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setArr(el);
                                    }}
                                    className={`w-14 h-12 ${arr==el ? "border-0 bg-green-300 text-white" : "outline-none bg-[#ededed]"} active::outline-none rounded`}
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                        </div>
                        <div className="w-1/2">
                           <div className="font-semibold justify-start flex w-full">Gender</div>
                            <div className="text-xs font-[400] text-[#8d8f92] justify-start flex w-full">Available Gender</div>
                            <div className="flex flex-row gap-4">
                            <div>
                                <button className={`bg-[#86efac] text-white w-14 h-12 flex justify-center`}>Nam</button>
                            </div>
                            <div>
                                <button className={`bg-[#86efac] text-white w-14 h-12 flex justify-center`}>Nữ</button>
                            </div>
                            <div>
                                <button className={`bg-[#86efac] text-white w-14 h-12 flex justify-center`}>Khác</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                 <div className="bg-[#f9f9f9] p-5 w-full h-full flex flex-col rounded-md shadow-md">
                    <div className="font-bold text-lg mb-2 flex justify-between w-full">
                        <div>Pricing and Stock</div>
                        <div className="w-1/2 flex flex-row gap-3 ">
                            {color.map((el,index)=><button key={index} className={`w-10 h-10 text-xs flex items-center bg-${el}-400`}></button>)}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-5">
                        <div className= " w-full flex flex-row gap-3 justify-between">
                            <div><Input className={"bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"} type="text" label={<span className="pb-8  inline-block">Base Pricing</span>} placeholder="Your Pricing" /></div>
                            <div><Input className={"bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"} type="text" label={<span className="pb-8  inline-block">Stock in Store</span>} placeholder="your Stock in Store" /></div>
                        </div>
                         <div className= " w-full h-full flex flex-row gap-3 justify-between">
                            <div><Input className={"bg-[#eeeeee] border-2 w-[300px] border-slate-300 rounded-lg"} type="text" label={<span className="pb-8  inline-block">Quanlity</span>} placeholder="Enter your Quantity" /></div>
                            <div className="h-full w-full items-center justify-center">Giá của sản phẩm</div>
                        </div>
                    </div>
                </div>   
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
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="text-[#71717a] bg-[#f4f4f5] p-3">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {data.map((el,index)=><TableRow key={index}>
          <TableCell><Checkbox
            isSelected={false}
          /></TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.varient}</TableCell>
            <TableCell>{el.quanlity}</TableCell>
            <TableCell>{el.price}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
    <div><button>Create Purchase Item</button></div>
                </div>
            </div>
        </div>
    );
};

export default Purchar;
