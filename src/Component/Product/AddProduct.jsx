import React, { useState } from "react";
import Button from "../Button/index.jsx";
import TableProduct from "./tableProduct.jsx";
import Select from "../SelectInput/indext";
import { useSelector } from "react-redux";
import { product } from "../Redux/selector.jsx";
import InputFind from "./Input.jsx";
const columns = [
  // Thêm cột cho checkbox
  { name: "Product", uid: "NameProduct" },
  { name: "Gender", uid: "gender" },
  { name: "Type", uid: "typeOfProduct" },
  {name:"Material", uid: "material" },
  {name:"Price", uid: "price" },
  { name: "Quantity", uid: "quantity" },
  { name: "Plus", uid: "Plus" },
];
const AddProduct = () => {
  const Product = useSelector(product);
  const [selected, setSelected] = useState([]);
  // const notify = () => {
  //     toast.error("hee", {
  //       position: "top-right",
  //       autoClose: 2000, // Close after 1 second
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined,
  //     });
  //   };
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(value);
  return (
    <div className="w-full h-full flex flex-col">
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
            <Button content={"+ Add New Product"} style={"bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"}/>
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
                price:el.productVersion[el.productVersion.length-1].price,
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
              <div className=" h-full w-[40%] ">
                ấdds
              </div>
      </div>
    </div>
  );
};

export default AddProduct;
