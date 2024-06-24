import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const url1="http://26.232.136.42:8080/api/product/productshow"
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product:[]
  },
  reducers: {
    
  },
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

        console.log(state.product);
      })
  },
});
export const ProductFecth=createAsyncThunk(
  "product/ProductFecth",
  async () => {
    const res = await fetch(`${url1}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  })
export default ProductSlice;