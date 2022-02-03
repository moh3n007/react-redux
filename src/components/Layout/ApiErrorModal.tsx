import { FC } from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

interface IApiErrorModalProps {
  onClose: VoidFunction;
  message: string;
}

const ApiErrorModal: FC<IApiErrorModalProps> = (props) => {
  const { onClose, message } = props;
  const classes = useStyles();
  return (
    <Modal
      open={true}
      onClose={onClose}
      BackdropComponent={Backdrop}
      className={classes.modal}
    >
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#fff"
        p={3}
        borderRadius="6px"
        minWidth={250}
      >
        <Box mb={2}>
          <Typography variant="h5">Error Modal</Typography>
        </Box>
        <Box mb={2}>
          <Typography>"{message}"</Typography>
        </Box>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default ApiErrorModal;
