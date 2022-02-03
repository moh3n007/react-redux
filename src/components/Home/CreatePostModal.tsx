import {
  Backdrop,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import Modal, { ModalProps } from "@material-ui/core/Modal";
import { IPost } from "interface/posts";
import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IFormDate {
  title: string;
  body: string;
  userId: number;
}

interface IApiErrorModalProps {
  onClose: VoidFunction;
  post?: IPost;
  handleSubmit: (post: IPost) => void;
}

const CreatePostModal: FC<IApiErrorModalProps> = (props) => {
  const { onClose, post, handleSubmit } = props;
  const classes = useStyles();
  const [formData, updateFormData] = React.useState<IFormDate>({
    title: post?.title ?? "",
    body: post?.body ?? "",
    userId: post?.userId ?? 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isEdit = !!post;

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
          } Modal`}</Typography>
        </Box>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gridGap="16px"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({
              body: formData.body,
              title: formData.title,
              userId: formData.userId,
              id: post?.id ?? -1,
            });
          }}
        >
          <TextField
            placeholder="enter title..."
            label="Title"
            required={isEdit ? false : true}
            value={formData.title}
            multiline
            maxRows={3}
            onChange={handleChange}
            name="title"
          />
          <TextField
            placeholder="enter body..."
            label="Body"
            required={isEdit ? false : true}
            multiline
            maxRows={5}
            value={formData.body}
            onChange={handleChange}
            name="body"
          />
          <TextField
            placeholder="enter userId..."
            label="User's id"
            required={isEdit ? false : true}
            InputProps={{ type: "number" }}
            value={formData.userId}
            onChange={handleChange}
            name="userId"
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

export default CreatePostModal;
