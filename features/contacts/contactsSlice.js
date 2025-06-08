import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAPIContacts = createAsyncThunk(
  "contacts/fetchAPIContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    newContacts: JSON.parse(localStorage.getItem("newContacts")) || [],
    apiContacts: [],
    editingContact: null,
    loading: false,
    error: null,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.newContacts.push(action.payload);
        localStorage.setItem("newContacts", JSON.stringify(state.newContacts));
      },
      prepare(name, email, phone) {
        return {
          payload: {
            id: nanoid(),
            name,
            email,
            phone,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.newContacts = state.newContacts.filter(
        (c) => c.id !== action.payload
      );
      localStorage.setItem("newContacts", JSON.stringify(state.newContacts));
    },
    updateContact(state, action) {
      const index = state.newContacts.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.newContacts[index] = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
        localStorage.setItem("newContacts", JSON.stringify(state.newContacts));
      }
    },
    deleteAPIContact(state, action) {
      state.apiContacts = state.apiContacts.filter(
        (c) => c.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPIContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAPIContacts.fulfilled, (state, action) => {
        state.apiContacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAPIContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addContact,
  deleteContact,
  updateContact,
  deleteAPIContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
