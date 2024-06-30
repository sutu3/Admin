import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Image,
  Textarea,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  select,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { Test, CreateOfProduct } from "../Redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Type, Gender, Size } from "../Redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
const columns1 = [
  { name: "", uid: "checkbox" }, // Thêm cột cho checkbox
  { name: "Product Name", uid: "name" },
  { name: "Size", uid: "size" },
  { name: "Color", uid: "color" },
  { name: "Price", uid: "price" },
];
const AddnewProduct = () => {
  const [selected, setSelected] = useState([]);
  const type = useSelector(Type);
  const [color, setcolor] = useState("#fff");
  const genderdata = useSelector(Gender);
  const sizedata = useSelector(Size);
  const datamaterial = ["Cotton", "Lanh", "Len", "Dây gai", "Nylon"];
  const [typevalue, setType] = useState(-1);
  const [material, setmaterial] = useState("");
  const [display, setdisplay] = useState(true);
  const [gender, setgender] = useState("");
  const [imge, setimage] = useState([]);
  const [size, setsize] = useState([]);
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [btn, setbtn] = useState([]);
  const [price, setprice] = useState(0);
   const dispatch = useDispatch();
  const fileInputRef = useRef(null);
 
  const handleSelectionChangeSize = (selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);

    // Tạo mảng mới từ selectedArray và kết hợp với color hiện tại nếu tồn tại
    const arr = selectedArray.map((el) => {
      const existingSize = size.find((el1) => el1.size === el);
      if (existingSize) {
        return { size: el, color: existingSize.color };
      } else {
        return { size: el, color: [] };
      }
    });

     setsize(arr);
  };

  useEffect(() => {
   }, [btn, imge]);
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0]; // Lấy giá trị duy nhất đã chọn
    setType(selectedKey); // Cập nhật giá trị state với giá trị đã chọn
  };
  const handleSelectionChangeGender = (keys) => {
    const selectedKey = Array.from(keys)[0]; // Lấy giá trị duy nhất đã chọn
    setgender(selectedKey); // Cập nhật giá trị state với giá trị đã chọn
  };
  const handleSelectionChangeMaterial = (keys) => {
    const selectedKey = Array.from(keys)[0]; // Lấy giá trị duy nhất đã chọn
    setmaterial(selectedKey); // Cập nhật giá trị state với giá trị đã chọn
  };
  const inputChangeImage = (e) => {
    if (imge.length < 3) {
      if (e.target.files && e.target.files[0]) {
        setimage((prevImages) => [...prevImages, e.target.files[0]]);
      }
    } else {
      toast.info(`${"Maximun to add picture"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
     await dispatch(Test(formData));
    // if (file) {

    // fetch('http://localhost:3000/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
    // Xử lý file ở đây, ví dụ: upload file lên server, hiển thị thông tin file, ...
  };
  return (
    <div className="w-[1250px] h-full flex flex-col gap-3">
      <div className="flex flex-row w-full justify-end gap-4">
        <Button
          disabled={display}
          onClick={() => {
            setdisplay(true);
          }}
        >
          Pre
        </Button>
        <Button
          disabled={!display}
          onClick={() => {
            if (imge.length < 2) {
              toast.info(`${"Enter Your 3 Picture Product"}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            } else {
              if (name == "") {
                toast.info(`${"Enter Your Name Product"}`, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                if (description == "") {
                  toast.info(`${"Enter Your Description  Product"}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  if (typevalue == -1) {
                    toast.info(`${"Choose Your Type Product"}`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    if (gender == "") {
                      toast.info(`${"Choose Your Gender Product"}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                    } else {
                      if (material == "") {
                        toast.info(`${"Choose Your Material Product"}`, {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                        });
                      } else {
                        if (size.length == 0) {
                          toast.info(`${"Enter Your Size Product"}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                          });
                        } else {
                           if (size.find((el) => el.color.length == 0)) {
                            toast.info(`${"Choose Your Color Product"}`, {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                            });
                          } else {
                            const arr = size.flatMap((el) =>
                              el.color.map((el1) => ({
                                size: el.size,
                                color: el1,
                                price: "",
                              }))
                            );
                            const arr1 = arr.map((el) => {
                              const find = categories.find(
                                (el1) =>
                                  el1.color == el.color && el1.size == el.size
                              );
                              if (find) {
                                return { ...el, price: find.price };
                              } else {
                                return el;
                              }
                            });
                            setcategories(arr1);
                            setdisplay(false);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }}
        >
          Next
        </Button>
      </div>
      {display ? (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-[1250px] h-full flex flex-row gap-3">
            <div className="w-[70%] h-full flex flex-col bg-[#f5f7fa] rounded-lg shadow-inner">
              <div className="w-full h-[100px] flex flex-row gap-7 p-4">
                <div className="w-[40%] h-full flex flex-col">
                  <div className="font-mono text-xl font-bold text-start mb-2">
                    ProductImages <span className="text-red-500">*</span>{" "}
                  </div>
                  <div className="font-mono text-xs text-slate-500 w-[100%] text-start">
                    Make your fashion products look more attractive with 3-4
                    photos
                  </div>
                </div>
                <div className="w-full h-full flex flex-row gap-5">
                  {imge.map((el, index) => {
                    return (
                      <div key={el}>
                        <Tooltip
                          offset={-20}
                          placement="top-end"
                          content={
                            <FontAwesomeIcon
                              onClick={() => {
                                const newArr = imge
                                  .map((el1, index1) => {
                                    if (index !== index1) {
                                      return el1;
                                    }
                                    return null; // or whatever value you want to use for the index you want to remove
                                  })
                                  .filter((el) => el !== null);
                                setimage(newArr);
                              }}
                              icon={faXmark}
                              style={{ color: "#da0707" }}
                            />
                          }
                        >
                          <Image
                            className="w-20 h-20 rounded-xl"
                            src={URL.createObjectURL(el)}
                          />
                        </Tooltip>
                      </div>
                    );
                  })}
                  <div className="h-full flex w-56 justify-end items-center pr-3">
                    <div
                      className="h-16 border-[#83a3ff] w-full border-dashed font-[500] hover:bg-[#f1f8fe] border-2 transition duration-150 ease-in-out   text-[#83a3ff] bg-[#fbfcfd] rounded-xl flex justify-center items-center"
                      onClick={handleFileUpload}
                    >
                      + Upload
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={inputChangeImage}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[100px] flex flex-row gap-7 p-4">
                <div className="w-[40%] h-full flex flex-col">
                  <div className="font-mono text-xl font-bold text-start mb-2">
                    Product Name<span className="text-red-500">*</span>{" "}
                  </div>
                  <div className="font-mono text-xs text-slate-500 w-[100%] text-start">
                    Add Product Title that buyer would likely use to search
                  </div>
                </div>
                <div className="w-full h-full flex flex-row justify-center items-center">
                  <Textarea
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="w-full h-[40px] text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                  />
                </div>
              </div>
              <div className="w-full h-[100px] flex flex-row gap-7 p-4">
                <div className="w-[40%] h-full flex flex-col">
                  <div className="font-mono text-xl font-bold text-start mb-2">
                    Product Description<span className="text-red-500">*</span>{" "}
                  </div>
                  <div className="font-mono text-xs text-slate-500 w-[100%] text-start">
                    Add Product Title that buyer would likely use to search
                  </div>
                </div>
                <div className="w-full h-full flex flex-row justify-center items-center">
                  <Textarea
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    value={description}
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="w-full text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                  />
                </div>
              </div>
              <div className="w-full h-[100px] flex flex-row gap-7 p-4">
                <div className="w-[40%] h-full flex flex-col">
                  <div className="font-mono text-xl font-bold text-start mb-2">
                    Category<span className="text-red-500">*</span>{" "}
                  </div>
                  <div className="font-mono text-xs text-slate-500 w-[100%] text-start">
                    Choose The Category and the Gender change the State
                  </div>
                </div>
                <div className="w-full h-full flex flex-row justify-center items-center gap-3">
                  <div>
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-40 border-2 border-slate-300"
                        >
                          {typevalue != -1
                            ? type.find(
                                (el) => el.typeofproductnew_id == typevalue
                              ).typeofproduct
                            : " Type"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        closeOnSelect={true}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={[typevalue]}
                        onSelectionChange={handleSelectionChange}
                        className="max-h-[200px] overflow-auto"
                      >
                        {type.map((el) => (
                          <DropdownItem key={el.typeofproductnew_id}>
                            {`${el.typeofproduct}`}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-40 border-2 border-slate-300"
                        >
                          {gender != ""
                            ? genderdata.find(
                                (el) => el.typeofproductgender_id == gender
                              ).typeofproductgender
                            : " Gender"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        closeOnSelect={true}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={[gender]}
                        onSelectionChange={handleSelectionChangeGender}
                        className="max-h-[200px] overflow-auto"
                      >
                        {genderdata.map((el) => (
                          <DropdownItem key={el.typeofproductgender_id}>
                            {`${el.typeofproductgender}`}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-40 border-2 border-slate-300"
                        >
                          {material != "" ? material : "Material"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        closeOnSelect={true}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={[material]}
                        onSelectionChange={handleSelectionChangeMaterial}
                        className="max-h-[200px] overflow-auto"
                      >
                        {datamaterial.map((el) => (
                          <DropdownItem key={el}>{`${el}`}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="w-full h-[100px] flex flex-row gap-7 p-4">
                <div className="w-[40%] h-full flex flex-col">
                  <div className="font-mono text-xl font-bold text-start mb-2">
                    Size Varient<span className="text-red-500">*</span>{" "}
                  </div>
                  <div className="font-mono text-xs text-slate-500 w-[100%] text-start">
                    Choose the size to sales for buyer
                  </div>
                </div>
                <div className="w-full h-full flex flex-row justify-between items-center">
                  <div>
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-40 border-2 border-slate-300"
                        >
                          Choose Size
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Multiple selection example"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={size.map((el) => el.size)}
                        onSelectionChange={handleSelectionChangeSize}
                      >
                        {sizedata.map((el) => (
                          <DropdownItem key={el.size_id} value={el.size_id}>
                            {el.size_name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex flex-row gap-2 flex-wrap ml-2">
                    {size.map((el) => (
                      <Button
                        onClick={() => {
                           if (btn.findIndex((el1) => el1 === el.size) === -1) {
                            const arr = [...btn, el.size];
                             setbtn(arr);
                          } else {
                            const arr = btn.filter((el1) => el1 !== el.size);
                            setbtn(arr);
                          }
                        }}
                        className={`${
                          btn.findIndex((el1) => el1 == el.size) != -1
                            ? "bg-[#edeefa] text-[#717ddd] border-[#717ddd]"
                            : "text-black border-slate-300"
                        }   border-[2px]  `}
                      >
                        {
                          sizedata.find((el1) => el1.size_id == el.size)
                            .size_name
                        }
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f7fa] w-[30%] h-[400px] flex flex-col shadow-inner shadow-slate-300 rounded-lg">
              <div className="p-2 font-mono text-xl font-bold mb-2">
                Product Color
              </div>
              <div className="flex flex-col gap-4">
                <div className=" flex flex-row w-full p-2">
                  <input
                    type="text"
                    id=""
                    className="p-1 w-[180px] rounded-lg border-2 border-slate-200"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => {
                      setcolor(e.target.value);
                    }}
                  />
                  <div
                    className="w-40 rounded-lg flex m-auto "
                    style={{
                      backgroundColor: color,
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  >
                    Color: {color}
                  </div>
                </div>
                <HexColorPicker
                  color={color}
                  className="flex justify-center w-full translate-x-20"
                  onChange={setcolor}
                />
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => {
                    const updatedSizes = size.map((el) => {
                      if (btn.includes(el.size)) {
                        if (!el.color.includes(color)) {
                          return { ...el, color: [...el.color, color] };
                        }
                      }
                      return el;
                    });

                     setsize(updatedSizes);
                  }}
                  className="w-56 font-[600] border-[#83a3ff] border-dashed border-2 text-[#83a3ff] bg-white"
                >
                  Add Color
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            {size.map((el) => (
              <div className="w-full h-full flex flex-row gap-3">
                <div className="h-full w-[150px] text-start flex items-center">
                  Color Size{" "}
                  {sizedata.find((el1) => el1.size_id == el.size).size_name}:
                </div>
                <div className="w-full h-full flex flex-row gap-3">
                  {" "}
                  {el.color.map((color) => (
                    <div
                      className={`w-20 h-10 rounded-lg bg-[${color}]`}
                      style={{ backgroundColor: color }}
                    >
                      <div className=" hover:text-red-500 justify-end w-[90%] h-full items-center pr-2 flex">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => {
                            const updatedSizes = size.map((el1) => {
                              if (
                                el1.size === el.size &&
                                el1.color.includes(color)
                              ) {
                                return {
                                  ...el1,
                                  color: el1.color.filter(
                                    (el2) => el2 !== color
                                  ),
                                };
                              }
                              return el1;
                            });
                            setsize(updatedSizes);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[1250px] h-full flex flex-row">
          <div className="w-[70%] flex flex-col gap-3">
            <div className="w-full justify-between flex">
              <Button
                onPress={() => {
                  if (selected.length == 0) {
                    const arr1 = categories.map((el) => ({
                      size: el.size,
                      color: el.color,
                    }));
                    setSelected(arr1);
                  } else {
                    setSelected([]);
                  }
                }}
                radius="lg"
                className={`border-2 p-2 border-[#5eb2f6] bg-[#FFFFFF] font-mono w-28 hover:border-white text-[#1A202C] text-sm hover:text-white  hover:bg-[#88c1ff]`}
              >
                Select All
              </Button>
              <div className="gap-2 flex flex-row justify-center h-full">
                <input
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                  type="number"
                  placeholder="Enter Base Price"
                  className=" border-[2px] border-slate-300 rounded-lg p-1 pl-3"
                />
                <Button
                  onClick={() => {
                    const arr = categories.map((el) => {
                      const found = selected.find(
                        (el1) => el.size === el1.size && el.color === el1.color
                      );
                      if (found) {
                        return { ...el, price: price };
                      } else {
                        return el;
                      }
                    });
                     setcategories(arr);
                  }}
                  className={`border-2 p-2 border-[#4d5bd4] border-dashed hover:border-solid bg-[#FFFFFF] font-mono w-28 hover:border-white text-[#1A202C] text-sm hover:text-white  hover:bg-[#4d5bd4]`}
                >
                  appreciation
                </Button>
              </div>
            </div>
            <Table
              color={"secondary"}
              selectionMode="single"
              defaultSelectedKeys={["2"]}
              aria-label="Example static collection table"
              className="bg-white shadow-md rounded-md border-[2px] border-slate-300"
            >
              <TableHeader columns={columns1}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    className="text-[#71717a] bg-[#f4f4f5] p-3"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {categories.map((el, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-blue-100"
                    onClick={() => {
                      const isExist = selected.find(
                        (el1) => el1.size === el.size && el1.color === el.color
                      );

                      if (isExist) {
                        // Nếu phần tử đã tồn tại, xóa nó khỏi mảng selected
                        const updatedSelected = selected.filter(
                          (el2) =>
                            !(el2.size === el.size && el2.color === el.color)
                        );
                        setSelected(updatedSelected);
                      } else {
                        // Nếu phần tử chưa tồn tại, thêm nó vào mảng selected
                        setSelected([
                          ...selected,
                          { size: el.size, color: el.color },
                        ]);
                      }
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        isSelected={selected.some(
                          (selectedItem) =>
                            selectedItem.size === el.size &&
                            selectedItem.color === el.color
                        )}
                      />
                    </TableCell>
                    <TableCell className="w-72">{name}</TableCell>
                    <TableCell>
                      {" "}
                      {sizedata.find((el1) => el1.size_id == el.size).size_name}
                    </TableCell>
                    <TableCell>
                      <div
                        className="w-20 h-12 rounded-xl"
                        style={{ backgroundColor: el.color }}
                      ></div>
                    </TableCell>
                    <TableCell>{el.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* <TableProduct
            
            setnumber={setCurrentPage1}
            selected={selected}
            setSelected={setSelected}
            columns={columns1}
              products={categories.map((el,index) => ({
                id:index,
                name:name,
                size:el.size,
                color:el.color,
                price:el.purchase_price,
              }))}
              number={currentPage1}
            /> */}
          </div>
          <div className="w-[30%] flex justify-end mt-10">
            <Button
              onClick={async () => {
                await dispatch(
                  CreateOfProduct({
                    name: name,
                    description: description,
                    state: "new",
                    material: material,
                    type: typevalue,
                    gender: gender,
                    account_id: 2,
                    categories: categories,
                    price: price,
                    image: imge,
                    
                  })
                );
              }}
              className="w-[80%]"
            >
              Add Product
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddnewProduct;
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Test } from "../Redux/ProductSlice";
// const AddnewProduct = () => {
//   const dispatch=useDispatch()
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append('idproduct', 1);
//     const result = await dispatch(Test(formData))
//     console.log(result)
//     setMessage(result.payload)
//   };

//   return (
//     <div>
//       <h1>Upload File</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <img src={message}/>}
//     </div>
//   );
// };

// export default AddnewProduct;
