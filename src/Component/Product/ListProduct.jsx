import React, { useState } from "react";
import TableProduct from "./tableProduct.jsx";
import Pagination from "./Pagination.jsx";
import Select from "../SelectInput/indext";
import Modal from "../Modal/index.jsx";
import { useSelector } from "react-redux";
import { product } from "../Redux/selector.jsx";
import { toast } from "react-toastify";
const columns = [
  { name: "", uid: "checkbox" },  // Thêm cột cho checkbox
  { name: "ID", uid: "id" },
  { name: "Type", uid: "typeOfProduct" },
  { name: "Name", uid: "name" },
  { name: "State", uid: "state" },
  { name: "Material", uid: "materialProduct" },
  { name: "Created At", uid: "createdAt" },
  { name: "Updated At", uid: "updatedAt" },
  { name: "Updated By", uid: "userUpdate" },
  { name: "ACTIONS", uid: "actions" }
];
const ListProduct = () => {
  const Product = useSelector(product);

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
const [selected, setSelected] = useState([]);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(value);
  return (
    <div className="w-full h-full flex flex-col gap-10 ">
      <div className="w-full h-full flex flex-row">
        <div className="w-[85%] h-full flex flex-col">
          <div className="w-full h-[150px] flex flex-col">
            <div className="text-xl font-mono font-bold">Filter Product</div>
            <div className="w-full h-[100px] flex flex-row">
              <div>
                <Select
                  value={value}
                  setValue={setValue}
                  content={"Size"}
                  data={["M", "L", "XL", "2XL"]}
                />
              </div>
              <div>
                <Select
                  value={value1}
                  setValue={setValue1}
                  content={"Color"}
                  data={["green", "yellow", "blue", "red"]}
                />
              </div>
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
          </div>
          <div className="h-[600px] -translate-y-10">
            <TableProduct
            setnumber={setCurrentPage}
            selected={selected}
            setSelected={setSelected}
            columns={columns}
              products={Product.map((el) => ({
                id: el.product_id,
                typeOfProduct: el.type,
                name: el.name,
                state: el.state,
                materialProduct: el.materialProduct,
                createdAt: el.created_at.split('T')[0],
                updatedAt: el.updated_at,
                userUpdate: "John Doe",
              }))}
              number={currentPage}
            />
          </div>
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
          <div className="w-[90%]">
            <Modal
            //notify={notify}
              contentButton={"Delete Variant"}
              title={"Delete Product"}
              content={
                "Bạn Có Muốn Xác Nhận xóa Sản Phẩm Với Id:01 Tên:Product1 Không?"
              }
            />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center ">
        <Pagination
          number={Math.ceil(Product.length / 7)}
          setCurrentPage={setCurrentPage}
        />
      </div> */}
      
    </div>
  );
};

export default ListProduct;