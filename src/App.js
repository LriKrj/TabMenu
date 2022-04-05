import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function App() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const [tabs, setTabs] = useState("home");

  const handleChange = (event, tabs) => {
    setTabs(tabs);
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    setTodo({ desc: "", date: "", priority: "" });
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const ChangeDate = (day) => {
    setTodo({ ...todo, date: day });
  };

  const columns = [
    { field: "desc", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true },
  ];

  return (
    <div className="App">
      <Tabs value={tabs} onChange={handleChange}>
        <Tab value="home" label="HOME"></Tab>
        <Tab value="todo" label="Todolist"></Tab>
      </Tabs>
      {tabs === "home" && (
        <div>
          <p>Welcome to the home tab</p>
        </div>
      )}
      {tabs === "todo" && (
        <div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="Date"
                name="date"
                value={todo.date}
                onChange={ChangeDate}
              />
            </MuiPickersUtilsProvider>
            <TextField
              label="Description"
              variant="standard"
              name="description"
              value={todo.desc}
              onChange={inputChanged}
            />
            <TextField
              label="Priority"
              variant="standard"
              name="prio"
              value={todo.priority}
              onChange={inputChanged}
            />
            <Button onClick={addTodo} variant="contained">
              Add event
            </Button>
          </Stack>
          <div
            className="ag-theme-material"
            style={{ height: 400, width: 600, margin: "auto" }}
          >
            <AgGridReact rowData={todos} columnDefs={columns}></AgGridReact>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
