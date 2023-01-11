import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
    addUser: (state, action) => {
      //   console.log(action.payload);
      axios({
        method: "post",
        url: "https://63bd71ebd660062388a61184.mockapi.io/crud/",
        data: {
          name: action.payload.name,
          surname: action.payload.surname,
        },
      });
    },
    editUser: async (state, action) => {
      //   state[action.payload.id].name = action.payload.name;
      //   state[action.payload.id].surname = action.payload.surname;
      console.log(action.payload);
      console.log(state);

      await axios({
        method: "put",
        url: `https://63bd71ebd660062388a61184.mockapi.io/crud/${action.payload.id}`,
        data: {
          name: action.payload.name,
          surname: action.payload.surname,
        },
      });
    },
    deleteUser: (state, action) => {
      console.log(action.payload);
      axios({
        method: "delete",
        url: `https://63bd71ebd660062388a61184.mockapi.io/crud/${action.payload.id}`,
      });
    },
  },
});

export const { getUser, addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
