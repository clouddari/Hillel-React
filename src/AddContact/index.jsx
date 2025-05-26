import { PatternFormat } from "react-number-format";
import { useState } from "react";
import MyButton from "../Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function AddContact({ newContacts, setNewContacts, setToggle }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (values) => {
    setForm((prev) => ({ ...prev, phone: values.formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all fields");
      return;
    }

    setNewContacts([...newContacts, form]);
    setForm({ name: "", email: "", phone: "" });
    setToggle(false);
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "20ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Name:"
          variant="outlined"
          value={form.name}
          onChange={handleChange}
          name="name"
          style={{ flex: 1 }}
        />

        <PatternFormat
          customInput={TextField}
          label="Phone Number"
          format="+1 (###) #### ###"
          mask="_"
          name="phone"
          onValueChange={handleNumberChange}
          style={{ flex: 1 }}
        />

        <TextField
          id="outlined-basic"
          label="Email:"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={{ flex: 1 }}
        />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center">
        <MyButton label="Save" type="submit" color="success" />
        <MyButton
          color="error"
          onClick={() => {
            setForm({ name: "", email: "", phone: "" });
            setToggle(false);
          }}
          label="Cancel"
        />
      </Stack>
    </Box>
  );
}

export default AddContact;
