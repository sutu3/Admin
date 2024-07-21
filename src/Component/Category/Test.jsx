import React, { useState } from "react";  
import { ExpandMore, ExpandLess } from "@mui/icons-material";  
import { useSelector } from "react-redux";  
import { Inventory, product, Quantity } from "../Redux/selector";  
import { parseDate } from "@internationalized/date";  
import { Pagination, User } from "@nextui-org/react";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faStore } from "@fortawesome/free-solid-svg-icons";
// Component hiển thị thông tin cho child  
const ChildNode = ({ child, parentName }) => {  
  return (  
    <div className="pl-4">  
      {/* Thanh Header cho ChildNode */}  
      <div className="flex flex-row p-2 bg-green-100  rounded-md mb-2 mt-2 justify-between"> 
             <div key="Time">Time</div>
        <div key="IDVariant">IDVariant</div>
        <div key="sizeColor">size/Color</div>
        <div key="amount">amount</div>
        <div key="icon"></div>
        <div key="change_amount">change_amount</div>
        <div key="reason">reason</div>
      </div>  
      <div className="flex flex-row p-2 bg-gray-50 rounded-md border-[2px] border-slate-200 hover:bg-gray-200 transition">  
        <span className="ml-2 flex flex-row justify-between items-center w-full">  
          <div className="text-gray-600"> {child.time.split('T')[0]} <br /> {child.time.split('T')[1]}  
          </div>  
          <div className="text-gray-600">{child.idInventory}</div>   
          <div className="text-gray-600 flex flex-row items-center">  
            {child.sizeColor.split('/')[0]}   
            <div className="w-8 ml-1 h-5 rounded-lg" style={{backgroundColor: child.sizeColor.split('/')[1]}}></div>  
          </div>  
          <div className="text-gray-600">{child.amount}</div>  
          <div className="text-gray-600">  
            {child.icon ?<FontAwesomeIcon icon={faArrowRight} style={{color: "#f63b5e",}} />:<FontAwesomeIcon icon={faArrowLeft} style={{color: "#63E6BE",}} />}  
          </div>  
          <div className="text-gray-600">{child.change_amount}</div>   
          <div className="text-gray-600">{child.reason}</div>   
        </span>  
      </div>  
    </div>  
  );  
};  
// time: el1.time,  
//             amount: el2.amount,  
//             change_amount: el2.change_amount,  
//             idInventory: el2.idInventory,  
//             reason: el2.reason,
//             icon: (el2.reason === 'Giao hàng thành công'||el2.reason ==='Đang_giao_hàng')?true:false,
//             sizeColor: el2.sizeColor,  
//             idVariant: el2.idVariant,  
const TreeNode = ({ node }) => {  
  const [isOpen, setIsOpen] = useState(true);  
  return (  
    <div className="ml-4">  
      <div className="flex flex-row p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">  
        <button  
          className="flex items-center focus:outline-none w-full"  
          onClick={() => setIsOpen(!isOpen)}  
        >  
          {node.children.length > 0 &&  
            (isOpen ? <ExpandLess /> : <ExpandMore /> )}  
          <span className="ml-2 flex flex-row justify-between items-center w-full">  
            <User  
              aria-label="user"  
              avatarProps={{ radius: "full", size: "sm", src: node.avatar }}  
              classNames={{  
                description: "text-default-500",  
              }}  
              description={node.id}  
              name={node.name}  
            />  
            <div className="text-gray-600">{node.type}</div>  
            <div className="ml-2 text-gray-600">{node.gender}</div>  
            <div className="ml-2 text-gray-600">{node.quantity}</div>  
          </span>  
        </button>  
      </div>  
      {isOpen && (  
        <div className="pl-4 border-l-2 border-gray-300 mt-2">  
          {node.children.length > 0 ? (  
            node.children.map((child) => (  
              // Kiểm tra kiểu của child  
              typeof child.amount !== 'undefined' ? (  
                <ChildNode key={child.idInventory} child={child} />  
              ) : (  
                <TreeNode key={child.id} node={child} />  
              )  
            ))  
          ) : (  
            <div className="pl-2 text-gray-500">No details available</div>  
          )}  
        </div>  
      )}  
    </div>  
  );  
};  

const Tree = ({ data }) => {  
  return (  
    <div className="w-full mx-auto">  
      {data.map((node) => (  
        <TreeNode key={node.id} node={node} />  
      ))}
      
    </div>  
  );  
};  

const App = ({value}) => {  
  const Product = useSelector(product);  
  const quantity = useSelector(Quantity);  
  const inventory = useSelector(Inventory);  
  const [number, setnumber] = useState(1);
  console.log(value);  

  const inventoryDate = inventory[value.toString()];  
  const filterProduct = !inventoryDate  
    ? []  
    : Object.entries(inventoryDate).map((el) => ({  
        time: el[0],  
        data: el[1],  
      }));  

  console.log(filterProduct);  

  const users = Product.map((el) => {  
    const children = filterProduct.flatMap((el1) =>  
      el1.data.map((el2) => {  
        if (el2.idproduct === el.product_id) {  
          return {  
            time: el1.time,  
            amount: el2.amount,  
            change_amount: el2.change_amount,  
            idInventory: el2.idInventory,  
            reason: el2.reason,
            icon: (el2.reason === 'Giao hàng thành công'||el2.reason ==='Đang_giao_hàng')?true:false,
            sizeColor: el2.sizeColor,  
            idVariant: el2.idVariant,  
            // Thêm các node con khác tại đây  
            children: [] // Nếu không có children, luôn đảm bảo giá trị là mảng  
          };  
        } else {  
          return null;  
        }  
      })  
    ).filter((el1) => el1 !== null);  

    return {  
      id: el.product_id,  
      name: el.name,  
      type: el.type,  
      gender: el.gender,  
      quantity: quantity[el.product_id]  
        ? Object.entries(quantity[el.product_id]).reduce(  
            (acc, el) => acc + el[1],  
            0  
          )  
        : 0,  
      avatar: el.imagesMap[0].image_urlString,  
      children: children.length > 0 ? children : [],  
    };  
  });  

  console.log(users);  

  return (  
    <div className="p-4  w-full"> 
      <Pagination
                  isCompact
                  showControls
                  showShadow
                  classNames={{
                    cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl ",
                  }}
                  color="secondary"
                  // className="text-blue-500 border-slate-400 rounded-md"
                  page={number}
                  total={Math.ceil(users.length / 5)}
                  onChange={(page) => setnumber(page)}
                />   
      <Tree data={users.slice((number - 1) * 5, (number - 1) * 5 + 5)} /> 
    </div>  
  );  
};  

export default App;