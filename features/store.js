
import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/contactsSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;
