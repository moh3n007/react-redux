import { Box, Button, Typography } from "@material-ui/core";
import TodoItem from "components/Todo/TodoItem";
import React, { Suspense, useState } from "react";
import store from "store";

// lazy imports
const DeleteModal = React.lazy(
  () => import("components/shared/DeleteModal/DeleteModal")
);
const CreateTodoModal = React.lazy(
  () => import("components/Todo/CreateTodoModal")
);

export interface ITodo {
  id: string;
  content: string;
}
interface ICreateTodoData {
  open: boolean;
  todo?: ITodo;
}

const Todo = () => {
  const localStorageList: ITodo[] = store.get("todoList") ?? [];

  const [list, setList] = useState<ITodo[]>(localStorageList ?? []);
  const [forDelete, setForDelete] = useState<ITodo>();
  const [createTodoData, setCreateTodoData] = useState<ICreateTodoData>({
    open: false,
    todo: undefined,
  });

  const handleEditOrCreateTodo = (todo: ITodo) => {
    const isCreate = todo.id === "-1";
    if (isCreate) {
      const newTodo: ITodo = {
        content: todo.content,
        id: new Date().toLocaleTimeString(),
      };

      store.set("todoList", [newTodo, ...list]);
      setList([newTodo, ...list]);
    } else {
      const updatedTodoIndex = list.indexOf(
        list.find((item) => item.id === todo.id) as ITodo
      );
      const newList = JSON.parse(JSON.stringify(list));
      newList[updatedTodoIndex] = todo;
      store.set("todoList", newList);
      setList(newList);
    }
    setCreateTodoData({
      open: false,
      todo: undefined,
    });
  };

  const handleDelete = (todoId: string) => {
    setList(list.filter((item) => item.id !== todoId));
  };

  return (
    <>
      <Box p={3}>
        <Typography variant="h4">TODO List</Typography>
        <Box my={3}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setCreateTodoData({ open: true })}
          >
            Create new todo
          </Button>
        </Box>
        <Box my={3}>
          {!list.length ? (
            <span>There is no todo item</span>
          ) : (
            <Box display="flex" flexDirection="column" gridGap="24px">
              {list.map((todo) => (
                <TodoItem
                  key={`todo-${todo.id}`}
                  todo={todo}
                  handleDelete={() => setForDelete(todo)}
                  handleEdit={() =>
                    setCreateTodoData({
                      open: true,
                      todo: todo,
                    })
                  }
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      {!!createTodoData.open && (
        <Suspense fallback={<div>Loading...</div>}>
          <CreateTodoModal
            onClose={() =>
              setCreateTodoData({
                open: false,
                todo: undefined,
              })
            }
            handleSubmit={handleEditOrCreateTodo}
            todo={createTodoData.todo}
          />
        </Suspense>
      )}
      {!!forDelete && (
        <Suspense fallback={<div>Loading...</div>}>
          <DeleteModal
            onClose={() => setForDelete(undefined)}
            onDelete={() => {
              handleDelete(forDelete.id);
              setForDelete(undefined);
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default Todo;
