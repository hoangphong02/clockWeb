import { createSlice } from "@reduxjs/toolkit";
// import { refreshToken } from "../../services/UserService";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  isAdmin: false,
  // refresh_token: "",
  city: "",
};

export const userSlide = createSlice({
  // video 30 #29
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        access_token = "",
        address = "",
        phone = "",
        avatar = "",
        _id = "",
        isAdmin,
        city = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      // state.refresh_token = refresh_token;
      state.city = city;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
      state.isAdmin = false;
      // state.refresh_token =""
      state.city = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
