import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyButton from "../Button";

function DialogDeleteContact({ open, onClose, onConfirm, contact }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog"
    >
      <DialogTitle id="confirm-delete-dialog">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{contact?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MyButton label="Cancel" color="primary" onClick={onClose} />
        <MyButton label="Delete" color="error" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default DialogDeleteContact;
