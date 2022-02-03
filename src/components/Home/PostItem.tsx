import { Box, IconButton, TableCell, TableRow } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { IPost } from "interface/posts";
import { FC } from "react";

interface IPostItem {
  post: IPost;
  handleDelete: VoidFunction;
  handleEdit: VoidFunction;
}

const PostItem: FC<IPostItem> = ({ post, handleDelete, handleEdit }) => {
  return (
    <TableRow>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.body}</TableCell>
      <TableCell>{post.userId}</TableCell>
      <TableCell>
        <Box display="flex">
          <IconButton onClick={handleDelete}>
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <Edit color="primary" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default PostItem;
