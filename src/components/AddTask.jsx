import React, { useState } from "react";
import { Button, Input } from "antd";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="addTask">
      <Input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <Input
        placeholder="task description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <Button
        type="primary"
        size="small"
        onClick={() => props.addNewTask(title, desc)}
      >
        Add
      </Button>
      <Button type="danger" size="small" onClick={props.toggleAddingTask}>
        x
      </Button>
    </div>
  );
};

export default AddTask;
