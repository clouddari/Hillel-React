import { PatternFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

const PhoneInput = ({ value, onChange }) => {
  return (
    <PatternFormat
      customInput={TextField}
      fullWidth
      label="Phone Number"
      format="+1(###)-####-###"
      mask="_"
      name="phone"
      value={value}
      onValueChange={(values) => onChange(values.formattedValue)}
    />
  );
};

export default PhoneInput;
