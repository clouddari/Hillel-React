import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MyButton from "../Button";
import { Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PhoneInput from "../PhoneValidation";
import { useSelector, useDispatch } from "react-redux";
import { updateContact } from "../../features/contacts/contactsSlice";

function EditContact() {
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact;
  const newContacts = useSelector((state) => state.contacts.newContacts);
  const dispatch = useDispatch();

  const [form, setForm] = useState(
    contact || { name: "", email: "", phone: "" }
  );
  const [initialEmail] = useState(contact?.email || "");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^\+1\(\d{3}\)-\d{4}-\d{3}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!contact) {
    return <p>No contact found. Please return to contact list.</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Invalid email address.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setError("Invalid phone number format.");
      return;
    }

    const emailConflict =
      form.email !== initialEmail &&
      newContacts.some((c) => c.email === form.email);

    if (emailConflict) {
      setError("Another contact with this email already exists.");
      return;
    }

    dispatch(
      updateContact({
        id: contact.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
      })
    );

    setError("");
    navigate("/contact-list", { state: { success: true } });
  };

  if (!contact) {
    return <p>No contact found. Please return to contact list.</p>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, m: "auto", mt: 4 }}
    >
      {error && (
        <Alert
          sx={{
            mb: 2,
            bgcolor: "white",
            color: "#ba000d",
            borderColor: "#ba000d",
          }}
          variant="outlined"
          icon={<ErrorOutlineIcon sx={{ color: "#ba000d" }} />}
        >
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          required
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          required
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <PhoneInput
          value={form.phone}
          onChange={(val) => setForm({ ...form, phone: val })}
        />

        <Stack direction="row" spacing={2}>
          <MyButton label="Save" type="submit" color="success" />
          <MyButton
            label="Cancel"
            color="error"
            onClick={() => navigate("/contact-list")}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default EditContact;
