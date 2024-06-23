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
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/Dashboard" element={<Value />}>
              <Route path="Value" index element={<Value />} />
              <Route path="Chart" index element={<Chart />} />
            </Route>
            <Route path="/Product" element={<Product />}>
              <Route path="" index element={<ListProduct />} />
              <Route path="Add" index element={<AddProduct />} />
              <Route path="Import" index element={<AddProduct />} />
              <Route path="Update" index element={<AddProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
