import React, {useEffect, useState} from 'react';
import './App.css';
import {Amplify, DataStore} from 'aws-amplify';
import Grid from '@mui/material/Grid';
import {TaskList} from "./components/TaskList";
import {AddTaskForm} from "./components/AddTaskForm";
import {SaveStrategySelector} from "./components/SaveStrategySelector";
import {addTaskWithCopy} from "./saveStrategies/addTaskWithCopy";
import {addTaskWithImmer} from "./saveStrategies/addTaskWithImmer";
import {addTaskWithNew} from "./saveStrategies/addTaskWithNew";
import config from './aws-exports'
import {DynamoStyleTask, SimpleTask} from "./models";
import Button from "@mui/material/Button";

export enum SaveStrategy {
  DataStoreCopyOf = "DataStoreCopyOf",
  Immer = "Immer",
  DataStoreNew = "DataStoreNew",
}

export type Task = Readonly<{
  id: string;
  pk?: string;
  sk?: number;
  version?: number;
  description?: string;
  strategy?: string;
  createdAt?: string;
  updatedAt?: string;
}>

function App() {
  // Declare a new state variable, which we'll call "count"
  const [tasks, setTasks] = useState<Task[]>([]);
  const [saveStrategy, setSaveStrategy] = useState<SaveStrategy>(SaveStrategy.DataStoreCopyOf);


  /**
   * This is
   */

  const getSaveStrategy = (saveStrategy: SaveStrategy): (taskDescription: string) => Promise<void> => {
    switch (saveStrategy) {
      case SaveStrategy.DataStoreCopyOf:
        return addTaskWithCopy
      case SaveStrategy.Immer:
        return addTaskWithImmer
      case SaveStrategy.DataStoreNew:
        return addTaskWithNew
      default:
        throw new Error(`${saveStrategy} not supported!`)
    }
  }

  const clear = async (event: any) => {
    await Promise.all((await DataStore.query(SimpleTask)).map(task => DataStore.delete(task)))
    await Promise.all((await DataStore.query(DynamoStyleTask)).map(task => DataStore.delete(task)))
    setTasks([])
  }

  useEffect(() => {
    const start = async () => {
      await DataStore.clear()
      Amplify.configure(config)
      await clear(null)
    }

    start()
  }, []);




  return (
    <div className="App">
      <Grid container spacing={2} rowSpacing={2} columnSpacing={2} justifyContent="center">
        <Grid item xs={12}/>
        <Grid item xs={4}>
          <AddTaskForm saveTaskFunction={getSaveStrategy(saveStrategy)} setTasks={setTasks}/>
        </Grid>
        <Grid item xs={4}>
          <SaveStrategySelector setSaveStrategy={setSaveStrategy} saveStrategy={saveStrategy}/>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Button onClick={clear} variant="contained">Clear</Button>
          </div>
        </Grid>
        <Grid item xs={2}/>
        <Grid item xs={12}>
          <TaskList tasks={tasks}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
