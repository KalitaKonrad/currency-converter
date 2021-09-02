import React from "react";
import { withStyles, Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const CustomizedTables = () => {
  const classes = useStyles();

  return (
    <div>hehe</div>
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell>Exchange rates</StyledTableCell>
    //         <StyledTableCell align="right">Flag</StyledTableCell>
    //         <StyledTableCell align="right">Rate</StyledTableCell>
    //         <StyledTableCell align="right">After Conversion</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map(row => (
    //         <StyledTableRow key={row.name}>
    //           <StyledTableCell align="right">{row.calories}</StyledTableCell>
    //           <StyledTableCell align="right">{row.fat}</StyledTableCell>
    //           <StyledTableCell align="right">{row.carbs}</StyledTableCell>
    //           <StyledTableCell align="right">{row.protein}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};
