import React, { useState } from "react";
import TableProduct from "./tableProduct.jsx";
import Pagination from "./Pagination.jsx";
import Select from "../SelectInput/indext";
import Modal from "../Modal/index.jsx";
const products = [
  {
    id: 1,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 2,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 3,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 4,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 5,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 6,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 7,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 8,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 9,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 10,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 11,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  {
    id: 12,
    typeOfProduct: "Electronics",
    name: "Smartphone",
    state: "Active",
    materialProduct: "Plastic",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    userUpdate: "John Doe",
  },
  // ... Các sản phẩm khác
];
const ListProduct = () => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(value);
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-full flex flex-row">
        <div className="w-[85%] h-full flex flex-col">
            <div className="w-full h-[150px] flex flex-col">
                <div className='text-xl font-mono font-bold'>Filter Product</div>
                <div className="w-full h-[100px] flex flex-row">
                    <div><Select value={value} setValue={setValue} content={"Size"} data={['M','L','XL','2XL',]}/></div>
                    <div><Select value={value1} setValue={setValue1} content={"Color"} data={['green','yellow','blue','red',]}/></div>
                    <div><Select value={value2} setValue={setValue2} content={"Type"} data={['Áo Khoát Nam','Áo Thun','Quần Đùi','Quân Jear',]}/></div>
                    <div><Select value={value3} setValue={setValue3} content={"Gender"} data={['Nam','Nữ','Unisex',]}/></div>
                </div>
            </div>
            <div className="h-[600px] -translate-y-10"><TableProduct products={products} number={currentPage} /></div>
        </div>
        <div className="w-[20%] mt-40 flex flex-col gap-5 items-center">
          <div className="w-[90%]">
            <Modal
              contentButton={"Delete Product"}
              title={"Delete Product"}
              content={
                "Bạn Có Muốn Xác Nhận xóa Sản Phẩm Với Id:01 Tên:Product1 Không?"
              }
            />
          </div>
          <div  className="w-[90%]">
            <Modal
              contentButton={"Delete Variant"}
              title={"Delete Product"}
             
              content={
                "Bạn Có Muốn Xác Nhận xóa Sản Phẩm Với Id:01 Tên:Product1 Không?"
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <Pagination
          number={Math.ceil(products.length / 7)}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ListProduct;
