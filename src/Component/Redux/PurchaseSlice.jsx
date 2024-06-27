import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api";
const PurchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchaseItem: [],
    OrderPurchase: [],
    
  },
  reducers: {
    updateQuality: (state, action) => {
      const existingItemIndex = state.purchaseItem.findIndex(
        (item) => item.productid == action.payload.productid
      );
      console.log(existingItemIndex);
      if (existingItemIndex !== -1) {
        const details = state.purchaseItem[existingItemIndex].details;
        const detailIndex = action.payload.index;
        console.log(details[detailIndex]);
        if (detailIndex >= 0 && detailIndex < details.length) {
          details[detailIndex] = {
            ...details[detailIndex],
            quanlity:
              parseInt(action.payload.quanlity) +
              parseInt(details[detailIndex].quanlity),
          };
        }
      }
    },
    addPurchase: (state, action) => {
      const existingItemIndex = state.purchaseItem.findIndex(
        (item) => item.productid === action.payload.productid
      );

      if (existingItemIndex !== -1) {
        // If product already exists, add new details to the existing item
        state.purchaseItem[existingItemIndex].details.push({
          category_id: action.payload.category_id,
          colorid: action.payload.colorid,
          sizeid: action.payload.sizeid,
          color: action.payload.color,
          size: action.payload.size,
          price_base: action.payload.price_base,
          quanlity: action.payload.quanlity,
        });
      } else {
        // If product doesn't exist, create a new entry with details as an array
        state.purchaseItem.push({
          productid: action.payload.productid,
          name: action.payload.name,
          details: [
            {
              category_id: action.payload.category_id,
              colorid: action.payload.colorid,
              sizeid: action.payload.sizeid,
              color: action.payload.color,
              size: action.payload.size,
              price_base: action.payload.price_base,
              quanlity: action.payload.quanlity,
            },
          ],
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
.addCase(CreatePurchaseItem.fulfilled, (state, action) => {
    const specificDate = new Date();
    const formattedSpecificDate = specificDate.toISOString().replace(/\.\d{3}Z$/, "");
    const index1 = state.OrderPurchase.findIndex(
        (el) => el.purchase_orders_id == action.payload.purchaseOrder
    );
    
    if (index1 !== -1) {
        state.OrderPurchase = state.OrderPurchase.map((el, index) =>
            index === index1
                ? {
                      ...el,
                      purchaseorderitem: [...el.purchaseorderitem, action.payload],
                      total_amount: el.purchaseorderitem.reduce(
                          (acc, el1) =>
                              acc + parseInt(el1.purchase_price) * parseInt(el1.quantity),
                          0
                      ) + parseInt(action.payload.quantity) * parseInt(action.payload.purchase_price),
                  }
                : el
        );
    } else {
        state.OrderPurchase.push({
            order_date: formattedSpecificDate,
            purchase_orders_id: action.payload.purchaseOrder,
            purchaseorderitem: [action.payload],
            status: "Prepare",
            total_amount: parseInt(action.payload.quantity) * parseInt(action.payload.purchase_price),
        });
    }

    localStorage.setItem("orderPurchase", JSON.stringify(state.OrderPurchase));
})
     .addCase(FetchPuchaseOrder.fulfilled, (state, action) => {
    state.OrderPurchase = action.payload;
    const index1 = state.OrderPurchase.findIndex(
        (el) => el.status === "Prepare"
    );
    if (index1 !== -1) {
        state.OrderPurchase = state.OrderPurchase.map((el, index) =>
            index === index1
                ? {
                      ...el,
                      total_amount: state.OrderPurchase[index].purchaseorderitem.reduce(
                          (acc, el1) => acc + parseInt(el1.purchase_price) * parseInt(el1.quantity),
                          0
                      ),
                  }
                : el
        );
    }
    localStorage.setItem(
        "orderPurchase",
        JSON.stringify(state.OrderPurchase)
    );
});
  },
});
//thằng này dùng để tạo product version mới khi nhập hàng
//vù mỗi item khi nhập hàng sẽ sinh ra version mới để dễ quản lý thống kê nguồn hàng sẽ đi âu
export const CreateProductVersion = createAsyncThunk(
  "purchase/CreateProductVersion",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/productversion/createint`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
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
      } else {
        toast.success(`Product Variant created for ${payload.version_name}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const FetchPuchaseOrder = createAsyncThunk(
  "purchase/FetchPuchaseOrder",
  async () => {
    const res = await fetch(`${url}/puchase/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
//Tạo variant mới khi nhập hàng
//vù mỗi item khi nhập hàng sẽ sinh ra varient mới để dễ quản lý
export const CreateVariant = createAsyncThunk(
  "purchase/CreateVariant",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/variant/createint`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create variant")}`,
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
      } else {
        toast.success(`Product Variant created for ${payload.version_name}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//Tạo Item chưa dữ liệu
export const CreatePurchaseItem = createAsyncThunk(
  "purchase/CreatePurchaseItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/puchase/createpurchaseItem`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

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
      } else {
        toast.success(`Purchase Item added for ${payload.productversion}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//thằng này là middle ware để trước khi tạo item thì phải
//tạo vesion=>chạy dòng lập để chạy từng thằng item => tạo varient cho từng thằng item
//sau khi tạo varient xong => tạo item đưa dữ liệu vào serve
export const PurchaseItem = (payload) => {
  return async function Check(dispatch, getState) {
    try {
      const id = await dispatch(
        CreateProductVersion({
          version_name: payload.version_name,
          quantity_in_stock: getState()
            .purchase.purchaseItem.find((el) => el.productid == payload.product)
            .details.reduce((acc, el) => acc + parseInt(el.quanlity), 0),
          productID: payload.product,
        })
      ).unwrap();

      const itemDetails = getState().purchase.purchaseItem.find(
        (el) => el.productid == payload.product
      ).details;
      for (const detail of itemDetails) {
        const idVariant = await dispatch(
          CreateVariant({
            colorID: detail.colorid,
            sizeID: detail.sizeid,
            productversion: id,
            quantity_in_stock: detail.quanlity,
          })
        ).unwrap();
        await dispatch(
          CreatePurchaseItem({
            purchase_price: detail.price_base,
            quantity: detail.quanlity,
            variant: idVariant,
            productVersion: id,
          })
        );
      }
    } catch (error) {
      console.error("Error during purchase item creation", error);
    }
  };
};
export default PurchaseSlice;
