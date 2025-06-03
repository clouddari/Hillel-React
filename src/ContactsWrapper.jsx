import { useState, useEffect } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import MyButton from "./Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditContact from "./EditContact";

function ContactsWrapper() {
  const storedContacts = JSON.parse(localStorage.getItem("newContacts")) || [];
  const [newContacts, setNewContacts] = useState(storedContacts);
  const [apiContacts, setAPIContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAPIContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("newContacts", JSON.stringify(newContacts));
  }, [newContacts]);

  const deleteNewContact = (contactToDelete) => {
    setNewContacts((prev) =>
      prev.filter((c) => c.email !== contactToDelete.email)
    );
  };

  const deleteAPIContact = (contactToDelete) => {
    setAPIContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id));
  };

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
        <Route
          path="/add-contact"
          element={
            <AddContact
              newContacts={newContacts}
              setNewContacts={setNewContacts}
              apiContacts={apiContacts || []}
              deleteNewContact={deleteNewContact}
              deleteAPIContact={deleteAPIContact}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/contact-list"
          element={
            <ContactList
              newContacts={newContacts}
              apiContacts={apiContacts}
              deleteAPIContact={deleteAPIContact}
              deleteNewContact={deleteNewContact}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/edit-contact"
          element={
            <EditContact
              newContacts={newContacts}
              setNewContacts={setNewContacts}
            />
          }
        />
        <Route path="/" element={<Navigate to="/contact-list" />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default ContactsWrapper;
