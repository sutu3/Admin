import React, { useRef, useState } from "react";
import { Infor } from "../Redux/selector";
import { useSelector,useDispatch } from "react-redux";
import { Image, User,Button, Input, DropdownMenu, Dropdown, DropdownTrigger, DropdownItem, DateInput, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faImage, faImages } from "@fortawesome/free-solid-svg-icons";
import { CalendarDate, parseDate } from "@internationalized/date";
import { UpdateInforUser } from "../Redux/CustummerSlice";
import { toast } from "react-toastify";
const Index = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const infor = useSelector(Infor);
  const [user,setuser]=useState(infor);
  const [loading,setloading]=useState(false)
  const [address,setaddress]=useState(infor.addresses?infor.addresses[0]:{state:'',city:'',country:''});
  const [imge, setimage] = useState();
  const fileInputRef = useRef(null);
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleSelectionChange = (key) => {
    console.log(key)
    setuser({ ...user, gender: key });
  };
   const inputChangeImage = (e) => {
     setimage( e.target.files[0]);
  };
  const handleActionClick= async()=>{
    setloading(true)
    await dispatch(UpdateInforUser({
      user:user,
      address:address,
      image:imge
    }))
    setloading(false)
    onClose()
    toast.success(`Action Change complete`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
  }
  return (
    <div className="w-[1350px] h-full translate-x-10 flex flex-row mt-10">
      <div className="w-[30%] h-full flex flex-col p-4">
        <div className="pb-3">
          <Image
            width={150}
            height={150}
            radius="full"
            classNames={{ img: "rounded-full" }}
            src={imge?URL.createObjectURL(imge):user.avatarString}
            fallbackSrc="https://via.placeholder.com/300x200"
            alt="NextUI Image with fallback"
          />
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Position</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {user.role}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">UserName</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {user.username}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Email</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {user.email}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Contract No</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {user.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Ardess</div>
          <div className="text-slate-400 text-lg font-[200] font-mono w-44 text-left ">
            {`${address.state},${address.city},${address.country}`
              }
          </div>
        </div>
      </div>
      <div className="w-[60%] h-full flex flex-col p-4 shadow-md mt-10 border-slate-300 border-[2px] rounded-lg shadow-slate-300">
        <div className="flex flex-row w-full items-end justify-end">
          <div className="w-1/2 flex flex-row shadow-inner justify-around items-center shadow-slate-300 rounded-xl p-2">
            <User
              className="font-bold font-mono"
              avatarProps={{
                radius: "full",
                size: "lg",
                src: user.avatarString
                  ? imge?URL.createObjectURL(imge):user.avatarString
                  : "https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-admin-rolls-glyph-black-icon-png-image_691507.jpg",
              }}
              classNames={{
                description: "text-default-500",
              }}
              description={infor.email}
              name={infor.username}
            >
              {infor.email}
            </User>
            <div className="h-full flex w-56 justify-end items-center pr-3">
                    <div
                      className="h-10 border-[#83a3ff] w-[100px] border-dashed font-[500] hover:bg-[#f1f8fe] border-2 transition duration-150 ease-in-out   text-[#83a3ff] bg-[#fbfcfd] rounded-xl flex justify-center items-center"
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
        <div className="w-full flex flex-row mt-16 justify-around">
        <div className="w-1/2 flex justify-center items-center">
          <Input
              value={user.username}
              onChange={(e)=>{setuser({...user,username:e.target.value})}}
              type="text"
              label="Name"
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[280px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Input
              type="email"
              label="Email"
              disabled
              value={user.email}
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[280px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        </div>
        <div className="w-full flex flex-row mt-10 justify-around">
        <div className="w-1/2 flex justify-start items-center">
          <DateInput
          label="Date "
          className="w-[89%]"
          labelPlacement={'outside-left'}
          classNames={{inputWrapper:'border-[2px] border-slate-300 rounded-lg',label:'pr-6'}}
          defaultValue={parseDate(user.dayOfBirth)} 
          onChange={(e)=>setuser({...user,dayOfBirth:(e).toString()})}
          placeholderValue={new CalendarDate(1995, 11, 6)} 
          endContent={
           <FontAwesomeIcon icon={faCalendar} style={{color: "#74C0FC",}} />
          }
        />
        </div>
        <div className="w-1/2 flex flex-row gap-8 justify-start items-center">
        <div>I'm</div>
          <Dropdown backdrop="blur" >
      <DropdownTrigger>
        <Button className="border-[2px] border-slate-300"
          variant="bordered" 
        >
          {user.gender}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Static Actions" 
      selectedKeys={[user.gender]}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
        >
        <DropdownItem key="Nam">Nam</DropdownItem>
        <DropdownItem key="Nữ">Nữ</DropdownItem>
        <DropdownItem key="Khác">Khác</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
        </div>
         <div className="w-full flex flex-row mt-10 justify-around">
        <div className="w-1/2 flex justify-center items-center">
          <Input
              type="text"
              label="Phone"
              className=""
              value={user.phoneNumber}
              onChange={(e)=>setuser({...user, phoneNumber: e.target.value})}
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[280px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Input
              type="text"
              label="Pass"
              value={user.password}
              onChange={(e)=>setuser({...user, password: e.target.value})}
              disabled
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[280px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        
        </div>
        <div className="w-full flex flex-row mt-10 justify-around">
        <div className="w-1/3 flex justify-center items-center">
          <Input
              type="text"
              label="Address"
              value={address.state}
              onChange={(e)=>setaddress({...address,state:e.target.value})}
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[180px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Input
              type="text"
              label="district"
              value={address.city}
              onChange={(e)=>setaddress({...address,city:e.target.value})}
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[180px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Input
              type="text"
              label="City"
              value={address.country}
              onChange={(e)=>setaddress({...address,country:e.target.value})}
              className=""
              classNames={{input:'border-[2px] border-slate-300 p-2 rounded-lg w-[180px]'}}
              labelPlacement={'outside-left'}
              placeholder="Enter your email"
            />
        </div>
        </div>
        <div className="mt-10 w-full justify-end flex">
          <Button onClick={onOpen} className="bg-blue-100 border-blue-700 border-[2px] hover:bg-blue-200 text-blue-700 hover:text-blue-500">
            Update Infor
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose} // Use onClose to close the modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="bg-white border-[2px] rounded-xl border-slate-500">
          <ModalHeader className="flex flex-col gap-1">Update Infor</ModalHeader>
          <ModalBody>
            <p>Do You Want to update Your new Information</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              className="border-[2px] border-red-400 text-red-500 bg-white"
              onPress={onClose}
            >
              Close
            </Button>
            {loading ? (
              <Button
                isLoading
                className="bg-blue-500 text-white font-bold"
                color="secondary"
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Loading
              </Button>
            ) : (
              <Button
                color="primary"
                className="border-[2px] border-green-400 bg-green-200 text-green-500"
                onPress={handleActionClick}
              >
                Action
              </Button>
            )}
            {/* <ToastContainer /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Index;
