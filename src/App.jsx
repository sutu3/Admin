import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Component/Navbar/index.jsx';
import {
  FetchInfom,
  GetproductbyID,
  Inventory
} from './Component/Redux/ProductSlice.jsx';
import CustumerSlice, { Custumer, CheckLogin } from './Component/Redux/CustummerSlice.jsx';
import OrderSlice, { OrderFetch } from './Component/Redux/OrderSlice.jsx';
import { SaleFetch } from './Component/Redux/SalesSlice.jsx';
import { Infor, State } from './Component/Redux/selector.jsx';
import { Fetchstatistical } from './Component/Redux/statisticalSlixe.jsx';
import { Button, Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faEyeSlash, faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import useWebSocket from './Component/Wedsocket/Order.jsx';
import { FetchPuchaseOrder } from './Component/Redux/PurchaseSlice.jsx';
import UseWebSocket from './Component/Order/UseWebSocket.jsx';

const App = () => {
  const infor = useSelector(Infor);
  const check = useSelector(State);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [login, setLogin] = useState((localStorage.getItem('login') && check)?true:false);
  console.log(login)
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
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
    // return () => {
    //   // cleanup
    //   alert('heheheheh')
    // };
  }, [dispatch]);
  useWebSocket(
    'ws://26.232.136.42:8080/ws/purchase',
    async(event) => {
      const newOrder = JSON.parse(event.data);
      await dispatch(GetproductbyID(newOrder))
      setTimeout(()=>{
        toast.info('You Have new Product', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },500)
    },
  );
  useWebSocket(
    `ws://26.232.136.42:8080/ws/loginstatus?role=${infor.role}`,
    (event) => {
      const newOrder =event.data.split(' ');
      console.log(newOrder)
      dispatch(CustumerSlice.actions.changeLogin({id: parseInt(newOrder[0]),login: newOrder[1]=='true'?true:false}))
    },
  );
  useWebSocket(
    'ws://26.232.136.42:8080/ws/product',
    (event) => {
      const newOrder = JSON.parse(event.data);
      dispatch(OrderSlice.actions.addOrder(newOrder));
      setTimeout(()=>{
        toast.info('You Have new order', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },500)
    },
  );

  const handleOrderMessage = async (event) => {
    let newOrder;
    
    try {
      newOrder = JSON.parse(event.data);
    } catch (e) {
      setTimeout(()=>{

        toast.info(`Has Order change Status By ${event.data}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },500)
      return;
    }
    dispatch(OrderSlice.actions.changeStatusOrder(newOrder));
      await dispatch(Fetchstatistical());
    // Tạo một WebSocket khác để gửi message
    const secondarySocket = new WebSocket(
      `ws://26.232.136.42:8080/ws/orderstatus?idAccount=${newOrder.account}`
    );
    secondarySocket.onopen = () => {
      const message = { id: newOrder.account, status: newOrder.status, idOrder: newOrder.orders_id };
      secondarySocket.send(JSON.stringify(message));
    };

    secondarySocket.onclose = () => {
      console.log(`Secondary WebSocket connection closed`);
    };

    secondarySocket.onerror = (error) => {
      console.error(`Secondary WebSocket error:`, error);
    };

    secondarySocket.onmessage = (event) => {
      console.log(`Secondary WebSocket message received:`, event.data);
    };

    await dispatch(Inventory());
  };

  useWebSocket(
    'ws://26.232.136.42:8080/ws/order',
    handleOrderMessage
  );
//  useWebSocket(
//   'ws://26.232.136.42:8080/ws/order',
//   async (event) => {
//     let newOrder;

//     try {
//       newOrder = JSON.parse(event.data);
//     } catch (e) {
//       toast.info(`Has Order change Status By ${event.data}`, {
//         position: 'top-right',
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//       });
//       return;
//     }
//     dispatch(OrderSlice.actions.changeStatusOrder(newOrder));
//    const secondarySocket = useWebSocket(
//       `ws://26.232.136.42:8080/ws/orderstatus?idAccount=${newOrder.account}`,
//       (event) => {
//         // Xử lý các tin nhắn từ WebSocket này nếu cần thiết
//       },
//       (socket) => {
//         // Gửi message khi WebSocket mở
//         const message = { id: newOrder.account, status: newOrder.status, idOrder: newOrder.orders_id };
//         socket.send(JSON.stringify(message));
//       }
//     );
//     await dispatch(Inventory());
//   },
// );

  const handleLogin = async () => {
    if (email !== '') {
      if (pass !== '') {
        const check = await dispatch(
          CheckLogin({
            email,
            pass,
          }),
        );
        if (localStorage.getItem('login')) {
          console.log(check);
          navigate('/Dashboard');
          setLogin(true);
          setEmail('');
          setPass('');
        }
      } else {
        setTimeout(()=>{
          toast.info('Pass is IsLegit', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          },500)
      }
    } else {
      setTimeout(()=>{
        toast.info('Email is IsLegit', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
          },500)
    }
  };

  return (
    <div className="w-screen h-full justify-start items-start flex flex-row p-0 m-0">
      {login ? (
        <>
          <div className="w-[18%] h-screen bg-[#f7f9fb] flex border-r-2 border-slate-300 fixed">
            <Navbar />
          </div>
          <div className="w-full h-full mt-0 ml-[280px]">
            <Outlet />
          </div>
        </>
      ) : (
        <div
          className="bg-red-300 w-full h-screen bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: 'url(https://i.gifer.com/KT3p.gif)' }}
        >
          <div className="w-full h-screen  backdrop-blur-xl">
            <div className="bg-slate-100 gap-10 p-4 shadow-inner shadow-slate-500 flex-col rounded-xl w-[450px] h-[400px] flex m-auto translate-y-28">
              <div className="text-2xl font-mono font-bold mt-5">Login In</div>
              <div className="w-full">
                <Input
                  key="username"
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  classNames={{
                    label: 'text-slate-400 font-serif pb-20',
                    input: 'border-[2px] border-slate-300 rounded-lg p-2',
                    inputWrapper: '',
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-[90%] m-auto"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full">
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  labelPlacement="outside"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  classNames={{
                    label: 'text-slate-400 font-serif pb-20',
                    input: 'border-[2px] border-slate-300 rounded-lg p-2',
                    inputWrapper: '',
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
                  type={isVisible ? 'text' : 'password'}
                />
              </div>
              <div className="w-full flex justify-center">
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
