import { createSlice } from "@reduxjs/toolkit";
import { deleteUsers, postUsers, putUsers } from "../services/userService";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
//   const response = await getUsers();
//   return response;
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.data = action.payload;
      // console.log(state.data);
    },
    addUser: async (state, action) => {
      // console.log("Ekleme başladı");
      await postUsers({ name: action.payload.name, surname: action.payload.surname });
      // console.log("Ekleme bitti");
    },
    editUser: async (state, action) => {
      // console.log("Edit başladı");
      await putUsers(action.payload.id, { name: action.payload.name, surname: action.payload.surname });
      // console.log("Edit bitti");
    },
    deleteUser: async (state, action) => {
      // console.log("Silme başladı");
      await deleteUsers(action.payload.id);
      // console.log("Silme bitti");
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.pending, (state, action) => {
  //     state.loading = true;
  //     state.error = "";
  //   });
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     console.log(action.payload);
  //     state.data = action.payload;
  //     state.loading = false;
  //   });
  //   builder.addCase(fetchUsers, (state, action) => {
  //     state.loading = false;
  //     state.error = "Error fetching data";
  //   });
  // },
});

export const { getUser, addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
