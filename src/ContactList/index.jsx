import MyButton from "../Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DialogDeleteContact from "../DialogDeleteContact";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  deleteAPIContact,
} from "../../features/contacts/contactsSlice";

function ContactList() {
  const location = useLocation();

  const success = location.state?.success;
  const navigate = useNavigate();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deletedContactName, setDeletedContactName] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const dispatch = useDispatch();
  const newContacts = useSelector((state) => state.contacts.newContacts);
  const apiContacts = useSelector((state) => state.contacts.apiContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  const combinedContacts = [...(apiContacts || []), ...(newContacts || [])];

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, location.pathname]);

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts: {error}</p>;

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {success && (
        <Alert
          sx={{ m: 2 }}
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
        >
          Contact successfully added!
        </Alert>
      )}

      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setDeleteSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
          icon={<CheckCircleIcon fontSize="inherit" />}
        >
          Contact <strong>{deletedContactName}</strong> deleted!
        </Alert>
      </Snackbar>

      <h3>Contacts</h3>
      {combinedContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {combinedContacts.map((contact, index) => {
            const isNew = newContacts.includes(contact);

            return (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                key={contact.id || contact.email}
                justifyContent="space-between"
                spacing={{ xs: 1, sm: 3 }}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fafafa",
                  marginBottom: "12px",
                }}
              >
                <p>
                  <strong>{contact.name}</strong>
                </p>
                <p>{contact.email} </p>
                <p>{contact.phone}</p>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <MyButton
                    onClick={() => {
                      if (newContacts.includes(contact)) {
                        navigate("/edit-contact", { state: { contact } });
                      } else {
                        alert("Editing API contacts is not supported.");
                      }
                    }}
                    label="Edit"
                    color="primary"
                    sx={{ ml: "auto" }}
                  />

                  <MyButton
                    onClick={() => {
                      setContactToDelete(contact);
                      setOpenDialog(true);
                    }}
                    label="Delete"
                    color="error"
                  />
                </Box>
              </Stack>
            );
          })}
        </ul>
      )}

      <DialogDeleteContact
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        contact={contactToDelete}
        onConfirm={() => {
          if (newContacts.includes(contactToDelete)) {
            dispatch(deleteContact(contactToDelete.id));
          } else {
            dispatch(deleteAPIContact(contactToDelete.name));
          }
          setDeletedContactName(contactToDelete.name);
          setDeleteSuccess(true);
          setOpenDialog(false);
        }}
      />
    </Box>
  );
}

export default ContactList;
