import { Box, IconButton, Paper, Typography } from "@material-ui/core";
import { ITodo } from "components/Layout/Todo";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Delete, Edit } from "@material-ui/icons";

interface TodoItem {
  todo: ITodo;
  handleDelete: VoidFunction;
  handleEdit: VoidFunction;
}

const TodoItem: FC<TodoItem> = (props) => {
  const { todo, handleDelete, handleEdit } = props;
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.paper }}>
      <Box flex={1} display="flex" alignItems="center">
        <Typography>{todo.content}</Typography>
      </Box>
      <Box>
        <IconButton onClick={handleDelete}>
          <Delete color="error" />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <Edit color="primary" />
        </IconButton>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles({
  paper: {
    padding: 16,
    display: "flex",
  },
});

export default TodoItem;
