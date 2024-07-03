import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard/index";
import ListProduct from "./Component/Product/ListProduct";
import Value from "./Component/Dashboard/value";
import Chart from "./Component/Dashboard/chart";
import Product from './Component/Product/index'
import AddProduct from "./Component/Product/AddProduct";
import { Provider } from "react-redux";
import store from "./Component/Redux/store";
import { ToastContainer } from "react-toastify";
import Purchar from "./Component/Product/Purchar";
import AddnewProduct from "./Component/Product/AddnewProduct";
import ImportProduct from "./Component/Product/ImportProduct";
import Fixproduct from "./Component/Product/Fixproduct";
import UpdateProduct from "./Component/Product/UpdateProduct";
import Custumer from "./Component/Custumer/Custumer";
ReactDOM.createRoot(document.getElementById("root")).render(
    <NextUIProvider>
  <Provider store={store}>
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/Dashboard" element={<Value />}>
              <Route path="Value" index element={<Value />} />
              <Route path="Chart"  element={<Chart />} />
            </Route>
            <Route path="/Product" element={<Product />}>
              {/* <Route path="" index element={<ListProduct />} /> */}
              <Route path="Add" index  element={<AddProduct />} >
              </Route>
              <Route path="Add/:id" element={<Purchar />} />
              <Route path="Import"  element={<ImportProduct />} />
              <Route path="Add/fix/:id"  element={<UpdateProduct />} />
              <Route path="Import/:id"  element={<Fixproduct />} />
              <Route path="Addnewproduct" element={<AddnewProduct />} />
              {/* <Route path="Update" element={<AddProduct />} /> */}
            </Route>
            <Route path="/custumer" element={<Custumer />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  </Provider>
    </NextUIProvider>
);
