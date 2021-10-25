import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {DataStore} from "aws-amplify";
import {Task} from "../App";
import {DynamoStyleTask, SimpleTask} from "../models";

export const AddTaskForm = (props: {
  saveTaskFunction: (taskDescription: string) => Promise<void>,
  setTasks: (tasks: Task[]) => void
}) => {
  const [newTaskDescription, setNewTaskDescription] = useState("")

  const onTextFieldChange = (event: any) => {
    setNewTaskDescription(event.target.value);
  }
  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const handleMouseEvent = async (event: any) => {
    await props.saveTaskFunction(newTaskDescription)
    await delay(500)  // let storage engine finish so we can display if writes actually worked
    const simpleTasks =await DataStore.query(SimpleTask)
    const dynamoStyleTasks =await DataStore.query(DynamoStyleTask)
    props.setTasks([...simpleTasks, ...dynamoStyleTasks])
  }

  return (
    <div>
      <TextField id="input" onChange={onTextFieldChange} variant="outlined" label="description"/>
      <Button onClick={handleMouseEvent} variant="contained">Add</Button>
    </div>
  );
}
