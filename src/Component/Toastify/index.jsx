// ToastComponent.jsx
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = ({ message, type }) => {
  console.log('khkhjg')
  const showToast = () => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      {showToast()}
    </div>
  );
};

export default ToastComponent;


