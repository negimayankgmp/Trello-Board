import React, { useState } from "react";
import { List, Card, Button } from "antd";
import AddTask from "./AddTask";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = (props) => {
  const title = props.title;
  const tasks = props.tasks;
  // console.log(props.listId)
  const [addingTask, setAddingTask] = useState(false);

  const toggleAddingTask = () => {
    setAddingTask(!addingTask);
  };

  const addNewTask = (title, desc) => {
    props.handleCardAdd(title, desc, props.listId);
    toggleAddingTask();
  };

  const deleteList = ()=>{
    props.deleteList(props.listId)
  }

  const deleteCard = (cardIndex)=>{
    props.deleteCard(props.listId,cardIndex)
  }

  return (
    <div className="lists">
      <Droppable droppableId={props.listId} key={props.listId}>
        {(provided) => {
          return (
          <div ref={provided.innerRef}
          {...provided.droppableProps}> 
            <List className='list'
              header={
                <div className="listTitle">
                  <h2>{title}</h2>
                  <span>
                    <Button type="danger" shape="circle" size="small" onClick={deleteList}>
                      x
                    </Button>
                  </span>
                </div>
              }
              footer={
                <div className="footer">
                  {addingTask ? (
                    <AddTask
                      toggleAddingTask={toggleAddingTask}
                      addNewTask={addNewTask}
                    />
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      onClick={toggleAddingTask}
                    >
                      +
                    </Button>
                  )}
                </div>
              }
              grid={{ gutter: 1, column: 1 }}
              bordered
              dataSource={tasks}
              renderItem={(item) => (
              <Draggable key={item.id} index={tasks.indexOf(item)}  draggableId={item.id} >
                    {(provided) => (
                      <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      >
                        <List.Item>
                            <Card title={item.title}
                              className="task-card" 
                              extra={<Button 
                              type="danger" 
                              shape="circle" 
                              size="small" 
                              onClick={()=>deleteCard(tasks.indexOf(item))}>
                              x
                              </Button>}>
                              {item.description}
                            </Card>
                        </List.Item>
                      </div>
                    )}
              </Draggable> 
              )}
            />
          {provided.placeholder}
          </div>
          )
        }}
      </Droppable>
    </div>
  );
};

export default TaskList;
