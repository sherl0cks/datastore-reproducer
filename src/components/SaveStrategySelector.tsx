import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React from "react";
import {SaveStrategy} from "../App";

export const SaveStrategySelector = (props: { saveStrategy: SaveStrategy, setSaveStrategy: (saveStrategy: SaveStrategy) => void }) => {

  const handleChange = (event: any) => {
    props.setSaveStrategy(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="save-strategy-label">Save Strategy</InputLabel>
      <Select
        labelId="save-strategy-label"
        id="save-strategy"
        value={props.saveStrategy}
        label="Save Strategy"
        onChange={handleChange}
      >
        <MenuItem value={SaveStrategy.DataStoreCopyOf}>SaveStrategy.DataStoreCopyOf</MenuItem>
        <MenuItem value={SaveStrategy.Immer}>SaveStrategy.Immer</MenuItem>
        <MenuItem value={SaveStrategy.DataStoreNew}>SaveStrategy.DataStoreNew</MenuItem>
      </Select>
    </FormControl>);
}
