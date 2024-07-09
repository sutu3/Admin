import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import Date from "./Component/Date/index";
import Navbar from "./Component/Navbar/index.jsx";
import { Outlet,useNavigate } from "react-router-dom";
import { FetchInfom } from "./Component/Redux/ProductSlice.jsx";
import { FetchPuchaseOrder } from "./Component/Redux/PurchaseSlice.jsx";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckLogin, Custumer } from "./Component/Redux/CustummerSlice.jsx";
import { OrderFetch } from "./Component/Redux/OrderSlice.jsx";
import { SaleFetch } from "./Component/Redux/SalesSlice.jsx";
import { Infor, State } from "./Component/Redux/selector.jsx";

import { Button, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Fetchstatistical,
  statisticalFetch,
  statisticalGenderFetch,
} from "./Component/Redux/statisticalSlixe.jsx";
const App = () => {
  const infor=useSelector(Infor)
  const check=useSelector(State)
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [login, setlogin] = useState(localStorage.getItem("login")&&check?true:false);
  const [pass, setpass] = useState('')
  const [email,setemail]=useState('')
  const toggleVisibility = () => setIsVisible(!isVisible);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(FetchInfom());
      await dispatch(FetchPuchaseOrder());
      await dispatch(Custumer());
      await dispatch(OrderFetch());
      await dispatch(SaleFetch());
      await dispatch(Fetchstatistical());
    };
    fetch();
  }, []);
  const handleLogin = async () => {
    if(email!='')
      {
       if(pass!=''){
        const check =await dispatch(CheckLogin({
          email:email,
          pass:pass
        }))
        if(localStorage.getItem("login")){
          console.log(check)
          navigate('/Dashboard')
          setlogin(true)
          toast.info(`WelCome Back ${infor.role}:${infor.username}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setemail('')
          setpass('')
        }
       } 
       else{
        toast.info(`Pass is IsLegit`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
       }
      }
      else{
        toast.info(`Email is IsLegit`, {
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
  return (
    <div className="w-screen h-full justify-start items-start flex flex-row p-0 m-0">
      {login ? (
        <>
          <div className="w-[18%] h-screen bg-[#f7f9fb] flex border-r-2 border-slate-300  fixed">
            <Navbar />
          </div>
          <div className="w-full h-full mt-0 ml-[280px]">
            <Outlet />
          </div>
          
        </>
      ) : (
        <div
          className="bg-red-300 w-full h-screen bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url(https://i.gifer.com/KT3p.gif)" }}
        >
          <div className="w-full h-screen  backdrop-blur-xl">
            <div className="bg-slate-100 gap-10 p-4 shadow-inner shadow-slate-500 flex-col rounded-xl w-[450px] h-[400px] flex m-auto translate-y-28">
              <div className="text-2xl font-mono font-bold mt-5">Login In</div>
              <div className="w-full ">
                <Input
                  key={"username"}
                  type="email"
                  label="Email"
                  labelPlacement={"outside"}
                  classNames={{
                    label: "text-slate-400 font-serif pb-20",
                    input: "border-[2px] border-slate-300 rounded-lg p-2",
                    inputWrapper: "",
                  }}
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  className=" w-[90%] m-auto"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full">
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  labelPlacement={"outside"}
                  value={pass}
                  onChange={(e)=>setpass(e.target.value)}
                  classNames={{
                    label: "text-slate-400 font-serif pb-20",
                    input: "border-[2px] border-slate-300 rounded-lg p-2",
                    inputWrapper: "",
                  }}
                  className=" w-[90%] m-auto"
                  endContent={
                    <button
                      className="focus:outline-none hover:outline-none hover:border-0"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {!isVisible ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>
              <div className="w-full">
                <Button
                  radius="xl"
                  endContent={<FontAwesomeIcon icon={faRightToBracket} />}
                  className="w-[60%] bg-gradient-to-tr from-pink-500 to-[#717ddd] text-white shadow-lg"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
            <ToastContainer />
          </div>
    </div>
  );
};

export default App;
