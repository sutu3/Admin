import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Infor } from "../Redux/selector";

const UseWebSocket = (data) => {
    console.log(data)
    useEffect(() => { // hoặc role khác mà bạn muốn truyền
        const socketUrl = `ws://26.232.136.42:8080/ws/order?role=Employee&username=hahaha`;
        const socket = new WebSocket(socketUrl);
        alert(`ws://26.232.136.42:8080/ws/order?role=Employee&username=${encodeURIComponent(data.username)}`)

    socket.onopen = () => {
      console.log('Connected to WebSocket');
      const message = {
        type: "apiRequest",
        url: `http://26.232.136.42:8080/api/orders/updateStatusOrder/${data.id}?status=${data.status}`,
      };
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      console.log('Message from server', event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Đóng kết nối WebSocket khi component unmount
    return () => {
      socket.close();
    };
  }, [data]);
};

export default UseWebSocket;
