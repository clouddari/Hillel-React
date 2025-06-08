import PhoneInput from "../PhoneValidation";
import { useState } from "react";
import MyButton from "../Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../features/contacts/contactsSlice";

function AddContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const newContacts = useSelector((state) => state.contacts.newContacts);
  const dispatch = useDispatch();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^\+1\(\d{3}\)-\d{4}-\d{3}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

    if (newContacts.some((c) => c.email === form.email)) {
      setError("A contact with this email already exists.");
      return;
    }

    dispatch(addContact(form.name, form.email, form.phone));
    setForm({ name: "", email: "", phone: "" });
    setError("");
    navigate("/contact-list", { state: { success: true } });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1 }, p: 2 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
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

      <Grid container columns={12} spacing={2} justifyContent="center">
        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }}
        >
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }}
        >
          <PhoneInput
            value={form.phone}
            onChange={(val) => setForm({ ...form, phone: val })}
          />
        </Grid>
        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 12", md: "span 4" } }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid>
          <MyButton label="Save" type="submit" color="success" />
        </Grid>
        <Grid>
          <MyButton
            color="error"
            onClick={() => setForm({ name: "", email: "", phone: "" })}
            label="Cancel"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddContact;
