import { Box, Paper, TableContainer, TablePagination } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from '@material-ui/core/Paper';
import { FC } from "react";

interface IHomeTable {
  handelChangePage: (page: number) => void;
  page: number;
  limit: number;
  limitList: number[];
  handleChangeLimit: (limit: number) => void;
  // handleBack: () => void;
  // isFirstPage: boolean;
  // isLastPage: boolean;
  // limitBox: JSX.Element;
}
const HomeTable: FC<IHomeTable> = ({ children, ...props }) => {
  const { handelChangePage, page, limit, handleChangeLimit, limitList } = props;
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={limitList}
        component="div"
        count={100}
        rowsPerPage={limit}
        page={page}
        onPageChange={(e, n) => handelChangePage(n + 1)}
        onRowsPerPageChange={(e) => handleChangeLimit(Number(e.target.value))}
      />
    </Box>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default HomeTable;
