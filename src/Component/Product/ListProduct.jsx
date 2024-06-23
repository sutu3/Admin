import React, { useState } from 'react'
import TableProduct from "./tableProduct.jsx";
import Pagination from "./Pagination.jsx";
import Select from "../SelectInput/indext"
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
    const [currentPage, setCurrentPage] = useState(1);
    console.log(value)
  return (
    <div>
      <div className="flex flex-row">
                <div>
                <div><Select value={value} setValue={setValue} content={"Size"} data={['M','L','XL','2XL',]}/></div>
                  <div className="h-[550px]"><TableProduct products={products} number={currentPage} /></div>
                  <div className="w-full flex justify-center ">
                <Pagination
                  number={Math.ceil(products.length / 7)}
                  setCurrentPage={setCurrentPage}
                />
              </div>

                </div>
                <div className="w-full h-full bg-red-300">hehehe</div>
              </div>
    </div>
  )
}

export default ListProduct
