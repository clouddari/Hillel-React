import { useEffect } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import MyButton from "./Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch } from "react-redux";
import { fetchAPIContacts } from "../features/contacts/contactsSlice";

function ContactsWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPIContacts());
  }, [dispatch]);

  return (
    <>
      <div className="header-buttons">
        <ButtonGroup size="large" aria-label="Basic button group">
          <MyButton
            component={Link}
            to="/add-contact"
            color="secondary"
            label="Add Contact"
          />
          <MyButton
            component={Link}
            to="/contact-list"
            color="secondary"
            label="Show Contacts"
          />
        </ButtonGroup>
      </div>

      <Routes>
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/edit-contact" element={<EditContact />} />
        <Route path="/" element={<Navigate to="/contact-list" />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default ContactsWrapper;
