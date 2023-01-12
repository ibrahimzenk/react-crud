import { createSlice } from "@reduxjs/toolkit";
import { deleteUsers, postUsers, putUsers } from "../services/userService";
// import axios from "axios";

const initialState = [
  //   {
  //     id: 1,
  //     name: "İbrahim",
  //     surname: "Zenk",
  //   },
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state = action.payload;
      console.log(state);
    },
    addUser: async (state, action) => {
      //   console.log(action.payload);
      // axios({
      //   method: "post",
      //   url: "https://63bd71ebd660062388a61184.mockapi.io/crud/",
      //   data: {
      //     name: action.payload.name,
      //     surname: action.payload.surname,
      //   },
      // });
      console.log("Ekleme başladı");
      await postUsers({ name: action.payload.name, surname: action.payload.surname });
      console.log("Ekleme bitti");
    },
    editUser: async (state, action) => {
      //   state[action.payload.id].name = action.payload.name;
      //   state[action.payload.id].surname = action.payload.surname;
      console.log(action.payload);
      console.log(state);

      // await axios({
      //   method: "put",
      //   url: `https://63bd71ebd660062388a61184.mockapi.io/crud/${action.payload.id}`,
      //   data: {
      //     name: action.payload.name,
      //     surname: action.payload.surname,
      //   },
      // });

      console.log("Edit başladı");
      await putUsers(action.payload.id, { name: action.payload.name, surname: action.payload.surname });
      console.log("Edit bitti");
    },
    deleteUser: async (state, action) => {
      console.log(action.payload);

      // axios({
      //   method: "delete",
      //   url: `https://63bd71ebd660062388a61184.mockapi.io/crud/${action.payload.id}`,
      // });

      console.log("Silme başladı");
      await deleteUsers(action.payload.id);
      console.log("Silme bitti");
    },
  },
});

export const { getUser, addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
