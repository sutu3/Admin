import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const url = "http://26.232.136.42:8080/api";
const CustumerSlice = createSlice({
  name: "custumer",
  initialState: {
    custumer: [],
    Roles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Custumerfetch.fulfilled, (state, action) => {
        state.custumer = action.payload;
      })
      .addCase(Rolesfetch.fulfilled, (state, action) => {
        state.Roles = action.payload;
      })
      .addCase(CreateAcount.fulfilled, (state, action) => {
        state.custumer = [...state.custumer, action.payload];
      })
      .addCase(GetCustumerbyid.fulfilled, (state, action) => {
        state.custumer = state.custumer.map((el) =>
          el.account_id == action.payload.account_id ? action.payload : el
        );
      });
  },
});
export const Custumerfetch = createAsyncThunk(
  "custumer/Custumerfetch",
  async () => {
    const res = await fetch(`${url}/account`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
);
export const Custumer = () => {
  return async function check(dispatch, getState) {
    await dispatch(Custumerfetch());
    await dispatch(Rolesfetch());
  };
};
export const Rolesfetch = createAsyncThunk("custumer/Rolesfetch", async () => {
  const res = await fetch(`${url}/account/getPermisson`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  console.log("dsdfasdfsd");
  const data = await res.json();
  return data;
});
export default CustumerSlice;
export const CheckSignupEmail = createAsyncThunk(
  "custumer/CheckSignupEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/Verification/user?email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

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
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const CreateAcount = createAsyncThunk(
  "custumer/CreateAcount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/create`, {
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
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//thằng này dùng để lấy dữ liệu chi tiết bằng id
export const GetCustumerbyid = createAsyncThunk(
  "custumer/GetCustumerbyid",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/getaccount/${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
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
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const ChangeManyRoles = createAsyncThunk(
  "custumer/ChangeManyRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/grandManyPermission/${payload.rolesid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            idRolePermission: payload.idRolePermission,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to get customer account")}`,
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
//thằng này dùng để cập nhật lại cho account đó có role nào trong bảng role
export const ChangeRolesForAccount = createAsyncThunk(
  "custumer/ChangeRolesForAccount",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await fetch(
        `${url}/account/updateRoleAccount/${payload.account_id}?idRole=${payload.roles_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(`${new Error(error.message || "Failed to change roles")}`, {
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
//thằng này check tên roles có trung ko nếu trung trả về id nếu ko thì trả về -1
export const CheckRolesForAccount = createAsyncThunk(
  "custumer/ChangeRolesForAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/checkRoleName?roleName=${payload.name}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to check name roles")}`,
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
//Thằng này tạo cấp quyền cho role
export const CreateRolespermissionForAccount = createAsyncThunk(
  "custumer/CreateRolesForAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/grandRolePermission`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create new permission")}`,
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
//Thằng này tạo roles mới cho account đó
export const CreateRolesForAccount = createAsyncThunk(
  "custumer/CreateRolesForAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/createRole`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create new roles")}`,
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
export const ChangerolePermission = (payload) => {
  return async function check(dispatch, getState) {
    try {
      const custumerList = getState().custumer.custumer;
      console.log(payload.listidcustumer);
      await Promise.all(
        custumerList.map(async (el) => {
          if (payload.listidcustumer.find((el1) => el1 == el.account_id)) {
            console.log(`Processing account_id: ${el.account_id}`);
            await dispatch(
              ChangeManyRoles({
                idRolePermission: payload.Permission,
                rolesid: el.roleID,
              })
            );
            console.log(`Role updated for account_id: ${el.account_id}`);
            await dispatch(GetCustumerbyid(el.account_id));
            console.log(
              `Fetched updated customer data for account_id: ${el.account_id}`
            );
          }
        })
      );
      console.log("All role changes processed successfully");
    } catch (error) {
      console.error("Error changing roles:", error);
    }
  };
};
