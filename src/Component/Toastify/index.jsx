import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleActionClick = async () => {
    setLoading(true);
    // Simulate a delay for the async action (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    toast.success("Action completed successfully!", {
        position: "top-right",
        autoClose: 1000, // Close after 1 second
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    // Add a delay of 2 seconds before showing the toast
    // 2 seconds delay before showing the toast
  };

  return (
    <div>
      <button onClick={handleActionClick} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      <ToastContainer />
    </div>
  );
}



