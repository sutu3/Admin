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
      .addCase(GetProduct.fulfilled, (state, action) => {
        state.product = [...state.product, action.payload];
      })
      .addCase(ColorFecth.fulfilled, (state, action) => {
        state.color = action.payload;
      })
      .addCase(SizeFecth.fulfilled, (state, action) => {
        state.size = action.payload;
      })
      .addCase(TypeOfProductFecth.fulfilled, (state, action) => {
        state.type = action.payload;
      })
      .addCase(TypeOfGenderFecth.fulfilled, (state, action) => {
        state.gender = action.payload;
      });
  },
});
export const FetchInfom = () => {
  return async function check(dispatch, getState) {
    await dispatch(ProductFecth());
    await dispatch(ColorFecth());
    await dispatch(SizeFecth());
    await dispatch(TypeOfProductFecth());
    await dispatch(TypeOfGenderFecth());
  };
};
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
export const ColorFecth = createAsyncThunk("product/ColorFecth", async () => {
  const res = await fetch(`${url1}/product/colorOnly`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});
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
    const res = await fetch(`${url1}/product/productshow`, {
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
      return { ...data, color: payload };
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
    const res = await fetch(`${url1}/product/productshow/${payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.text();
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
          if (idcolor !== -1) {
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
      await dispatch(GetProduct(idproduct.payload));
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
export default ProductSlice;
