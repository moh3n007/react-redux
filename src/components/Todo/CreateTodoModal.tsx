import {
  Backdrop,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ITodo } from "components/Layout/Todo";

interface ICreateTodoModal {
  onClose: VoidFunction;
  todo?: ITodo;
  handleSubmit: (todo: ITodo) => void;
}

const CreateTodoModal: FC<ICreateTodoModal> = (props) => {
  const { onClose, todo, handleSubmit } = props;
  const classes = useStyles();

  const isEdit = !!todo;

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
        minWidth={350}
      >
        <Box mb={2}>
          <Typography variant="h5">{`${
            isEdit ? "Edit" : "Create"
          } Todo`}</Typography>
        </Box>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gridGap="16px"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({
              content: (e.target as any)?.[0].value,
              id: todo?.id ?? '-1',
            });
          }}
        >
          <TextField
            placeholder="enter todo..."
            label="Todo"
            required={isEdit ? false : true}
            defaultValue={todo?.content}
            multiline
            maxRows={5}
            name="todo"
          />
          <Box display="flex" width="100%" justifyContent="space-between">
            <Button onClick={onClose} variant="outlined">
              Close
            </Button>
            <Button color="primary" variant="contained" type="submit">
              {isEdit ? "Edit" : "Create"}
            </Button>
          </Box>
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

export default CreateTodoModal;
