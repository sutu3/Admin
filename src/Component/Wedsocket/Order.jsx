import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import OrderSlice from '../Redux/OrderSlice';
const useAdminWebSocket = () => {
  const dispatch=useDispatch()
  
  useEffect(() => {
    const ws = new WebSocket('ws://26.232.136.42:8080/ws/product');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    ws.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      console.log(newOrder);
      dispatch(OrderSlice.actions.addOrder(newOrder));
      toast.info(`You Have new order`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

};

export default useAdminWebSocket;
