import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
const url1 = "http://26.232.136.42:8080/api";
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    color: [],
    size: [],
    type: [],
    gender: [],
    quantity:[],
    inventory:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProductFecth.fulfilled, (state, action) => {
        state.product = action.payload.map((product) => {
          const sizes = [];
          product.productVersion.forEach((version) => {
            version.variants.forEach((variant) => {
              const existingSize = sizes.find((s) => s.size === variant.size);
              if (existingSize) {
                const existingColor = existingSize.colors.find(
                  (c) => c.color === variant.color
                );

                if (existingColor) {
                  existingColor.variants.push({
                    variants_id: variant.variants_id,
                    quantity_in_stock: variant.quantity_in_stock,
                    productversion: variant.productversion,
                  });
                } else {
                  existingSize.colors.push({
                    color: variant.color,
                    variants: [
                      {
                        variants_id: variant.variants_id,
                        quantity_in_stock: variant.quantity_in_stock,
                        productversion: variant.productversion,
                      },
                    ],
                  });
                }
              } else {
                sizes.push({
                  size: variant.size,
                  colors: [
                    {
                      color: variant.color,
                      variants: [
                        {
                          variants_id: variant.variants_id,
                          quantity_in_stock: variant.quantity_in_stock,
                          productversion: variant.productversion,
                        },
                      ],
                    },
                  ],
                });
              }
            });
          });

          return {
            ...product,
            sizes,
          };
        });
      })
      .addCase(GetproductbyID.fulfilled,(state,action) => {
        state.product.push(action.payload)
      })
      .addCase(GetProduct.fulfilled, (state, action) => {
         state.product = state.product.map((el)=>el.product_id==action.payload.product_id?action.payload:el);
      })
      // .addCase(ColorFecth.fulfilled, (state, action) => {
      //   state.color = action.payload;
      // })
      .addCase(SizeFecth.fulfilled, (state, action) => {
        state.size = action.payload;
      })
      .addCase(TypeOfProductFecth.fulfilled, (state, action) => {
        state.type = action.payload;
      })
      .addCase(TypeOfGenderFecth.fulfilled, (state, action) => {
        state.gender = action.payload;
      })
      .addCase(QuantityOfProductFecth.fulfilled, (state, action) => {
        state.quantity=action.payload
      })
      .addCase(Inventory.fulfilled, (state, action) => {
        state.inventory=action.payload
      })
  },
});
export const FetchInfom = () => {
  return async function check(dispatch, getState) {
    await dispatch(ProductFecth());
    //await dispatch(ColorFecth());
    await dispatch(SizeFecth());
    await dispatch(TypeOfProductFecth());
    await dispatch(TypeOfGenderFecth());
    await dispatch(QuantityOfProductFecth());
    await dispatch(Inventory())
  };
};
export const Inventory = createAsyncThunk(
  "product/Inventory",
  async () => {
    const res = await fetch(`${url1}/statistic/inventory`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const TypeOfProductFecth = createAsyncThunk(
  "product/TypeOfProductFecth",
  async () => {
    const res = await fetch(`${url1}/product/typeOnly`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const QuantityOfProductFecth = createAsyncThunk(
  "product/QuantityOfProductFecth",
  async () => {
    const res = await fetch(`${url1}/statistic/stock`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const TypeOfGenderFecth = createAsyncThunk(
  "product/TypeOfGenderFecth",
  async () => {
    const res = await fetch(`${url1}/product/typeGenderOnly`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
// export const ColorFecth = createAsyncThunk("product/ColorFecth", async () => {
//   const res = await fetch(`${url1}/product/colorOnly`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();
//   return data;
// });
export const SizeFecth = createAsyncThunk("product/SizeFecth", async () => {
  const res = await fetch(`${url1}/product/sizeOnly`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

export const ProductFecth = createAsyncThunk(
  "product/ProductFecth",
  async () => {
    const res = await fetch(`${url1}/product/productshowV2`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
//Thằng này tạo Color dựa trên mã hex
export const ColorCreate = createAsyncThunk(
  "product/ColorCreate",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url1}/product/createcolor`, {
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
        toast.success(`Create Color success`, {
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
export const UpdateCategoriesPriceORDelete = createAsyncThunk(
  "product/UpdateCategoriesPriceORDelete",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await fetch(`${url1}/product/updatecategory`, {
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
      }else{
        if(payload.isdelete)
          {
toast.success(` Delete Category success`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
          }
          else{
            toast.success(`Update Price Category success`, {
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
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//Thằng này check Color dựa trên mã hex và trả về -1 nếu ko có nếu có trả về id của nó
export const ColorCheck = createAsyncThunk(
  "product/ColorCheck",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await fetch(`${url1}/category/findcolor`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ color_name: payload }),
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
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//Thằng này dùng để tạo product
export const CreateProduct = createAsyncThunk(
  "product/CreateProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url1}/product/createproductint`, {
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
        toast.success(`Create Product success`, {
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
export const CreateCateGories = createAsyncThunk(
  "product/CreateCateGories",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url1}/product/createcategoryint`, {
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
        toast.success(`Create Varient success`, {
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
//Thằng này để tạo thằng user đã tạo product
export const CreatePersonFix = createAsyncThunk(
  "product/CreatePersonFix",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url1}/product/createPersonFix`, {
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
        toast.success(`Create Person Fix success`, {
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
export const Test = createAsyncThunk("product/Test", async (payload) => {
  console.log(payload);
  const res = await fetch(`http://26.232.136.42:8080/api/variant/creatImage`, {
    method: "POST",
    body: payload,
  });
  const data = await res.text();
  return data;
});
export const GetProduct = createAsyncThunk(
  "product/GetProduct",
  async (payload) => {
    console.log(payload);
    const res = await fetch(`${url1}/product/productshowV2/${payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
);
export const GetproductbyID = createAsyncThunk(
  "product/Getproduct",
  async (payload) => {
    console.log(payload);
    const res = await fetch(`${url1}/product/productshowV3/${payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
);
export const CreateOfProduct = (payload) => {
  return async function check(dispatch, getState) {
    try {
      console.log(payload);
      const arr = await Promise.all(
        payload.categories.map(async (el) => {
          console.log(el.color);
          const idcolor = await dispatch(ColorCheck(el.color));
          if (idcolor.payload !== -1) {
            return { ...el, color: idcolor.payload };
          } else {
            const idcolorNew = await dispatch(
              ColorCreate({ color_name: el.color })
            );
            return { ...el, color: idcolorNew.payload };
          }
        })
      );
      const idproduct = await dispatch(
        CreateProduct({
          name: payload.name,
          description: payload.description,
          state: payload.state,
          materialProduct: payload.material,
          typeOfProductNew: payload.type,
          typeOfProductGender: payload.gender,
        })
      );
      await dispatch(
        CreatePersonFix({
          account_id: 2,
          product_id: idproduct.payload,
          note: "Tạo sản phẩm",
        })
      );
      payload.image.map(async (el) => {
        const formData = new FormData();
        formData.append("file", el);
        formData.append("idproduct", idproduct.payload);
        await dispatch(Test(formData));
      });
      arr.map(async (el) => {
        await dispatch(
          CreateCateGories({
            price_base: el.price,
            catetoryProduct: idproduct.payload,
            catetoryColor: el.color,
            catetorySize: el.size,
          })
        );
      });
      const socketUrl = `ws://26.232.136.42:8080/ws/purchase`;
      const socket = new WebSocket(socketUrl);
      socket.onopen = () => {
        console.log('Connected to WebSocket');
        const message = {
          id:idproduct.payload
        };
        alert(message)
        socket.send(JSON.stringify({id:idproduct.payload}));
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
      //  await dispatch(GetProduct(idproduct.payload));
    } catch (error) {
      toast.error(`Create Product Fall ${error}`, {
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
};
export const UpdateCategories=(payload)=>{
  return async function check(dispatch, getState) {
    try {
 await Promise.all(payload.data.map(async (el) => {
    console.time("ColorCheck");
    const idcolor = await dispatch(ColorCheck(el.color));
    console.timeEnd("ColorCheck");
    
    if (idcolor.payload !== -1) {
       await dispatch(
      CreateCateGories({
        price_base: el.price,
        catetoryProduct: payload.idproduct,
        catetoryColor: idcolor.payload,
        catetorySize: el.size,
      })
    );
      return { ...el, color: idcolor.payload };
    } else {
      console.time("ColorCreate");
      const idcolorNew = await dispatch(ColorCreate({ color_name: el.color }));
      await dispatch(
      CreateCateGories({
        price_base: el.price,
        catetoryProduct: payload.idproduct,
        catetoryColor: idcolorNew.payload,
        catetorySize: el.size,
      })
    );
      console.timeEnd("ColorCreate");
      console.log(idcolorNew);
      return { ...el, color: idcolorNew.payload };
    }
  })) 


// arr.map(async (el) => {
//     await dispatch(
//       CreateCateGories({
//         price_base: el.price,
//         catetoryProduct: payload.idproduct,
//         catetoryColor: el.color,
//         catetorySize: el.size,
//       })
//     );
//   })

      await dispatch(GetProduct(payload.idproduct));
    } catch(error){
      toast.error(`Update Categories Fall ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
}}
export default ProductSlice;
