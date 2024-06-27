import React, { useState } from "react";
import {Button} from "@nextui-org/react";
import TableProduct from "./tableProduct.jsx";
import Select from "../SelectInput/indext";
import { useSelector } from "react-redux";
import { product,PurchaseOrder } from "../Redux/selector.jsx";
import InputFind from "./Input.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faReplyAll } from "@fortawesome/free-solid-svg-icons";
const columns = [
  // Thêm cột cho checkbox
  { name: "Product", uid: "NameProduct" },
  { name: "Gender", uid: "gender" },
  { name: "Type", uid: "typeOfProduct" },
  {name:"Material", uid: "material" },
  { name: "Quantity", uid: "quantity" },
  { name: "Plus", uid: "Plus" },
];
// name:el.nameProduct,
//                 size:el.sizeEnum,
//                 color:el.color,
//                 quantity:el.quantity,
//                 price:el.purchase_price,
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
  const OrderPurchase=useSelector(PurchaseOrder)
  const OrderPrepare=OrderPurchase.filter((el)=>el.status=="Prepare")
  const list =OrderPrepare.length!=0?OrderPrepare[0].purchaseorderitem:[]
  console.log(OrderPrepare)
  const Product = useSelector(product);
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const [currentPage1, setCurrentPage1] = useState(1);
  console.log(value);
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
          <InputFind/>
        </div>
          <div>
          <Button  radius="full" className={`shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500 text-white`}>
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
                gender:el.gender,
                material:el.materialProduct,
                avatar: el.productVersion[0]
                  ? el.productVersion[0].variants[0].images[0].image_urlString
                  : "",
                quantity: el.productVersion[0]
                  ? el.productVersion[0].variants.reduce((acc, variant) => acc + variant.quantity_in_stock, 0)
                  : 0,
              }))}
              number={currentPage}
            />
          </div>
              <div className=" h-full w-[50%] flex flex-col gap-3">
              <div className="w-full flex flex-row justify-between">
                <Button endContent={<FontAwesomeIcon icon={faReplyAll} />} className="border-2 border-[#5eb2f6] bg-[#FFFFFF] font-mono hover:border-white text-[#1A202C] text-sm hover:text-white  hover:bg-[#88c1ff]">Select All</Button>
                <Button endContent={<FontAwesomeIcon icon={faDeleteLeft} />}className="border-2 border-[#f6615e] bg-[#FFFFFF] font-mono hover:border-white text-[#1A202C] text-sm hover:text-white hover:bg-[#ff8888]">Delete</Button>
              </div>
              <div className="w-full"><TableProduct
            
            setnumber={setCurrentPage1}
            selected={selected}
            setSelected={setSelected}
            columns={columns1}
              products={list.map((el) => ({
                productid:el.productID,
                id:el.purchase_order_items_id,
                name:el.nameProduct,
                size:el.sizeEnum,
                color:el.color,
                quantityItem:el.quantity,
                price:el.purchase_price,
              }))}
              number={currentPage1}
            /></div>
                
              </div>
      </div>
    </div>
  );
};

export default AddProduct;
