import "./contact-list.css";
import MyButton from "../Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function ContactList({
  newContacts,
  apiContacts,
  deleteNewContact,
  deleteAPIContact,
  loading,
  error,
}) {
  const combinedContacts = [...apiContacts, ...newContacts];

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts: {error}</p>;

  return (
    <Box
      sx={{
        fontFamily: "default",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h3>Contacts</h3>
      {combinedContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {combinedContacts.map((contact, index) => {
            const isNew = newContacts.includes(contact);

            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fafafa",
                  marginBottom: "12px",
                }}
                key={index}
              >
                <p>
                  <strong>{contact.name}</strong>
                </p>
                <p>{contact.email} </p>
                <p>{contact.phone}</p>

                <MyButton
                  onClick={() => {
                    isNew
                      ? deleteNewContact(contact)
                      : deleteAPIContact(contact);
                  }}
                  label="Delete"
                  color="error"
                />
              </Stack>
            );
          })}
        </ul>
      )}
    </Box>
  );
}

export default ContactList;
