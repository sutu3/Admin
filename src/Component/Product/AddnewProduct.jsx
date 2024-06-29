// import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Textarea } from "@nextui-org/react";
// import React, { useRef, useState } from "react";
// import { Test } from "../Redux/ProductSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Type } from "../Redux/selector";
// const AddnewProduct = () => {
//   const type = useSelector(Type);
//   console.log(type.filter((el) => el.typeofproductgender === "Nam"));
//   const datamaterial=['Cotton','Lanh','Len','Dây gai','Nylon']
//   const [typevalue, setType] = useState(-1);
//   const [material,setmaterial]=useState('')


//   const dispatch=useDispatch()
//   const fileInputRef = useRef(null);

//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };
//     const handleSelectionChange = (keys) => {
//     const selectedKey = Array.from(keys)[0]; // Lấy giá trị duy nhất đã chọn
//     setType(selectedKey); // Cập nhật giá trị state với giá trị đã chọn
//   };

//   const handleFileChange = async(e) => {
// const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     console.log(file)
//     await dispatch(Test(formData))
//     // if (file) {

//     // fetch('http://localhost:3000/upload', {
//     //   method: 'POST',
//     //   body: formData,
//     // })
//     // .then(response => response.json())
//     // .then(data => {
//     //   console.log('Success:', data);
//     // })
//     // .catch(error => {
//     //   console.error('Error:', error);
//     // });
//     // Xử lý file ở đây, ví dụ: upload file lên server, hiển thị thông tin file, ...
//   };
//   return (
//     <div className="w-[1250px] h-full flex flex-row ">
//       <div className="w-[70%] h-full flex flex-col bg-[#f5f7fa] rounded-lg shadow-inner">
//         <div className="w-full h-[100px] flex flex-row gap-7 p-4">
//           <div className="w-[40%] h-full flex flex-col">
//             <div className="font-mono text-xl font-bold text-start mb-2">
//               ProductImages <span className="text-red-500">*</span>{" "}
//             </div>
//             <div  className="font-mono text-xs text-slate-500 w-[100%] text-start">
//               Make your fashion products look more attractive with 3-4 photos
//             </div>
//           </div>
//           <div className="w-full h-full flex flex-row gap-5">
//             <div>
//               <Image className="w-20 h-20 rounded-xl" src="https://htmediagroup.vn/wp-content/uploads/2021/12/Ao-pijama-6-min.jpg"/>
//             </div>
//              <div>
//               <Image className="w-20 h-20 rounded-xl" src="https://htmediagroup.vn/wp-content/uploads/2021/12/Ao-pijama-6-min.jpg"/>
//             </div>
//             <div>
//               <Image className="w-20 h-20 rounded-xl" src="https://htmediagroup.vn/wp-content/uploads/2021/12/Ao-pijama-6-min.jpg"/>
//             </div>
//             <div className="h-full flex w-48 justify-end items-center pr-3">
//               <div
//                 className="h-16 border-[#83a3ff] border-dashed font-[500] hover:bg-[#f1f8fe] border-2 transition duration-150 ease-in-out w-24  text-[#83a3ff] bg-[#fbfcfd] rounded-xl flex justify-center items-center"
//                 onClick={handleFileUpload}
//               >
//                + Upload
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-[100px] flex flex-row gap-7 p-4">
//           <div className="w-[40%] h-full flex flex-col">
//             <div className="font-mono text-xl font-bold text-start mb-2">
//               Product Name<span className="text-red-500">*</span>{" "}
//             </div>
//             <div  className="font-mono text-xs text-slate-500 w-[100%] text-start">
//               Add Product Title that buyer would likely use to search
//             </div>
//           </div>
//           <div className="w-full h-full flex flex-row justify-center items-center">
//             <Textarea
//                 isDisabled
//                 labelPlacement="outside"
//                 placeholder="Enter your description"
//                 className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
//               />

//           </div>
//         </div>
//         <div className="w-full h-[100px] flex flex-row gap-7 p-4">
//           <div className="w-[40%] h-full flex flex-col">
//             <div className="font-mono text-xl font-bold text-start mb-2">
//               Product Description<span className="text-red-500">*</span>{" "}
//             </div>
//             <div  className="font-mono text-xs text-slate-500 w-[100%] text-start">
//               Add Product Title that buyer would likely use to search
//             </div>
//           </div>
//           <div className="w-full h-full flex flex-row justify-center items-center">
//             <Textarea
//                 isDisabled
//                 labelPlacement="outside"
//                 placeholder="Enter your description"
//                 className="w-full text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
//               />

//           </div>
//         </div>
//         <div className="w-full h-[100px] flex flex-row gap-7 p-4">
//           <div className="w-[40%] h-full flex flex-col">
//             <div className="font-mono text-xl font-bold text-start mb-2">
//               Category<span className="text-red-500">*</span>{" "}
//             </div>
//             <div  className="font-mono text-xs text-slate-500 w-[100%] text-start">
//               Choose The Category and the Gender change the State
//             </div>
//           </div>
//           <div className="w-full h-full flex flex-row justify-center items-center">
//             <div>
            
//               <Dropdown backdrop="blur">
//                 <DropdownTrigger>
//                   <Button variant="bordered" className="capitalize w-40 border-2 border-slate-300">
//                     {typevalue!=-1?type.find((el) => el.typeofproduct_id == typevalue).typeofproduct : ' Type'}
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu
//                   aria-label="Single selection example"
//                   variant="flat"
//                   closeOnSelect={true}
//                   disallowEmptySelection
//                   selectionMode="single"
//                   selectedKeys={[typevalue]}
//                   onSelectionChange={handleSelectionChange}
//                   className="max-h-[200px] overflow-auto"
//                 >
//                   {type.map((el) => (
//                     <DropdownItem key={el.typeofproduct_id}>
//                       {`${el.typeofproduct}`}
//                     </DropdownItem>
//                   ))}
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//             <div>

//             </div>
//           </div>
//         </div>
//       </div>
//       <div>sdf</div>
//     </div>
//   );
// };

// export default AddnewProduct;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Test } from "../Redux/ProductSlice";
const AddnewProduct = () => {
  const dispatch=useDispatch()
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append('idproduct', 1);
    const result = await dispatch(Test(formData))
    console.log(result)
    setMessage(result.payload)
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <img src={message}/>}
    </div>
  );
};

export default AddnewProduct;