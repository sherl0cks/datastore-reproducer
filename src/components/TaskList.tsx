import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import {Task} from "../App";


export const TaskList = (props : {tasks: Task[]}) =>{
  return (
    <div className="App">
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID:Version</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">PK</TableCell>
                <TableCell align="right">SK</TableCell>
                <TableCell align="right">Strategy</TableCell>
                <TableCell align="right">createdAt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tasks.map((task) => (
                <TableRow
                  key={`${task.id}:${task.version}`}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">{`${task.id}:${task.version}`}</TableCell>
                  <TableCell align="right">{task.description}</TableCell>
                  <TableCell align="right">{task.pk}</TableCell>
                  <TableCell align="right">{task.sk}</TableCell>
                  <TableCell align="right">{task.strategy}</TableCell>
                  <TableCell align="right">{task.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
