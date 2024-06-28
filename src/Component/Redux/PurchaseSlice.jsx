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
        const formattedSpecificDate = specificDate
          .toISOString()
          .replace(/\.\d{3}Z$/, "");
        const index1 = state.OrderPurchase.findIndex(
          (el) => el.purchase_orders_id == action.payload.purchaseOrder
        );

        if (index1 !== -1) {
          state.OrderPurchase = state.OrderPurchase.map((el, index) =>
            index === index1
              ? {
                  ...el,
                  purchaseorderitem: [...el.purchaseorderitem, action.payload],
                  total_amount:
                    el.purchaseorderitem.reduce(
                      (acc, el1) =>
                        acc +
                        parseInt(el1.purchase_price) * parseInt(el1.quantity),
                      0
                    ) +
                    parseInt(action.payload.quantity) *
                      parseInt(action.payload.purchase_price),
                }
              : el
          );
        } else {
          state.OrderPurchase.push({
            order_date: formattedSpecificDate,
            purchase_orders_id: action.payload.purchaseOrder,
            purchaseorderitem: [action.payload],
            status: "Prepare",
            total_amount:
              parseInt(action.payload.quantity) *
              parseInt(action.payload.purchase_price),
          });
        }

        localStorage.setItem(
          "orderPurchase",
          JSON.stringify(state.OrderPurchase)
        );
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
                  total_amount: state.OrderPurchase[
                    index
                  ].purchaseorderitem.reduce(
                    (acc, el1) =>
                      acc +
                      parseInt(el1.purchase_price) * parseInt(el1.quantity),
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
      })
      .addCase(UpdateQualityOfPurchaseItem.fulfilled, (state, action) => {
        const index1 = state.OrderPurchase.findIndex(
          (el) => el.status === "Prepare"
        );
        if (index1 !== -1) {
          state.OrderPurchase = state.OrderPurchase.map((el, index) =>
            index === index1
              ? {
                  ...el,
                  purchaseorderitem: state.OrderPurchase[
                    index
                  ].purchaseorderitem.map((el1) =>
                    el1.purchase_order_items_id == action.payload.purchase_order_items_id
                      ? action.payload
                      : el1
                  ),
                }
              : el
          );
        }
        localStorage.setItem(
          "orderPurchase",
          JSON.stringify(state.OrderPurchase)
        );
      })
      .addCase(DeletePurchaseItem.fulfilled,(state,action)=>{
        const index1 = state.OrderPurchase.findIndex(
          (el) => el.status === "Prepare"
        );
        if (index1 !== -1) {
          state.OrderPurchase = state.OrderPurchase.map((el, index) =>
            index === index1
              ? {
                  ...el,
                  purchaseorderitem: state.OrderPurchase[
                    index
                  ].purchaseorderitem.filter((el1) =>
                    el1.purchase_order_items_id != action.payload.purchase_order_items_id
                  ),
                }
              : el
          );
        }
        localStorage.setItem(
          "orderPurchase",
          JSON.stringify(state.OrderPurchase)
        );
      })
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
//cập nhập số lượng của Variant khi item thay đổi số lượng cua product đó
export const UpdateQualityOfVarient = createAsyncThunk(
  "purchase/UpdateQualityOfVarient",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/variant/updateVariant`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
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
        toast.success(`Update Quanlity Variant in stock complete`, {
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
//cập nhập số lượng của Item Purchase khi item đó thay đổi số lượng cua product đó
export const UpdateQualityOfPurchaseItem = createAsyncThunk(
  "purchase/UpdateQualityOfPurchaseItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/puchase/updatePuchaseItem`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
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
        toast.success(
          `Update Quanlity PurcharItem ${payload.purchase_order_items_id} in stock complete`,
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
//cập nhập số lượng tổng khi item thay đổi hoặc thêm 1 item của product đó vào
export const UpdateQualityOfVersion = createAsyncThunk(
  "purchase/UpdateQualityOfVersion",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/productversion/updateVersion`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
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
        toast.success(`Update Quanlity Version in stock complete`, {
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
export const UpdateQuality = (payload) => {
  return async function Check(dispatch, getState) {
    try {
      await dispatch(
        UpdateQualityOfVersion({
          productVersion_id: payload.productVersion,
          version_name: payload.version_name,
          quantity_in_stock: payload.quantity_in_stock,
          productID: payload.product,
        })
      ).unwrap();
      await dispatch(
        UpdateQualityOfVarient({
          variants_id: payload.variant,
          colorID: payload.colorID,
          sizeID: payload.sizeID,
          productversion: payload.productVersion,
          quantity_in_stock: payload.quantity,
        })
      );
      await dispatch(
        UpdateQualityOfPurchaseItem({
          purchase_order_items_id: payload.purchase_order_items_id,
          purchase_price: payload.purchase_price,
          quantity: payload.quantity,
          purchaseOrder: payload.purchaseOrder,
          variant: payload.variant,
          productVersion: payload.productVersion,
          // purchase_price: payload.purchase_price,
          // quantity: payload.quantity,
          // purchaseOrder: payload.purchaseOrder,
          // variant: payload.variant,
          // productVersion: payload.productVersion,
        })
      );
    } catch (error) {
      console.error("Error during purchase item update", error);
    }
  };
};
//Thằng này dùng để xóa item bằng id
export const DeletePurchaseItem = createAsyncThunk(
  "purchase/DeletePurchaseItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/puchase/delete/${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to delete purchase item")}`,
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
        toast.success("Acction Delete Complete", {
                  position: "top-right",
                  autoClose: 1500, // Close after 1 second
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
export const PurchaseItem1 = (payload) => {
  return async function Check(dispatch, getState) {
    let id;
    try {
      const check = await dispatch(
        CheckVersionIdHasCreate({
          product: payload.product,
        })
      );
      console.log(check.payload);
      if (check.payload !== -1) {
        id = check.payload;
        console.log(id);
        await dispatch(
          UpdateQualityOfVersion({
            productVersion_id: id,
            version_name: payload.version_name,
            quantity_in_stock: payload.quantity_in_stock,
            productID: payload.product,
          })
        ).unwrap(); // Ensure this dispatch is awaited correctly
      } else {
        id = await dispatch(
          CreateProductVersion({
            version_name: payload.version_name,
            quantity_in_stock: payload.quantity_in_stock,
            productID: payload.product,
          })
        ).unwrap();
      }

      const idVariant = await dispatch(
        CreateVariant({
          colorID: payload.colorid,
          sizeID: payload.sizeid,
          productversion: id,
          quantity_in_stock: payload.quanlity,
        })
      ).unwrap();

      await dispatch(
        CreatePurchaseItem({
          purchase_price: payload.price_base,
          quantity: payload.quanlity,
          variant: idVariant,
          productVersion: id,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error during purchase item creation", error);
    }
  };
};
//check id của version product đó có tồn tại hay chưa
export const CheckVersionIdHasCreate = createAsyncThunk(
  "purchase/CheckVersionIdHasCreate",
  async (payload) => {
    const res = await fetch(
      `${url}/productversion/getproductversion/${payload.product}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
);
export default PurchaseSlice;
