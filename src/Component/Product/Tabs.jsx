import {useState} from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import TableProduct from './tableProduct.jsx'
import Createproduct from './CreatePeoduct.jsx'
import Pagination from './Pagination.jsx'
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
  }
  // ... Các sản phẩm khác
];
export default function App() {
    const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" placement="start"  className="hide-scrollbar"  key="primary" color="primary">
        <Tab key="photos" title="Product List" className="w-full">
          <Card>
            <CardBody>
            <div className="h-[500px]"><TableProduct products={products} number={currentPage}/></div>
            <div className="w-full flex justify-center "><Pagination number={Math.ceil(products.length/10)} setCurrentPage={setCurrentPage}/></div>      
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Add New Project" className="w-full">
          <Card>
            <CardBody>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}
