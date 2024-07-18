import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const url = "http://26.232.136.42:8080/api";
const OrderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    addOrder: (state, action) => {
      console.log(action.payload);
      state.order.push(action.payload);
    },
    changeStatusOrder: (state, action) => {
      state.order = state.order.map((el) =>
        el.orders_id == action.payload.orders_id ? action.payload : el
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OrderFetch.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(OrderChangeStatus.fulfilled, (state, action) => {
        state.order = state.order.map((el) =>
          el.orders_id == action.payload.orders_id ? action.payload : el
        );
      });
  },
});
export const OrderFetch = createAsyncThunk("order/OrderFetch", async () => {
  const res = await fetch(`${url}/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await res.json();
  return data;
});
export const OrderChangeStatus = createAsyncThunk(
  "order/OrderChangeStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/orders/updateStatusOrder/${payload.id}?status=${payload.status}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create purchase item")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const ChangeOrderStatus = (payload) => {
  return async function check(dispatch, getState) {
    try {
      const socketUrl = `ws://26.232.136.42:8080/ws/order?role=Employee&username=${encodeURIComponent(payload.username)}`;
      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log('Connected to WebSocket');
        const message = {
          type: "apiRequest",
          url: `http://26.232.136.42:8080/api/orders/updateStatusOrder/${payload.id}?status=${payload.status}`,
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
    } catch (error) {
      toast.error(
        `${new Error(error.message || "Failed to create purchase item")}`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
};

export default OrderSlice;
