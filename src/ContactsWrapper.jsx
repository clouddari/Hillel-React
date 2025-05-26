import { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import MyButton from "./Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function ContactsWrapper() {
  const storedContacts = JSON.parse(localStorage.getItem("newContacts")) || [];
  const [newContacts, setNewContacts] = useState(storedContacts);
  const [toggle, setToggle] = useState(true);
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
            color="secondary"
            onClick={() => setToggle(true)}
            label="Add Contact"
          />
          <MyButton
            color="secondary"
            onClick={() => setToggle(false)}
            label="Show Contacts"
          />
        </ButtonGroup>
      </div>

      {toggle ? (
        <AddContact
          newContacts={newContacts}
          setNewContacts={setNewContacts}
          setToggle={setToggle}
        />
      ) : (
        <ContactList
          newContacts={newContacts}
          apiContacts={apiContacts}
          deleteNewContact={deleteNewContact}
          deleteAPIContact={deleteAPIContact}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
}

export default ContactsWrapper;
