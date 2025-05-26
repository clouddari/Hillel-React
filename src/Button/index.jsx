import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function MyButton({
  label,
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        color="primary"
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="my-button"
        {...props}
      >
        {label}
      </Button>
    </Stack>
  );
}

export default MyButton;
